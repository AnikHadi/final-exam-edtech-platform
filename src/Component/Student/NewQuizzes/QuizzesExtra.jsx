import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetQuizByVideoIdQuery } from "../../../features/quizzes/quizzesAPI";
import Loading from "../../ui/Loading";
import QuestionBodyExtra from "../NewQuizzes/QuestionBodyExtra";
// import QuizzesBody from "../Quizzes/QuizzesBody";
import _ from "lodash";
import Navbar from "../Share/Navbar";

// ! for use reducer
const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      const questions = _.cloneDeep(action.value);
      questions?.forEach((question) => {
        question.options.map((option) => {
          option.isCorrect = false;
        });
      });
      // console.log(questions);
      return questions;

    case "answer":
      const QuestionsAns = _.cloneDeep(state);
      console.log(QuestionsAns);
      QuestionsAns[action.questionID].options[action.optionIndex].isCorrect =
        action.value;

      return QuestionsAns;
    default:
      return state;
  }
};

const QuizzesExtra = () => {
  // <title>Quiz - LWS</title>
  // all local state
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { videoId } = useParams();

  const { data, isError, isLoading } = useGetQuizByVideoIdQuery(videoId);

  // ! new
  const [qna, dispatch] = useReducer(reducer, initialState);

  console.log(qna);
  useEffect(() => {
    dispatch({
      type: "questions",
      value: data,
    });
  }, [data]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  if (isLoading) <Loading />;

  return isError ? (
    <div className="flex justify-center items-center text-3xl mt-32">
      There was an error!
    </div>
  ) : data?.length === 0 ? (
    <div className="flex justify-center items-center text-3xl ">
      There was no video found!
    </div>
  ) : (
    qna?.length > 0 && (
      <div>
        <Navbar />
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">
                Quizzes for "{data[0].video_title}"
              </h1>
              <p className="text-sm text-slate-200">
                Each question contains 5 Mark
              </p>
            </div>
            <div className="space-y-8 ">
              {/* <QuizzesBody quizzes={quizzes} /> */}
              {qna.map((quiz, i) => {
                return (
                  <QuestionBodyExtra
                    index={i}
                    questions={quiz}
                    handleChange={handleAnswerChange}
                    key={i}
                  />
                );
              })}

              {/* <div className="quiz">
              <h4 className="question">
                Quiz 2 - Which of the following is an example of a situation
                where you would use the Debounce function?
              </h4>
              <form className="quizOptions">
                <label htmlFor="option1_q2">
                  <input type="checkbox" id="option1_q2" />A search bar where
                  the results are displayed as you type.
                </label>

                <label htmlFor="option2_q2">
                  <input type="checkbox" id="option2_q2" />A button that
                  performs an action when clicked.
                </label>

                <label htmlFor="option3_q2">
                  <input type="checkbox" id="option3_q2" />
                  An animation that plays when a user hovers over an element.
                </label>

                <label htmlFor="option4_q2">
                  <input type="checkbox" id="option4_q2" />
                  All of the above.
                </label>
              </form>
            </div> */}
            </div>

            <button
              className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
              type="submit"
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    )
  );
};

export default QuizzesExtra;
