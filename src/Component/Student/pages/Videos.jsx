import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../../features/videos/videosAPI";
import Loading from "../../ui/Loading";
import Navbar from "../Share/Navbar";
import VideoDescription from "../Video/VideoDescription";
import VideoList from "../Video/VideoList";

const Videos = () => {
  const { videoId } = useParams();
  const { data, isError, isLoading } = useGetVideoQuery(videoId);

  // loading
  if (isLoading) <Loading />;

  return isError ? (
    <div className="flex justify-center items-center text-3xl mt-32">
      There was an error!
    </div>
  ) : data?.length === 0 ? (
    <div className="flex justify-center items-center text-3xl ">
      There was no video found!
    </div>
  ) : (
    <div>
      <Helmet>
        <title>LWS - Home</title>
      </Helmet>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <iframe
                width="100%"
                className="aspect-video"
                src={data?.url}
                title={data?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <VideoDescription video={data} />
            </div>
            <VideoList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
