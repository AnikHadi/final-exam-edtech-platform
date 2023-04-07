import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaderBoard: [],
};

const leaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState,
  reducers: {
    addStudentLeaderBoard: (state, action) => {
      state.leaderBoard = action.payload.map((std) => {
        return { ...std, quizMark: 0, assignmentMark: 0, totalMark: 0 };
      });
    },
    editStudentLeaderBoardWithQuiz: (state, action) => {
      state.leaderBoard.map((std) => {
        const singleStudentQuiz = action.payload.filter(
          (quiz) => quiz.student_id === std.id
        );
        const totalQuizMark = singleStudentQuiz.reduce(
          (total, quiz) => total + quiz.mark,
          0
        );
        std.quizMark = totalQuizMark;
        std.totalMark = Number(std.totalMark) + totalQuizMark;
        return std;
      });
    },
    editStudentLeaderBoardWithAssignment: (state, action) => {
      state.leaderBoard.map((std) => {
        const singleStudentAssignment = action.payload.filter(
          (assignment) => assignment.student_id === std.id
        );
        const totalQuizMark = singleStudentAssignment.reduce(
          (total, assignment) => total + assignment.mark,
          0
        );
        std.assignmentMark = totalQuizMark;
        std.totalMark = Number(std.totalMark) + totalQuizMark;
        return std;
      });
    },
  },
});

export default leaderBoardSlice.reducer;
export const {
  addStudentLeaderBoard,
  editStudentLeaderBoardWithQuiz,
  editStudentLeaderBoardWithAssignment,
} = leaderBoardSlice.actions;
