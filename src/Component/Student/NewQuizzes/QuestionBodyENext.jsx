import React from "react";
import InputOption from "./InputOption";

const QuestionBodyENext = ({
  options = [],
  handleChange,
  index: questionIndex,
}) => {
  return (
    <>
      {options.map((option, index) => {
        // console.log(option);
        return (
          <InputOption
            text={option.option}
            key={index}
            index={questionIndex}
            value={index}
            checked={option.isCorrect}
            onChange={(e) => handleChange(e, index)}
          />
        );
      })}
    </>
  );
};

export default QuestionBodyENext;
