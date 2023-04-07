import React from "react";
import InputOption from "./InputOption";

const QuestionBody = ({ options = [], handleChange, input }) => {
  return (
    <>
      {options.map((option, index) => {
        return input ? (
          <InputOption
            text={option.option}
            key={index}
            value={index}
            checked={option.checked}
            onChange={(e) => handleChange(e, index)}
          />
        ) : (
          <InputOption
            text={option.option}
            key={index}
            defaultChecked={option.checked}
            disabled
          />
        );
      })}
    </>
  );
};

export default QuestionBody;
