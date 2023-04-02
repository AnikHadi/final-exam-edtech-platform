import { Button, Modal } from "flowbite-react";
import React from "react";

const PopUpMessage = ({ showModal, setShowModal, message, status }) => {
  //     <Button onClick={onClick}>
  //     Toggle modal
  //   </Button>
  return (
    <Modal
      show={showModal}
      size="md"
      popup={true}
      onClose={() => setShowModal(!showModal)}
    >
      <Modal.Header className="bg-gray-800" />
      <Modal.Body className="bg-gray-800">
        <div className="text-center">
          <h3
            className={`mb-5 text-lg font-normal ${
              status === "error"
                ? "text-red-500"
                : status === "success" && "text-green-500"
            } dark:text-gray-400`}
          >
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color={
                status === "error" ? "red" : status === "success" && "green"
              }
              onClick={() => setShowModal(!showModal)}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopUpMessage;
