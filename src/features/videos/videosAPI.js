import { apiSlice } from "../api/apiSlice";
import { assignmentApi } from "../assignment/assignmentAPI";
import { assignmentMarkApi } from "../assignmentMark/assignmentMarkAPI";
import { quizzesApi } from "../quizzes/quizzesAPI";

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

            // delete video connect assignment
            const resAssignment = await dispatch(
              assignmentApi.endpoints.getAssignmentByVideoId.initiate(arg)
            ).unwrap();
            // delete video connect assignment deleted
            try {
              resAssignment?.length > 0 &&
                dispatch(
                  assignmentApi.endpoints.deleteAssignment.initiate(
                    resAssignment[0]?.id
                  )
                );
            } catch (error) {
              // do nothing
            }

            // ! delete video connect all assignment mark
            const resAssignmentsMarkByAssignmentId =
              resAssignment?.length > 0 &&
              (await dispatch(
                assignmentMarkApi.endpoints.getAssignmentMarkByAssignmentId.initiate(
                  resAssignment[0].id
                )
              ).unwrap());
            const assignmentsMarkIds = resAssignmentsMarkByAssignmentId?.map(
              (ass) => ass.id
            );
            // delete video connect quiz deleted
            try {
              assignmentsMarkIds.length > 0 &&
                assignmentsMarkIds.map((id) => {
                  return dispatch(
                    assignmentMarkApi.endpoints.deleteAssignmentMark.initiate(
                      id
                    )
                  );
                });
            } catch (error) {
              // do nothing
            }
            // ! delete video connect all assignment mark

            // * delete video connect quiz
            const resQuiz = await dispatch(
              quizzesApi.endpoints.getQuizByVideoId.initiate(arg)
            ).unwrap();
            const quizzesId = resQuiz?.map((ass) => ass.id);
            // delete video connect quiz deleted
            try {
              quizzesId.length > 0 &&
                quizzesId.map((id) =>
                  dispatch(quizzesApi.endpoints.deleteQuiz.initiate(id))
                );
            } catch (error) {
              //  do nothing
            }
            // ! delete video connect all quiz mark
            const resQuizzesMark = await dispatch(
              quizzesApi.endpoints.getAssignmentMarkByAssignmentId.initiate(
                resAssignment[0].id
              )
            ).unwrap();
            const quizzesMarkId = resQuizzesMark.map((ass) => ass.id);
            // delete video connect quiz deleted
            try {
              quizzesMarkId.length > 0 &&
                quizzesMarkId.map((id) =>
                  dispatch(
                    assignmentMarkApi.endpoints.deleteAssignmentMark.initiate(
                      id
                    )
                  )
                );
            } catch (error) {
              //  do nothing
            }
            // ! delete video connect all quiz mark
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
