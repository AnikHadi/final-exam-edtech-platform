import { apiSlice } from "../api/apiSlice";
import { assignmentApi } from "../assignment/assignmentAPI";
import { quizzesApi } from "../quizzes/quizzesAPI";
{
}

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
              dispatch(
                assignmentApi.endpoints.deleteAssignment.initiate(
                  resAssignment[0]?.id
                )
              );
            } catch (error) {
              console.log(error);
            }

            // delete video connect quiz
            const resQuiz = await dispatch(
              quizzesApi.endpoints.getQuizByVideoId.initiate(arg)
            ).unwrap();
            // delete video connect quiz deleted
            try {
              dispatch(
                quizzesApi.endpoints.deleteQuiz.initiate(resQuiz[0]?.id)
              );
            } catch (error) {
              console.log(error);
            }
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

// console.log(JSON.parse(JSON.stringify(draft)));
