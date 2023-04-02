import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const VideoDescription = ({ video }) => {
  const { title, description, createdAt } = video || {};
  // all local state
  const [showModal, setShowModal] = useState(false);
  const { videoId } = useParams();
  // console.log(repoLink);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.repoLink.value);
    setShowModal(!showModal);
    e.target.reset();
  };

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on, {new Date(createdAt).toDateString()}
      </h2>

      <div className="flex gap-4">
        <button
          onClick={() => setShowModal(!showModal)}
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
        >
          এসাইনমেন্ট
        </button>

        <Link
          to={`/courses/${videoId}/quizzes`}
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
        >
          কুইজে অংশগ্রহণ করুন
        </Link>
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>

      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(!showModal)}
      >
        <Modal.Header className="bg-slate-800" />
        <Modal.Body className="bg-slate-800">
          <form
            className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-medium text-gray-50">
              Submit your assignment
            </h3>
            <div>
              <div className="mb-2 block">
                <Label
                  className="!text-custom_gray_50"
                  htmlFor="text"
                  value="Please Enter Github repo link"
                />
              </div>
              <TextInput
                type="text"
                name="repoLink"
                placeholder="Github repo link"
                required={true}
              />
            </div>

            <div className="w-fit m-0 p-0 ">
              <Button
                className=" ring-2 ring-green-500 hover:text-white border hover:bg-green-500 focus:ring-3 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VideoDescription;
