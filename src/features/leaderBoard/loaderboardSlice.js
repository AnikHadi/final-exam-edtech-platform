import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaderBoard: [],
};

const leaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState,
  reducers: {
    addStudentLeaderBoard: (state, action) => {
      state.leaderBoard = action.payload;
    },
    editStudentLeaderBoard: (state, action) => {
      state.leaderBoard.map((std) => {
        if (std.name === action.payload.name) {
          return { ...std, ...action.payload };
        }
      });
    },
  },
});

export default leaderBoardSlice.reducer;
export const { addStudentLeaderBoard, editStudentLeaderBoard } =
  leaderBoardSlice.actions;
