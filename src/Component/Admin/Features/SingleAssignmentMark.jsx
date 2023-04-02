import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useEditAssignmentMarkMutation } from "../../../features/assignmentMark/assignmentMarkAPI";

const SingleAssignmentMark = ({ assignmentMark }) => {
  const {
    id,
    title,
    createdAt,
    student_name,
    repo_link,
    mark,
    totalMark,
    status,
  } = assignmentMark || {};

  // all local state
  const [value, setValue] = useState(mark || 0);

  // all redux state
  const [editAssignmentMark, { isError, isSuccess }] =
    useEditAssignmentMarkMutation();

  // for show success update message
  useEffect(() => {
    if (isSuccess) {
      toast("Successfully update assignment mark.");
    } else if (isError) {
      toast("Can not update assignment mark for Error!");
    }
  }, [isError, isSuccess]);

  //   handler
  const handleSubmit = () => {
    if (value > 0 && value <= totalMark) {
      editAssignmentMark({
        id,
        data: { ...assignmentMark, mark: value, status: "published" },
      });
    }
  };
  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{new Date(createdAt).toLocaleString()}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      <td className="table-td input-mark ">
        <input
          max="100"
          value={value}
          readOnly={mark > 0}
          onChange={(e) => setValue(e.target.value)}
        />
        {status === "published" ? (
          ""
        ) : (
          <button onClick={handleSubmit}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  );
};

export default SingleAssignmentMark;
