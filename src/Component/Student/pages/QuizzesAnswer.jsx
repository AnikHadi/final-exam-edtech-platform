import React from "react";
import { useLocation } from "react-router-dom";
import QuestionAnswerAnalysis from "../Quizzes/QuestionAnswerAnalysis";
import QuestionBody from "../Quizzes/QuestionBody";
import Navbar from "../Share/Navbar";

const QuizzesAnswer = () => {
  const location = useLocation();
  const { qna, questions, userScore } = location?.state || {};

  return (
    qna && (
      <div>
        <Navbar />
        <section className="py-6">
          <QuestionAnswerAnalysis questions={questions} userScore={userScore} />
        </section>
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">
                Quizzes for "{qna[0].video_title}"
              </h1>
              <p className="text-sm text-slate-200">
                Each question contains 5 Mark
              </p>
            </div>

            {qna.map((quiz, index) => (
              <div className="space-y-8 " key={index}>
                <div className="quiz">
                  <h4 className="question">Quiz 1 - {quiz.question}?</h4>

                  <form className="quizOptions">
                    {qna && (
                      <QuestionBody options={quiz.options} input={false} />
                    )}
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  );
};

export default QuizzesAnswer;
