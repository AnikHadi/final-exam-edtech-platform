import React from "react";
// import { useGetUsersQuery } from "../../../features/user/userAPI";

const AllStudentPositionList = ({ data }) => {
  return (
    data.length > 0 && (
      <div className="my-8">
        <h3 className="text-lg font-bold">Top 20 Result</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
          <thead>
            <tr className="border-b border-slate-600/50">
              <th className="table-th !text-center">Rank</th>
              <th className="table-th !text-center">Name</th>
              <th className="table-th !text-center">Quiz Mark</th>
              <th className="table-th !text-center">Assignment Mark</th>
              <th className="table-th !text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((stu, i) => {
              return (
                <tr className="border-b border-slate-600/50" key={i}>
                  <td className="table-td text-center">{i + 1}</td>
                  <td className="table-td text-center">{stu.name}</td>
                  <td className="table-td text-center">{stu.quizMark}</td>
                  <td className="table-td text-center">{stu.assignmentMark}</td>
                  <td className="table-td text-center">{stu.totalMark}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default AllStudentPositionList;
