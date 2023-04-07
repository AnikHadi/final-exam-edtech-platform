import React from "react";

const QuestionAnswerAnalysis = ({ questions, userScore }) => {
  return (
    <div className="mx-auto mt-8 max-w-7xl px-5 lg:px-0 shadow-2xl">
      <div className="w-2/4 mx-auto  ">
        <div className="mx-auto basis-1/2 bg-[#474E68] px-6 py-4 rounded-md h-44">
          <table className="text-center ">
            <caption className="caption-top mb-5 text-3xl">
              Your Quizzes Score
            </caption>
            <thead className="mt-5">
              <tr>
                <th className="border border-slate-600 font-bold px-3">
                  Total Marks
                </th>
                <th className="border border-slate-600 font-bold px-3">
                  Your Score
                </th>
                <th className="border border-slate-600 font-bold px-3">
                  Total Correct Answer
                </th>
                <th className="border border-slate-600 font-bold px-3">
                  Total Wrong Answer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{questions?.length * 5}</td>
                <td>{userScore}</td>
                <td>{userScore / 5}</td>
                <td>{(questions?.length * 5 - userScore) / 5}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="mx-8 basis-1/2 bg-[#474E68] px-6 py-4 rounded-md h-56">
          <h1>Hello</h1>
        </div> */}
      </div>
    </div>
  );
};

export default QuestionAnswerAnalysis;
