import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    getAssignmentByVideoId: builder.query({
      query: (videoId) => `/assignments?video_id_like=${videoId}`,
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignment = await queryFulfilled;
          if (assignment?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  draft.push(assignment.data);
                }
              )
            );
          }
        } catch (error) {
          //do nothing
        }
      },
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignment = await queryFulfilled;
          if (assignment?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  const index = draft.findIndex((item) => item.id === arg.id);
                  draft[index] = assignment.data;
                }
              )
            );
          }
        } catch (error) {
          //do nothing
        }
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignment = await queryFulfilled;
          if (Object.keys(assignment.data).length === 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  const index = draft.findIndex((item) => item.id === arg);
                  draft.splice(index, 1);
                }
              )
            );
          }
        } catch (error) {
          //do nothing
        }
      },
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useGetAssignmentByVideoIdQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;

// console.log(assignment.data);
// console.log(JSON.parse(JSON.stringify(draft)));
