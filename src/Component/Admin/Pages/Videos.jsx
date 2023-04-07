import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useGetVideosQuery } from "../../../features/videos/videosAPI";
import Loading from "../../ui/Loading";
import ToastMessage from "../../ui/ToastMessage";
import SingleVideo from "../Features/SingleVideo";
import AddVideoInput from "../InputForm/AddVideoInput";
import AdminNavbar from "../Share/AdminNavbar";

const AdminVideos = () => {
  // all local state
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // all redux state
  const { data: videos, isError, isLoading } = useGetVideosQuery();

  if (isLoading) <Loading />;

  return isError ? (
    <div className="flex justify-center items-center text-3xl ">
      There was an error!
    </div>
  ) : videos?.length === 0 ? (
    <div className="flex justify-center items-center text-3xl ">
      There was no video found!
    </div>
  ) : (
    <div>
      <Helmet>
        <title>Add Videos</title>
      </Helmet>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <ToastMessage message={message} status={status} />
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={(e) => setShowModal(!showModal)}
                className="btn ml-auto"
              >
                Add Video
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {videos?.map((video) => (
                    <SingleVideo
                      video={video}
                      setMessage={setMessage}
                      setStatus={setStatus}
                      key={video.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <AddVideoInput
        showModal={showModal}
        setShowModal={setShowModal}
        setMessage={setMessage}
        setStatus={setStatus}
      />
    </div>
  );
};

export default AdminVideos;
