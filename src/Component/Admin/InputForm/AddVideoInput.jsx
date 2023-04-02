import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useAddVideoMutation,
  useEditVideoMutation,
} from "../../../features/videos/videosAPI";

const AddVideoInput = ({
  showModal,
  setShowModal,
  video,
  setMessage,
  setStatus,
}) => {
  const { id, title, duration, views, url, description } = video || {};

  const [addVideo, { isError: addError, isSuccess: addSuccess }] =
    useAddVideoMutation();
  const [editVideo, { isError: editError, isSuccess: editSuccess }] =
    useEditVideoMutation();

  useEffect(() => {
    if (addSuccess) {
      setMessage("Successfully added this video in database.");
      setStatus("success");
      setShowModal(false);
    } else if (addError) {
      toast("Can not add video for internal Error!");
    } else if (editSuccess) {
      toast("Successfully edit this video in database.");
      setShowModal(false);
    } else if (editError) {
      toast("Can not update video for internal Error!");
    }
  }, [addError, editError, addSuccess, editSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const duration = e.target.duration.value;
    const views = e.target.views.value;
    const url = e.target.url.value;
    const description = e.target.description.value;
    const newVideo = {
      title,
      description,
      url,
      views,
      duration,
      createdAt: new Date().toISOString(),
    };

    if (id) {
      editVideo({
        id,
        data: {
          ...newVideo,
          id,
        },
      });
      setStatus("");
      setMessage("");
    } else {
      addVideo(newVideo);
      setStatus("");
      setMessage("");
    }
    e.target.reset();
  };
  return (
    <Modal
      show={showModal}
      // size="md"
      popup={true}
      onClose={() => setShowModal(!showModal)}
    >
      <Modal.Header className="bg-slate-800" />
      <Modal.Body className="bg-slate-800">
        <form
          className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-medium text-gray-50">Add Video</h3>
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
              placeholder="Enter video title"
              required={true}
              contentEditable
              defaultValue={title}
              // value={}
              // onChange={handleChange}
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <div className="mb-2 block text-gray-50">
                <Label
                  className="!text-custom_gray_50"
                  htmlFor="base"
                  value="Duration"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="duration"
                placeholder="Enter video duration"
                defaultValue={duration}
                required={true}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  className="!text-custom_gray_50"
                  htmlFor="base"
                  value="Views"
                />
              </div>
              <TextInput
                type="text"
                sizing="md"
                name="views"
                placeholder="Enter video views number"
                defaultValue={views}
                required={true}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                className="!text-custom_gray_50"
                htmlFor="base"
                value="Url"
              />
            </div>
            <TextInput
              type="text"
              sizing="md"
              name="url"
              placeholder="Enter video url"
              defaultValue={url}
              required={true}
            />
          </div>

          <div id="textarea">
            <div className="mb-2 block">
              <Label
                htmlFor="comment"
                className="!text-custom_gray_50"
                value="Video Description"
              />
            </div>
            <Textarea
              name="description"
              placeholder="Enter video description...."
              defaultValue={description}
              required={true}
              rows={4}
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

export default AddVideoInput;
