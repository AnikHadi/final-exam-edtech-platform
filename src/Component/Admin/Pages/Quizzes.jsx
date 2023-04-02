import React, { useState } from "react";
import { useGetQuizzesQuery } from "../../../features/quizzes/quizzesAPI";
import Loading from "../../ui/Loading";
import SingleQuizzes from "../Features/SingleQuizzes";
import AddQuizzesInput from "../InputForm/AddQuizzesInput";
import AdminNavbar from "../Share/AdminNavbar";

const AdminQuizzes = () => {
  // <title>Quizzes</title>;
  // all local state
  const [showModal, setShowModal] = useState(false);

  // all redux state
  const { data: quizzes, isError, isLoading } = useGetQuizzesQuery();

  if (isLoading) <Loading />;

  return isError ? (
    <div className="flex justify-center items-center text-3xl ">
      There was an error!
    </div>
  ) : quizzes?.length === 0 ? (
    <div className="flex justify-center items-center text-3xl ">
      There was no quizzes found!
    </div>
  ) : (
    <div>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                className="btn ml-auto"
                onClick={() => setShowModal(!showModal)}
              >
                Add Quiz
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {quizzes?.map((quiz, i) => (
                    <SingleQuizzes quizzes={quiz} key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <AddQuizzesInput showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default AdminQuizzes;
