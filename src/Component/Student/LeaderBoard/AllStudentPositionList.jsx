import React from "react";
import { useGetUsersQuery } from "../../../features/user/userAPI";
import SingleStudentPosition from "./SingleStudentPosition";

const AllStudentPositionList = ({ ownEmail }) => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  const studentList = users
    ?.filter((std) => {
      if (std.email === ownEmail) {
        return "";
      } else if (std.role === "admin") {
        return "";
      } else {
        return std;
      }
    })
    .sort((a, b) => b.id - a.id);

  // console.log(studentList);
  return (
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
          {studentList?.map((stu, i) => (
            <SingleStudentPosition student={stu} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudentPositionList;
