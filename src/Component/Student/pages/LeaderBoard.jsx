import _ from "lodash";
import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useGetAssignmentsMarkQuery } from "../../../features/assignmentMark/assignmentMarkAPI";
import { selectMemoizedAuth } from "../../../features/auth/authSelector";
import { useGetQuizMarkQuery } from "../../../features/quizzesMark/quizzesMarkSlice";
import { useGetUsersQuery } from "../../../features/user/userAPI";
import AllStudentPositionList from "../LeaderBoard/AllStudentPositionList";
import OwnPosition from "../LeaderBoard/OwnPosition";
import Navbar from "../Share/Navbar";

// ! for use reducer start
const initialState = {
  student: [],
  sortedStudent: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_STUDENT":
      const users = _.cloneDeep(action.payload);
      const student = users
        .filter((std) => std.role !== "admin")
        .map((std) => {
          let filterInfo = {
            ...std,
            quizMark: 0,
            assignmentMark: 0,
            totalMark: 0,
          };
          delete filterInfo.password;
          delete filterInfo.role;
          return filterInfo;
        });
      return { ...state, student: student };

    case "ADD_QUIZ_MARK":
      state.student.map((std) => {
        const singleStudentQuiz = action.payload.filter(
          (quiz) => quiz.student_id === std.id
        );
        const totalQuizMark = singleStudentQuiz.reduce(
          (total, quiz) => total + quiz.mark,
          0
        );
        std.quizMark = totalQuizMark;
        std.totalMark = std.totalMark + totalQuizMark;
        return std;
      });
      return state;
    case "ADD_ASSIGNMENT_MARK":
      state.student.map((std) => {
        const singleStudentAssignment = action.payload.filter(
          (assignment) => assignment.student_id === std.id
        );
        const totalQuizMark = singleStudentAssignment.reduce(
          (total, assignment) => total + assignment.mark,
          0
        );
        std.assignmentMark = totalQuizMark;
        std.totalMark = std.totalMark + totalQuizMark;
        return std;
      });
      const data = _.cloneDeep(state.student).sort(
        (a, b) => b.totalMark - a.totalMark
      );
      return { ...state, sortedStudent: data };
    default:
      return state;
  }
}; // ! for use reducer end

const LeaderBoard = () => {
  // <title>Leaderboard</title>;
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = useSelector(selectMemoizedAuth);

  const { data: userData } = useGetUsersQuery();
  const { data: quizMark } = useGetQuizMarkQuery();
  const { data: assignmentsMar } = useGetAssignmentsMarkQuery();

  useEffect(() => {
    document.title = "Quiz - Leaderboard";
  }, []);

  useEffect(() => {
    if (userData?.length > 0) {
      dispatch({ type: "ADD_STUDENT", payload: userData });
    }
  }, [userData]);
  useEffect(() => {
    if (quizMark?.length > 0) {
      dispatch({ type: "ADD_QUIZ_MARK", payload: quizMark });
    }
  }, [quizMark]);
  useEffect(() => {
    if (assignmentsMar?.length > 0) {
      dispatch({ type: "ADD_ASSIGNMENT_MARK", payload: assignmentsMar });
    }
  }, [assignmentsMar]);

  return (
    state.sortedStudent?.length > 0 && (
      <div>
        <Navbar />
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <OwnPosition auth={auth} data={state.sortedStudent} />

            <AllStudentPositionList data={state.sortedStudent} />
          </div>
        </section>
      </div>
    )
  );
};

export default LeaderBoard;
