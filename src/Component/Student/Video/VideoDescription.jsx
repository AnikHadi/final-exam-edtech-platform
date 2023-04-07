import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAssignmentByVideoIdQuery } from "../../../features/assignment/assignmentAPI";
import {
  useAddAssignmentMarkMutation,
  useGetAssignmentMarkByAssignmentIdStudentIdQuery,
} from "../../../features/assignmentMark/assignmentMarkAPI";
import { selectMemoizedAuth } from "../../../features/auth/authSelector";
import { useGetQuizMarkByVideoIdAndStudentIdQuery } from "../../../features/quizzesMark/quizzesMarkSlice";

const VideoDescription = ({ video }) => {
  const { title, description, createdAt } = video || {};

  // all local state
  const [showModal, setShowModal] = useState(false);
  const [assignmentByVideoId, setAssignmentByVideoId] = useState({});
  const [responseAddAssignmentMark, setResponseAddAssignmentMark] = useState(
    {}
  );
  const { videoId } = useParams();

  // all redux state

  // ! for get information and create new assignment mark  (1)
  const student = useSelector(selectMemoizedAuth);
  // TODO {complete}                              (2)
  const { data: assignmentInfo, isSuccess: fetchAssignmentByVideoIdSuccess } =
    useGetAssignmentByVideoIdQuery(videoId, {
      refetchOnMountOrArgChange: true,
    });
  const {
    id: assignmentId,
    title: assignmentTitle,
    totalMark,
  } = assignmentByVideoId || {};
  // get information for create new assignment mark

  // ! for create new assignment mark in database    (3)
  const [addAssignmentMark, { data, isSuccess }] =
    useAddAssignmentMarkMutation();

  // console.log(
  //   "responseAddAssignmentMark: ",
  //   responseAddAssignmentMark,
  //   assignmentInfo
  // );

  // start fetch update assignment mark data {complete}  (4)
  const { data: assignmentMark } =
    useGetAssignmentMarkByAssignmentIdStudentIdQuery(
      {
        assignmentId,
        studentId: student?.id,
      },
      { refetchOnMountOrArgChange: true }
    );

  // TODO quiz mark update  {complete}  (5)
  const { data: quizMark } = useGetQuizMarkByVideoIdAndStudentIdQuery(
    {
      videoId,
      studentId: student?.id,
    },
    { refetchOnMountOrArgChange: true }
  );

  // set fetch assignment by video id in local state {complete}
  useEffect(() => {
    if (isSuccess) {
      toast("Successfully submit repo link.");
      setResponseAddAssignmentMark(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (fetchAssignmentByVideoIdSuccess) {
      setAssignmentByVideoId(assignmentInfo[0]);
    }
  }, [fetchAssignmentByVideoIdSuccess, assignmentInfo]);

  // handler submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const repo_link = e.target.repoLink.value;
    const confirmation = window.confirm(
      "Confirm, You want to submit your repo link?"
    );
    if (confirmation) {
      addAssignmentMark({
        student_id: student?.id,
        student_name: student?.name,
        assignment_id: assignmentId,
        title: assignmentTitle,
        createdAt: new Date().toISOString(),
        totalMark,
        mark: 0,
        repo_link,
        status: "pending",
      });
      setShowModal(!showModal);
    }
    e.target.reset();
  };

  const btnDisable = "border-red-500 text-gray-400";
  const btnActive = "border-cyan text-cyan hover:bg-cyan hover:text-primary";

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
          disabled={
            (assignmentMark?.length > 0
              ? assignmentMark[0].status === "published" ||
                assignmentMark[0].status === "pending"
              : false) ||
            (responseAddAssignmentMark?.length > 0 &&
            responseAddAssignmentMark &&
            responseAddAssignmentMark.assignment_id === assignmentInfo?.id
              ? responseAddAssignmentMark.status === "published" ||
                responseAddAssignmentMark.status === "pending"
              : false)
          }
          onClick={() => setShowModal(!showModal)}
          className={`px-3 font-bold py-1 border rounded-full text-sm   ${
            (assignmentMark?.length > 0 &&
            (assignmentMark[0].status === "published" ||
              assignmentMark[0].status === "pending")
              ? btnDisable
              : btnActive) ||
            (assignmentInfo.length > 0 &&
            responseAddAssignmentMark &&
            responseAddAssignmentMark.assignment_id === assignmentInfo[0].id
              ? btnDisable
              : btnActive)
          }`}
        >
          এসাইনমেন্ট
        </button>

        <Link
          disabled
          to={
            quizMark?.length > 0
              ? `/courses/${videoId}`
              : `/courses/${videoId}/quizzes`
          }
          className={`px-3 font-bold py-1 border   rounded-full text-sm  ${
            quizMark?.length > 0 ? btnDisable : btnActive
          }`}
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
