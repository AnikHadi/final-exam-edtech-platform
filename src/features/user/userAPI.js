import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUser: builder.query({
      query: (email) => `/users?email_like=${email}`,
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   const result = await queryFulfilled;
      //   // console.log(JSON.parse(JSON.stringify(result)));
      // },
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = userApi;
