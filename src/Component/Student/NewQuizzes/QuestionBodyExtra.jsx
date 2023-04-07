import React from "react";
import QuestionBodyENext from "./QuestionBodyENext";

const QuestionBodyExtra = ({ questions, handleChange, index }) => {
  console.log(questions);
  return (
    <div className="quiz">
      <h4 className="question">Quiz 1 - {questions.question}?</h4>
      {/* onSubmit={handleSubmit} */}
      <form className="quizOptions">
        {/* <!-- Option 1 --> */}

        {questions && (
          <QuestionBodyENext
            index={index}
            options={questions.options}
            handleChange={handleChange}
          />
        )}
      </form>
    </div>
  );
};

export default QuestionBodyExtra;
