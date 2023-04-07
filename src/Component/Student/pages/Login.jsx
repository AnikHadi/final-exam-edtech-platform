import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/image/learningportal.svg";
import { useLoginMutation } from "../../../features/auth/authAPI";
import isValidEmail from "../../../utils/isValidEmail";
import Error from "../../ui/Error";

const Login = () => {
  // <title>Student Login</title>
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }

    if (data?.accessToken && data?.user) {
      if (data.user.role === "student") {
        navigate("/courses/1");
      } else if (data.user.role === "admin") {
        setError("Your login was fails!");
      }
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    if (isValidEmail(email)) {
      login({
        email,
        password,
        role: "student",
      });
    } else {
      setError("Please enter valid email!");
    }
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <Helmet>
        <title>Student Login</title>
      </Helmet>
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="#" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Student Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="student-registration"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Create New Account
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              disabled={isLoading}
            >
              Sign in
            </button>
          </div>
          {error !== "" && <Error message={error} />}
        </form>
      </div>
    </section>
  );
};

export default Login;
