import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminAssignment from "./Component/Admin/Pages/Assignment";
import AdminAssignmentMark from "./Component/Admin/Pages/AssignmentMark";
import AdminDashboard from "./Component/Admin/Pages/Dashboard";
import AdminLogin from "./Component/Admin/Pages/Login";
import AdminQuizzes from "./Component/Admin/Pages/Quizzes";
import AdminVideos from "./Component/Admin/Pages/Videos";
import PrivateAdminRoute from "./Component/PrivateAdminRoute";
import PrivateRoute from "./Component/PrivateRoute";
// import QuizzesExtra from "./Component/Student/NewQuizzes/QuizzesExtra";
import PublicAdminRoute from "./Component/PublicAdminRoute";
import PublicRoute from "./Component/PublicRoute";
import LeaderBoard from "./Component/Student/pages/LeaderBoard";
import Login from "./Component/Student/pages/Login";
import Quizzes from "./Component/Student/pages/Quizzes";
import QuizzesAnswer from "./Component/Student/pages/QuizzesAnswer";
import Registration from "./Component/Student/pages/Registration";
import Videos from "./Component/Student/pages/Videos";
import useAuthCheck from "./hooks/userAuthCheck";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication...</div>
  ) : (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PublicAdminRoute>
              <AdminLogin />
            </PublicAdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <PrivateAdminRoute>
              <AdminVideos />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <PrivateAdminRoute>
              <AdminAssignment />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <PrivateAdminRoute>
              <AdminQuizzes />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/assignment-mark"
          element={
            <PrivateAdminRoute>
              <AdminAssignmentMark />
            </PrivateAdminRoute>
          }
        />

        {/* student Route section */}
        <Route
          path="/student-registration"
          element={
            <PublicRoute>
              <Registration />{" "}
            </PublicRoute>
          }
        />
        <Route
          path="/courses/:videoId"
          element={
            <PrivateRoute>
              <Videos />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:videoId/quizzes"
          element={
            <PrivateRoute>
              <Quizzes />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:videoId/quizzes/answer"
          element={
            <PrivateRoute>
              <QuizzesAnswer />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
