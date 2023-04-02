import React from "react";
import QuizzesBody from "../Quizzes/QuizzesBody";
import Navbar from "../Share/Navbar";

const Quizzes = () => {
  // <title>Quiz - LWS</title>

  return (
    <div>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Quizzes for "Debounce Function in JavaScript - JavaScript Job
              Interview question"
            </h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">
            <QuizzesBody />

            <div className="quiz">
              <h4 className="question">
                Quiz 2 - Which of the following is an example of a situation
                where you would use the Debounce function?
              </h4>
              <form className="quizOptions">
                {/* <!-- Option 1 --> */}
                <label htmlFor="option1_q2">
                  <input type="checkbox" id="option1_q2" />A search bar where
                  the results are displayed as you type.
                </label>

                {/* <!-- Option 2 --> */}
                <label htmlFor="option2_q2">
                  <input type="checkbox" id="option2_q2" />A button that
                  performs an action when clicked.
                </label>

                {/* <!-- Option 3 --> */}
                <label htmlFor="option3_q2">
                  <input type="checkbox" id="option3_q2" />
                  An animation that plays when a user hovers over an element.
                </label>

                {/* <!-- Option 4 --> */}
                <label htmlFor="option4_q2">
                  <input type="checkbox" id="option4_q2" />
                  All of the above.
                </label>
              </form>
            </div>
          </div>

          <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Quizzes;
