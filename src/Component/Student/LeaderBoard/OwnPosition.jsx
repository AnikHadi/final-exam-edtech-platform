import React from "react";

const OwnPosition = ({ auth, data = [] }) => {
  const ownData = data.filter((user) => user.id === auth.id);
  const totalMarkArray = data.map((std) => std.totalMark);
  const uniqueTotalMarkArray = [...new Set(totalMarkArray)].slice();
  const position =
    uniqueTotalMarkArray.findIndex((item) => item === ownData[0].totalMark) + 1;

  return (
    ownData.length > 0 && (
      <div>
        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
          <thead>
            <tr>
              <th className="table-th !text-center">Rank</th>
              <th className="table-th !text-center">Name</th>
              <th className="table-th !text-center">Quiz Mark</th>
              <th className="table-th !text-center">Assignment Mark</th>
              <th className="table-th !text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-2 border-cyan">
              <td className="table-td text-center font-bold">{position}</td>
              <td className="table-td text-center font-bold">
                {ownData[0]?.name}
              </td>
              <td className="table-td text-center font-bold">
                {ownData[0]?.quizMark}{" "}
              </td>
              <td className="table-td text-center font-bold">
                {ownData[0]?.assignmentMark}
              </td>
              <td className="table-td text-center font-bold">
                {ownData[0]?.totalMark}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default OwnPosition;
