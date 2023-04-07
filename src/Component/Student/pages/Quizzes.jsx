import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectMemoizedAuth } from "../../../features/auth/authSelector";
import { useGetQuizByVideoIdQuery } from "../../../features/quizzes/quizzesAPI";
import { useAddQuizMarkMutation } from "../../../features/quizzesMark/quizzesMarkSlice";
import Loading from "../../ui/Loading";
import QuestionBody from "../Quizzes/QuestionBody";
import Navbar from "../Share/Navbar";

// ! for use reducer start
const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      const questions = _.cloneDeep(action.value);
      questions?.forEach((question) => {
        question.options.map((option) => (option.checked = false));
      });
      return questions;

    case "answer":
      const QuestionsAns = _.cloneDeep(state);
      QuestionsAns[action.questionID].options[action.optionIndex].checked =
        action.value;
      return QuestionsAns;
    default:
      return state;
  }
}; // ! for use reducer end

const Quizzes = () => {
  // <title>Quiz - LWS</title>
  // all local state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { videoId } = useParams();
  const navigate = useNavigate();
  const student = useSelector(selectMemoizedAuth);
  const { data, isError, isLoading } = useGetQuizByVideoIdQuery(videoId);
  const questions = _.cloneDeep(data);
  // console.log(data);

  // ! new handle copy and answer quizzes mark start
  const [qna, dispatch] = useReducer(reducer, initialState);
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
  }; // ! new handle copy and answer quizzes mark end

  // * add quiz mark in db
  const [addQuizMark] = useAddQuizMarkMutation();

  // TODO
  const calculate = () => {
    let score = 0;
    questions &&
      qna &&
      questions.forEach((question, index1) => {
        let correctIndexes = [],
          checkedIndexes = [];

        question.options.forEach((option, index2) => {
          if (option.isCorrect) correctIndexes.push(index2);
          if (qna[index1].options[index2].checked) {
            checkedIndexes.push(index2);
            option.checked = true;
          }
        });

        if (_.isEqual(correctIndexes, checkedIndexes)) {
          score = score + 5;
        }
      });
    return score;
  };

  const userScore = calculate();

  // handle when use click the prev and next button
  const nextQuestion = () => {
    if (currentQuestion + 1 < data?.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion >= 1 && currentQuestion <= data?.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  };

  const submitQuestion = () => {
    const newQuizMark = {
      student_id: student?.id,
      student_name: student?.name,
      video_id: Number(videoId),
      video_title: data[0]?.video_title,
      totalQuiz: data?.length,
      totalCorrect: userScore / 5,
      totalWrong: (data?.length * 5 - userScore) / 5,
      totalMark: data?.length * 5,
      mark: userScore,
    };
    addQuizMark(newQuizMark);

    navigate(`/courses/${videoId}/quizzes/answer`, {
      state: { qna, questions, userScore },
    });
  };
  const lastIndex = data?.length - 1;

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
    data?.length > 0 && (
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
              <div className="quiz">
                <h4 className="question">
                  Quiz 1 - {data[currentQuestion].question}?
                </h4>

                <form className="quizOptions">
                  {qna && (
                    <QuestionBody
                      options={qna[currentQuestion].options}
                      handleChange={handleAnswerChange}
                      input
                    />
                  )}
                </form>
              </div>
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 rounded-full bg-cyan  ml-6 mr-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 flex"
                type="submit"
                onClick={prevQuestion}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                <span> Previous</span>
              </button>

              <button
                className="px-4 py-2 rounded-full bg-cyan  mr-6 ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 flex"
                type="submit"
                onClick={
                  currentQuestion === lastIndex ? submitQuestion : nextQuestion
                }
              >
                {currentQuestion === lastIndex ? "Submit" : "Next"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default Quizzes;
