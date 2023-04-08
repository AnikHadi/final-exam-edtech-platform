import { Button, Label, Modal, TextInput } from "flowbite-react";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAssignmentByVideoIdQuery } from "../../../features/assignment/assignmentAPI";
import {
  useAddAssignmentMarkMutation,
  useGetAssignmentMarkByAssignmentIdStudentIdQuery,
} from "../../../features/assignmentMark/assignmentMarkAPI";
import { selectMemoizedAuth } from "../../../features/auth/authSelector";
import { useGetQuizByVideoIdQuery } from "../../../features/quizzes/quizzesAPI";
import { useGetQuizMarkByVideoIdAndStudentIdQuery } from "../../../features/quizzesMark/quizzesMarkSlice";
import CheckIcon from "../../ui/CheckIcon";
import DisableIcon from "../../ui/DisableIcon";

// ! for use reducer start
const initialState = {
  assignmentInfo: {},
  getQuizByVideoId: [],
  addAssignmentMarkResponse: {},
  getAssignmentMark: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ASSIGNMENT_INFO":
      const assignment = _.cloneDeep(action.payload);
      return { ...state, assignmentInfo: assignment };
    case "ADD_QUIZ_INFO":
      return { ...state, getQuizByVideoId: action.payload };
    case "ADD_ASSIGNMENT_MARK_RESPONSE":
      return { ...state, addAssignmentMarkResponse: action.payload };

    case "GET_ASSIGNMENT_MARK":
      return { ...state, getAssignmentMark: action.payload };
    default:
      return state;
  }
}; // ! for use reducer end

const VideoDescription = ({ video }) => {
  const { title, description, createdAt } = video || {};
  const [state, dispatch] = useReducer(reducer, initialState);

  // all local state
  const [showModal, setShowModal] = useState(false);
  const [showModalForRepoLink, setShowModalForRepoLink] = useState(false);
  const [assignmentBtn, setAssignmentBtn] = useState(false);
  const { videoId } = useParams();

  const {
    assignmentInfo,
    getQuizByVideoId,
    addAssignmentMarkResponse,
    getAssignmentMark,
  } = state || {};

  // all redux state
  // ! for get information and create new assignment mark  (1)
  const student = useSelector(selectMemoizedAuth);
  // TODO {complete}         (2)
  const { data: assignmentInformation } = useGetAssignmentByVideoIdQuery(
    videoId,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // ! for create new assignment mark in database     (3)
  const [addAssignmentMark, { data, isSuccess }] =
    useAddAssignmentMarkMutation();

  // start fetch update assignment mark data   (4)
  const { data: assignmentMark } =
    useGetAssignmentMarkByAssignmentIdStudentIdQuery(
      {
        assignmentId: assignmentInfo?.id,
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

  // ! get quiz by video id     (6)
  const { data: getQuiz } = useGetQuizByVideoIdQuery(videoId);

  useEffect(() => {
    dispatch({
      type: "ADD_QUIZ_INFO",
      payload: getQuiz,
    });
  }, [getQuiz]);

  useEffect(() => {
    if (assignmentInformation?.length > 0) {
      dispatch({
        type: "ADD_ASSIGNMENT_INFO",
        payload: assignmentInformation[0],
      });
    } else if (assignmentInformation?.length === 0) {
      dispatch({ type: "ADD_ASSIGNMENT_INFO", payload: {} });
    }
  }, [assignmentInformation]);

  // set fetch assignment by video id in local state {complete}
  useEffect(() => {
    if (isSuccess) {
      toast("Successfully submit repo link.");
      dispatch({ type: "ADD_ASSIGNMENT_MARK_RESPONSE", payload: data });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (assignmentMark?.length > 0) {
      dispatch({ type: "ADD_ASSIGNMENT_MARK_RESPONSE", payload: {} });
      dispatch({ type: "GET_ASSIGNMENT_MARK", payload: assignmentMark[0] });
    } else if (assignmentMark?.length === 0) {
      dispatch({ type: "ADD_ASSIGNMENT_MARK_RESPONSE", payload: {} });
      dispatch({ type: "GET_ASSIGNMENT_MARK", payload: {} });
    }
  }, [assignmentMark]);

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
        assignment_id: state?.assignmentInfo?.id,
        title: state?.assignmentInfo?.title,
        createdAt: new Date().toISOString(),
        totalMark: state?.assignmentInfo?.totalMark,
        mark: 0,
        repo_link,
        status: "pending",
      });
      setShowModal(!showModal);
    }
    e.target.reset();
  };
  // border-red-500
  const btnDisable = " text-gray-400";
  const btnActive =
    "border-cyan border text-cyan hover:bg-cyan hover:text-primary";

  useEffect(() => {
    if (getAssignmentMark?.id) {
      setAssignmentBtn(true);
    } else if (addAssignmentMarkResponse?.id) {
      if (addAssignmentMarkResponse.assignment_id === assignmentInfo?.id) {
        setAssignmentBtn(true);
      }
    } else {
      setAssignmentBtn(false);
    }
  }, [addAssignmentMarkResponse, getAssignmentMark, assignmentInfo]);

  return (
    <div>
      <h1 className="text-lg font-semibold  tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on, {new Date(createdAt).toDateString()}
      </h2>

      <div className="flex gap-4">
        {/* Show total number  */}
        {assignmentInfo.totalMark && (
          <div className="rounded-full px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500">
            <p className="text-center ">
              সর্বমোট নাম্বার - {assignmentInfo?.totalMark}
            </p>
          </div>
        )}

        {/* show repo link Btn */}
        {getAssignmentMark.repo_link && (
          <button
            className="rounded-full px-4 py-1 bg-gradient-to-r from-green-500 to-blue-500"
            onClick={() => setShowModalForRepoLink(!showModalForRepoLink)}
          >
            <p className="text-center ">আপনি যা জমা দিয়েছেন</p>
          </button>
        )}

        {/* Assignment Btn */}
        {assignmentInfo?.id ? (
          <button
            disabled={assignmentBtn}
            onClick={() => setShowModal(!showModal)}
            className={`px-3 font-bold py-1 rounded-full text-sm   ${
              assignmentBtn ? btnDisable : btnActive
            }`}
          >
            {assignmentBtn ? (
              <CheckIcon
                text={`প্রাপ্ত নাম্বার - ${
                  getAssignmentMark.mark > 0
                    ? getAssignmentMark.mark
                    : "PENDING"
                }`}
              />
            ) : (
              "এসাইনমেন্ট"
            )}
          </button>
        ) : null}

        {/* quiz Btn */}
        {getQuizByVideoId?.length > 0 ? (
          <Link
            disabled
            to={
              quizMark?.length > 0
                ? `/courses/${videoId}`
                : `/courses/${videoId}/quizzes`
            } //
            className={`ml-auto px-3 font-bold  py-1 rounded-full text-sm  ${
              quizMark?.length > 0 ? btnDisable : btnActive
            }`}
          >
            {quizMark?.length > 0 ? (
              <CheckIcon text="কুইজ দিয়েছেন" />
            ) : (
              "কুইজে অংশগ্রহণ করুন"
            )}
          </Link>
        ) : (
          <DisableIcon text="কুইজ নেই" />
        )}
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
      {/* for show repo link */}
      <Modal
        show={showModalForRepoLink}
        size="md"
        popup={true}
        onClose={() => setShowModalForRepoLink(!showModalForRepoLink)}
      >
        <Modal.Header className="bg-slate-800" />
        <Modal.Body className="bg-slate-800">
          <div>
            <h3 className="text-xl font-medium text-gray-50 pb-8">
              আপনি এসাইনমেন্ট এ যা{" "}
              <span className="text-cyan-500 text-2xl ">জমা দিয়েছেন</span>
            </h3>
            <div>
              <p className="pb-3">রিপোসিটরি লিঙ্ক</p> <hr />
              <p className="py-3 px-3 select-all hover:bg-slate-700">
                {getAssignmentMark?.repo_link}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* for repo link submit */}
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
