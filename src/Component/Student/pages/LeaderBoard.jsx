import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAssignmentsMarkQuery } from "../../../features/assignmentMark/assignmentMarkAPI";
import { selectMemoizedAuth } from "../../../features/auth/authSelector";
import { useGetQuizMarkQuery } from "../../../features/quizzesMark/quizzesMarkSlice";
import { useGetUsersQuery } from "../../../features/user/userAPI";
import AllStudentPositionList from "../LeaderBoard/AllStudentPositionList";
import OwnPosition from "../LeaderBoard/OwnPosition";
import Navbar from "../Share/Navbar";

const LeaderBoard = () => {
  // <title>Leaderboard</title>;
  const [sortedData, setSortedData] = useState([]);
  const auth = useSelector(selectMemoizedAuth);
  const leaderBoard = useSelector((state) => state.leaderBoard)?.leaderBoard;

  const { data: userData } = useGetUsersQuery();
  const { data: quizMark } = useGetQuizMarkQuery();
  const { data: assignmentsMar } = useGetAssignmentsMarkQuery();

  useEffect(() => {
    document.title = "Quiz - Leaderboard";
  }, []);

  useEffect(() => {
    const data = _.cloneDeep(leaderBoard);
    if (data.length > 0) {
      data.sort((a, b) => b.totalMark - a.totalMark);
      return setSortedData(data);
    }
  }, [leaderBoard]);

  useEffect(() => {}, [userData, quizMark, assignmentsMar]);

  return (
    sortedData && (
      <div>
        <Navbar />
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <OwnPosition auth={auth} data={sortedData} />

            <AllStudentPositionList data={sortedData} />
          </div>
        </section>
      </div>
    )
  );
};

export default LeaderBoard;
