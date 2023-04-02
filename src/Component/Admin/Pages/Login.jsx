import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/image/learningportal.svg";
import { useLoginMutation } from "../../../features/auth/authAPI";
import Error from "../../ui/Error";

const AdminLogin = () => {
  // <title>Admin Login</title>
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }

    if (data?.accessToken && data?.user) {
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "student") {
        setError("Your enter email is student email!");
      }
    }
  }, [dispatch, data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    login({
      email,
      password,
      role: "admin",
    });
  };
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="#" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Admin Account
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
                to="/"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Forgot your password?
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

export default AdminLogin;
