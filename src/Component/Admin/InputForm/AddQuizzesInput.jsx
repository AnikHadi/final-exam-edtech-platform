import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useAddQuizMutation,
  useEditQuizMutation,
} from "../../../features/quizzes/quizzesAPI";
import { useGetVideosQuery } from "../../../features/videos/videosAPI";

const AddQuizzesInput = ({ showModal, setShowModal, quizzes }) => {
  const { id, question, video_title, options } = quizzes || {};
  // all local state
  const [option_0, setOptionId_0] = useState("");
  const [option_1, setOptionId_1] = useState("");
  const [option_2, setOptionId_2] = useState("");
  const [option_3, setOptionId_3] = useState("");
  const [isCorrect_0, setIsCorrect_0] = useState();
  const [isCorrect_1, setIsCorrect_1] = useState();
  const [isCorrect_2, setIsCorrect_2] = useState();
  const [isCorrect_3, setIsCorrect_3] = useState();

  // for edit quizzes initial state
  useEffect(() => {
    if (id) {
      options?.map((op, i) => {
        if (Number(op.id) === 1) {
          return setOptionId_0(op.option);
        } else if (Number(op.id) === 2) {
          return setOptionId_1(op.option);
        } else if (Number(op.id) === 3) {
          return setOptionId_2(op.option);
        } else if (Number(op.id) === 4) {
          return setOptionId_3(op.option);
        }
      });

      options?.map((op, i) => {
        if (Number(op.id) === 1) {
          return setIsCorrect_0(op.isCorrect);
        } else if (Number(op.id) === 2) {
          return setIsCorrect_1(op.isCorrect);
        } else if (Number(op.id) === 3) {
          return setIsCorrect_2(op.isCorrect);
        } else if (Number(op.id) === 4) {
          return setIsCorrect_3(op.isCorrect);
        }
      });
    }
  }, [options, id]);

  // for redux state
  const { data: videos } = useGetVideosQuery();
  const [addQuiz, { isError: addError, isSuccess: addSuccess }] =
    useAddQuizMutation();
  const [editQuiz, { isError: editError, isSuccess: editSuccess }] =
    useEditQuizMutation();

  // for message & modal close
  useEffect(() => {
    if (addSuccess) {
      toast("Successfully added quiz in database.");
      setShowModal(false);
    } else if (addError) {
      toast("Can not add quiz for internal Error!");
    } else if (editSuccess) {
      toast("Successfully edited quiz in database.");
      setShowModal(false);
    } else if (editError) {
      toast("Can not edit quiz for internal Error!");
    }
  }, [addError, editError, addSuccess, editSuccess]);

  //   handler quiz submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const question = e.target.title.value;
    const video_title = e.target.video_title.value;
    const question_1 = e.target.question_1.value;
    const question_1_ans =
      e.target.question_1_ans.value === "true" ? true : false;
    const question_2 = e.target.question_2.value;
    const question_2_ans =
      e.target.question_2_ans.value === "true" ? true : false;
    const question_3 = e.target.question_3.value;
    const question_3_ans =
      e.target.question_3_ans.value === "true" ? true : false;
    const question_4 = e.target.question_4.value;
    const question_4_ans =
      e.target.question_4_ans.value === "true" ? true : false;
    const video_id = videos?.find((vid) => vid.title === video_title)?.id;

    // new quiz information
    const newQuiz = {
      question,
      video_id,
      video_title,
      options: [
        {
          id: 1,
          option: question_1,
          isCorrect: question_1_ans,
        },
        {
          id: 2,
          option: question_2,
          isCorrect: question_2_ans,
        },
        {
          id: 3,
          option: question_3,
          isCorrect: question_3_ans,
        },
        {
          id: 4,
          option: question_4,
          isCorrect: question_4_ans,
        },
      ],
    };
    // conditionally decide add quiz OR edit quiz
    if (id) {
      editQuiz({ id, data: { id, ...newQuiz } });
    } else {
      addQuiz(newQuiz);
    }
    e.target.reset();
  };

  return (
    <Modal
      show={showModal}
      //   size="md"
      popup={true}
      onClose={() => setShowModal(!showModal)}
    >
      <Modal.Header className="bg-slate-800" />
      <Modal.Body className="bg-slate-800">
        <form
          className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-medium text-gray-50">Add Assignment</h3>
          <div>
            <div className="mb-2 block">
              <Label
                className="!text-custom_gray_50"
                htmlFor="base"
                value="Title"
              />
            </div>
            <TextInput
              type="text"
              sizing="md"
              name="title"
              placeholder="Enter assignment title"
              required={true}
              contentEditable
              defaultValue={question}
            />
          </div>
          <div id="select">
            <div className="mb-2 block">
              <Label
                className="!text-custom_White"
                htmlFor="video_title"
                value="Select video title"
              />
            </div>
            <Select
              id="video_title"
              required={true}
              sizing="md"
              name="video_title"
              defaultValue={video_title}
            >
              <option hidden>Select video</option>
              {videos?.map((video, i) => (
                <option value={video.title} key={i}>
                  {video.title}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid  mb-6 md:grid-cols-5 gap-4">
            <div className=" col-span-4">
              <div className="  mb-2  text-gray-50">
                <Label
                  className="!text-custom_White"
                  htmlFor="question"
                  value="Option 1"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="question_1"
                placeholder="Enter option 1"
                defaultValue={option_0}
                required={true}
              />
            </div>

            <div className="gap-4 col-span-1">
              <div className="mb-2 block">
                <Label
                  className="!text-custom_White"
                  htmlFor="ans"
                  value="Ans Boolean"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="question_1_ans"
                placeholder="Answer"
                defaultValue={isCorrect_0}
                required={true}
              />
            </div>
          </div>

          <div className="grid  mb-6 md:grid-cols-5 gap-4">
            <div className=" col-span-4">
              <div className="  mb-2  text-gray-50">
                <Label
                  className="!text-custom_White"
                  htmlFor="question"
                  value="Option 2"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="question_2"
                placeholder="Enter option 2"
                defaultValue={option_1}
                required={true}
              />
            </div>

            <div className="gap-4 col-span-1">
              <div className="mb-2 block">
                <Label
                  className="!text-custom_White"
                  htmlFor="ans"
                  value="Ans Boolean"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="question_2_ans"
                placeholder="Answer"
                defaultValue={isCorrect_1}
                required={true}
              />
            </div>
          </div>

          <div className="grid  mb-6 md:grid-cols-5 gap-4">
            <div className=" col-span-4">
              <div className="  mb-2  text-gray-50">
                <Label
                  className="!text-custom_White"
                  htmlFor="question"
                  value="Option 3"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="question_3"
                placeholder="Enter option 3"
                defaultValue={option_2}
                required={true}
              />
            </div>

            <div className="gap-4 col-span-1">
              <div className="mb-2 block">
                <Label
                  className="!text-custom_White"
                  htmlFor="ans"
                  value="Ans Boolean"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="question_3_ans"
                placeholder="Answer"
                defaultValue={isCorrect_2}
                required={true}
              />
            </div>
          </div>

          <div className="grid  mb-6 md:grid-cols-5 gap-4">
            <div className=" col-span-4">
              <div className="  mb-2  text-gray-50">
                <Label
                  className="!text-custom_White"
                  htmlFor="question"
                  value="Option 4"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="question_4"
                placeholder="Enter option 4"
                defaultValue={option_3}
                required={true}
              />
            </div>

            <div className="gap-4 col-span-1">
              <div className="mb-2 block">
                <Label
                  className="!text-custom_White"
                  htmlFor="ans"
                  value="Ans Boolean"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="question_4_ans"
                placeholder="Answer"
                defaultValue={isCorrect_3}
                required={true}
              />
            </div>
          </div>

          <div className="w-fit m-0 p-0 flex">
            <Button
              className=" ring-2 ring-green-500 hover:text-white border hover:bg-green-500 focus:ring-3 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className="ml-8 ring-2 ring-red-500 hover:text-white border hover:bg-red-500 focus:ring-3 focus:outline-none  font-medium rounded-lg text-sm"
              onClick={() => setShowModal(!showModal)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddQuizzesInput;
