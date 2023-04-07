import { apiSlice } from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMark: builder.query({
      query: () => "/quizMark",
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
  }),
});

export const {
  useGetQuizMarkQuery,
  useGetQuizMarkByVideoIdAndStudentIdQuery,
  useAddQuizMarkMutation,
} = quizMarkApi;
