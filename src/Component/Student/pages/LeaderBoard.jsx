import React from "react";
import { useSelector } from "react-redux";
import { selectMemoizedAuth } from "../../../features/auth/authSelector";
import AllStudentPositionList from "../LeaderBoard/AllStudentPositionList";
import OwnPosition from "../LeaderBoard/OwnPosition";
import Navbar from "../Share/Navbar";

const LeaderBoard = () => {
  // <title>Leaderboard</title>;
  const auth = useSelector(selectMemoizedAuth);
  return (
    <div>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <OwnPosition />

          <AllStudentPositionList ownEmail={auth.email} />
        </div>
      </section>
    </div>
  );
};

export default LeaderBoard;
