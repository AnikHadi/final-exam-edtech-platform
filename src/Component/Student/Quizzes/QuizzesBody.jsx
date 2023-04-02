import React from "react";
import InputOption from "./InputOption";

const QuizzesBody = () => {
  // const inputRef = useRef();
  return (
    <div className="quiz">
      <h4 className="question">
        Quiz 1 - What is a Debounce function in JavaScript?
      </h4>
      <form className="quizOptions">
        {/* <!-- Option 1 --> */}
        {/* ref={inputRef} */}
        <InputOption />

        {/* <!-- Option 2 --> */}
        <label htmlFor="option2_q1">
          <input type="checkbox" id="option2_q1" />A function that is called
          after a certain time interval
        </label>
        {/* <InputOption /> */}

        {/* <!-- Option 3 --> */}
        <label htmlFor="option3_q1">
          <input type="checkbox" id="option3_q1" />A function that is called
          after a certain time interval
        </label>
        {/* <InputOption /> */}

        {/* <!-- Option 4 --> */}
        <label htmlFor="option4_q1">
          <input type="checkbox" id="option4_q1" />A function that is called
          after a certain time interval
        </label>
        {/* <InputOption /> */}
      </form>
    </div>
  );
};

export default QuizzesBody;
