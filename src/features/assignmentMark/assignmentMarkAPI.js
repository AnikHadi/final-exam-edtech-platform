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
        `/assignmentMark?assignment_id=${assignmentId}&student_id=${studentId}`,
    }),
    getAssignmentMarkByAssignmentId: builder.query({
      query: (assignmentId) => `/assignmentMark?assignment_id=${assignmentId}`,
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
    deleteAssignmentMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const mark = await queryFulfilled;
          if (Object.keys(mark.data).length === 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
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
  useGetAssignmentsMarkQuery,
  useGetAssignmentMarkQuery,
  useGetAssignmentMarkByAssignmentIdStudentIdQuery,
  useGetAssignmentMarkByAssignmentIdQuery,
  useAddAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
  useDeleteAssignmentMarkMutation,
} = assignmentMarkApi;
