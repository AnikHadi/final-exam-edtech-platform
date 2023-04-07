import { apiSlice } from "../api/apiSlice";
import { addStudentLeaderBoard } from "../leaderBoard/loaderboardSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;

        const allStudent = await data?.filter((std) => std.role !== "admin");
        if (allStudent.length > 0) {
          dispatch(addStudentLeaderBoard(allStudent));
        }
      },
    }),
    getUser: builder.query({
      query: (email) => `/users?email_like=${email}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        console.log(JSON.parse(JSON.stringify(result)));
      },
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = userApi;
