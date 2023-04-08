import { apiSlice } from "../api/apiSlice";
import { assignmentApi } from "../assignment/assignmentAPI";
import { assignmentMarkApi } from "../assignmentMark/assignmentMarkAPI";
import { quizzesApi } from "../quizzes/quizzesAPI";
import { quizMarkApi } from "../quizzesMark/quizzesMarkSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;

          if (video?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(video.data);
              })
            );
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;

          if (video?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                const index = draft.findIndex((item) => item.id === arg.id);
                draft[index] = video.data;
              })
            );
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deleteVideo = await queryFulfilled;
        try {
          if (Object.keys(deleteVideo.data).length === 0) {
            // delete video cache update
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                const index = draft.findIndex((item) => item.id === arg);
                draft.splice(index, 1);
              })
            );

            // delete video connect assignment start
            const resAssignment = await dispatch(
              assignmentApi.endpoints.getAssignmentByVideoId.initiate(arg)
            ).unwrap();
            // delete video connect assignment deleted
            try {
              if (resAssignment?.length > 0) {
                dispatch(
                  assignmentApi.endpoints.deleteAssignment.initiate(
                    resAssignment[0]?.id
                  )
                );
              }
            } catch (error) {
              // do nothing
            }
            // delete video connect assignment end

            // ! delete video connect all assignment mark start
            const resAssignmentMark = (assignment) => {
              if (assignment.length > 0) {
                const res = dispatch(
                  assignmentMarkApi.endpoints.getAssignmentMarkByAssignmentId.initiate(
                    resAssignment[0].id
                  )
                ).unwrap();
                return res;
              }
            };
            const resAssignmentsMarkByAssignmentId = await resAssignmentMark(
              resAssignment
            );

            const assignmentsMarkIds = resAssignmentsMarkByAssignmentId?.map(
              (ass) => ass.id
            );
            // delete video connect quiz deleted
            try {
              if (assignmentsMarkIds.length > 0) {
                assignmentsMarkIds.map((id) => {
                  return dispatch(
                    assignmentMarkApi.endpoints.deleteAssignmentMark.initiate(
                      id
                    )
                  );
                });
              }
            } catch (error) {
              // do nothing
            }
            // ! delete video connect all assignment mark end

            // * delete video connect quiz start
            const resQuiz = await dispatch(
              quizzesApi.endpoints.getQuizByVideoId.initiate(arg)
            ).unwrap();
            const quizzesId = resQuiz?.map((ass) => ass.id);
            // delete video connect quiz deleted
            try {
              if (quizzesId.length > 0) {
                quizzesId.map((id) =>
                  dispatch(quizzesApi.endpoints.deleteQuiz.initiate(id))
                );
              }
            } catch (error) {
              //  do nothing
            }
            // * delete video connect quiz start end

            // ! delete video connect all quiz mark start
            const resQuizzesMark = await dispatch(
              quizMarkApi.endpoints.getQuizMarkByVideoId.initiate(arg)
            ).unwrap();
            const quizzesMarkId = resQuizzesMark.map((ass) => ass.id);
            // delete video connect quiz deleted
            try {
              if (quizzesMarkId.length > 0) {
                quizzesMarkId.map((id) =>
                  dispatch(quizMarkApi.endpoints.deleteQuizMark.initiate(id))
                );
              }
            } catch (error) {
              //  do nothing
            }
            // ! delete video connect all quiz mark end
          }
        } catch (error) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
