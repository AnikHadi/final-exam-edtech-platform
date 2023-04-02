import React from "react";
import { useParams } from "react-router-dom";
import { useGetVideosQuery } from "../../../features/videos/videosAPI";
import Loading from "../../ui/Loading";
import SingleVideo from "./SingleVideo";

const VideoList = () => {
  const { data: videos, isError, isLoading } = useGetVideosQuery();
  const { videoId } = useParams();

  if (isLoading) <Loading />;

  return isError ? (
    <div className="flex justify-center items-center text-3xl ">
      There was an error, something happened!
    </div>
  ) : videos?.length === 0 ? (
    <div className="flex justify-center items-center text-3xl ">
      There was no video found!
    </div>
  ) : (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {videos
        ?.filter((vid) => vid.id !== Number(videoId))
        ?.map((video) => (
          <SingleVideo video={video} key={video.id} />
        ))}
    </div>
  );
};

export default VideoList;
