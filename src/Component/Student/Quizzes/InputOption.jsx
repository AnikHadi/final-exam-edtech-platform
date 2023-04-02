import React from "react";

const InputOption = (ref) => {
  return (
    <label htmlFor="option1_q1">
      {/* ref={ref} */}
      <input type="checkbox" id="option1_q1" />A function that is called after a
      certain time interval
    </label>
  );
};

// const forwardedInput = React.forwardRef(InputOption);

export default InputOption;
// export default forwardedInput;
