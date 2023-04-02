import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/quizzes",
    }),
    getQuiz: builder.query({
      query: () => "/quizzes",
    }),
    getQuizByVideoId: builder.query({
      query: (videoId) => `/quizzes?video_id_like=${videoId}`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quiz = await queryFulfilled;
          if (quiz?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  draft.push(quiz.data);
                }
              )
            );
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quiz = await queryFulfilled;
          if (quiz?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  const index = draft.findIndex((item) => item.id === arg.id);
                  draft[index] = quiz.data;
                }
              )
            );
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quiz = await queryFulfilled;
          if (Object.keys(quiz.data).length === 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  const index = draft.findIndex((item) => item.id === arg);
                  draft.splice(index, 1);
                }
              )
            );
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useGetQuizByVideoIdQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
  useDeleteQuizByVideoIdMutation,
} = quizzesApi;
