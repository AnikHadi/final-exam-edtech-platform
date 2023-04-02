import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../../features/assignment/assignmentAPI";
import { useGetVideosQuery } from "../../../features/videos/videosAPI";

const AddAssignmentInput = ({ showModal, setShowModal, assignment }) => {
  //
  const { id, title, video_title, totalMark } = assignment || {};

  // all redux state
  const { data: videos } = useGetVideosQuery();
  const { data: fetchAssignment } = useGetAssignmentsQuery();
  const [addAssignment, { isSuccess: addSuccess }] = useAddAssignmentMutation();
  const [editAssignment, { isSuccess: editSuccess }] =
    useEditAssignmentMutation();

  // utils

  useEffect(() => {
    if (addSuccess) {
      toast("Successfully added assignment.");
      setShowModal(false);
    } else if (editSuccess) {
      toast("Successfully edited this assignment.");
      setShowModal(false);
    }
  }, [addSuccess, editSuccess]);

  //   handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const video_title = e.target.video_title.value;
    const totalMark = Number(e.target.totalMark.value);
    const video_id = videos?.find((vid) => vid.title === video_title)?.id;
    const newAssignment = {
      title: `Assignment ${video_id} - ${title}`,
      video_id,
      video_title,
      totalMark,
    };
    // condition to add assignment OR update assignment
    if (id) {
      editAssignment({
        id,
        data: { id, ...newAssignment, title },
      });
    } else {
      addAssignment(newAssignment);
    }
    e.target.reset();
  };

  return (
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
              defaultValue={title}
            />
          </div>
          <div id="select">
            <div className="mb-2 block">
              <Label
                className="!text-custom_gray_50"
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
          <div>
            <div className="mb-2 block">
              <Label
                className="!text-custom_gray_50"
                htmlFor="totalMark"
                value="Assignment Mark"
              />
            </div>
            <TextInput
              type="number"
              sizing="md"
              name="totalMark"
              placeholder="Enter assignment mark"
              defaultValue={totalMark}
              max={1000}
              min={1}
              required={true}
            />
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

export default AddAssignmentInput;
