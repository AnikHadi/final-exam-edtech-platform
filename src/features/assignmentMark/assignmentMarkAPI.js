import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentsMark: builder.query({
      query: () => "/assignmentMark",
    }),
    getAssignmentMark: builder.query({
      query: (id) => `/assignmentMark/${id}`,
    }),
    getAssignmentMarkByAssignmentIdStudentId: builder.query({
      query: ({ assignmentId, studentId }) =>
        `/assignmentMark?assignment_id_like=${assignmentId}&student_id_like=${studentId}`,
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const mark = await queryFulfilled;
          if (mark?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
                undefined,
                (draft) => {
                  draft.push(mark.data);
                }
              )
            );
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const mark = await queryFulfilled;
          if (mark?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
                undefined,
                (draft) => {
                  const index = draft.findIndex((item) => item.id === arg.id);
                  draft[index] = mark.data;
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
  useGetAssignmentsMarkQuery,
  useGetAssignmentMarkQuery,
  useGetAssignmentMarkByAssignmentIdStudentIdQuery,
  useAddAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
} = assignmentMarkApi;
