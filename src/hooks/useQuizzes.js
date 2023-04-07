import { useEffect, useState } from "react";
import { useGetQuizByVideoIdQuery } from "../features/quizzes/quizzesAPI";

const useQuizzes = (videoId) => {
  const [question, setQuestion] = useState([]);

  // redux
  const { data, isLoading, isError, isSuccess } =
    useGetQuizByVideoIdQuery(videoId);

  useEffect(() => {
    setQuestion((prev) => prev.concat(data));
  }, [videoId, data]);

  return {
    isLoading,
    isError,
    question,
    isSuccess,
  };
};

export default useQuizzes;
