import React from "react";

function InputOption({ text, ...rest }) {
  return (
    <label>
      <input type="checkbox" {...rest} />
      {text}
    </label>
  );
}

// export default InputOption;
export default InputOption;
