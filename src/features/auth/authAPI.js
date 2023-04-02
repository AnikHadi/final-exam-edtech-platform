import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          //    json server http cookie support করে না এই জন্য localStorage use করতে হবে।
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          dispatch(userLoggedIn(result.data));
        } catch (error) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.user.role === arg.role) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
            dispatch(userLoggedIn(result.data));
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
