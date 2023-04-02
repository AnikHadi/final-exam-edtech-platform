import React from "react";

const SingleStudentPosition = ({ student }) => {
  const { id, email, name } = student || {};
  // console.log(student);
  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{id}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">50</td>
      <td className="table-td text-center">50</td>
      <td className="table-td text-center">100</td>
    </tr>
  );
};

export default SingleStudentPosition;
