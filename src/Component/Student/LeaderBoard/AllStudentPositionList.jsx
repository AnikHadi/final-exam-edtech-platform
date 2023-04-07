import React from "react";

const AllStudentPositionList = ({ data }) => {
  const totalMarkArray = data.map((std) => std.totalMark);
  const uniqueTotalMarkArray = [...new Set(totalMarkArray)].slice(0, 20);
  // Top 20 last value index in unique total mark
  const lastTotalMarkNumber = uniqueTotalMarkArray.slice(-1)[0];

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
              if (lastTotalMarkNumber <= stu.totalMark) {
                const position =
                  uniqueTotalMarkArray.findIndex(
                    (item) => item === stu.totalMark
                  ) + 1;
                return (
                  <tr className="border-b border-slate-600/50" key={i}>
                    <td className="table-td text-center">{position}</td>
                    <td className="table-td text-center">{stu.name}</td>
                    <td className="table-td text-center">{stu.quizMark}</td>
                    <td className="table-td text-center">
                      {stu.assignmentMark}
                    </td>
                    <td className="table-td text-center">{stu.totalMark}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default AllStudentPositionList;
