import { apiSlice } from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMark: builder.query({
      query: () => "/quizMark",
    }),
    getQuizMarkByVideoId: builder.query({
      query: (videoId) => `/quizMark?video_id=${videoId}`,
    }),
    getQuizMarkByVideoIdAndStudentId: builder.query({
      query: ({ videoId, studentId }) =>
        `/quizMark?video_id=${videoId}&student_id=${studentId}`,
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quizMark = await queryFulfilled;
          if (quizMark?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMark",
                undefined,
                (draft) => {
                  draft.push(quizMark.data);
                }
              )
            );
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
    deleteQuizMark: builder.mutation({
      query: (id) => ({
        url: `/quizMark/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quizMark = await queryFulfilled;
          if (Object.keys(quizMark.data).length === 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMark",
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
  useGetQuizMarkQuery,
  useGetQuizMarkByVideoIdQuery,
  useGetQuizMarkByVideoIdAndStudentIdQuery,
  useAddQuizMarkMutation,
  useDeleteQuizMarkMutation,
} = quizMarkApi;
