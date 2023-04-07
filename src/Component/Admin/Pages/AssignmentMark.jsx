import React from "react";
import { useGetAssignmentsMarkQuery } from "../../../features/assignmentMark/assignmentMarkAPI";
import Loading from "../../ui/Loading";
import SingleAssignmentMark from "../Features/SingleAssignmentMark";
import AdminNavbar from "../Share/AdminNavbar";

const AdminAssignmentMark = () => {
  //  <title>Assignment Mark</title>

  // all redux state
  const {
    data: assignmentMark,
    isLoading,
    isError,
  } = useGetAssignmentsMarkQuery();

  // utils
  const total = assignmentMark?.length;
  const pending = assignmentMark?.filter(
    (ass) => ass.status === "pending"
  )?.length;
  const sent = assignmentMark?.filter(
    (ass) => ass.status === "published"
  )?.length;

  if (isLoading) <Loading />;

  return isError ? (
    <div className="flex justify-center items-center text-3xl ">
      There was an error!
    </div>
  ) : assignmentMark?.length === 0 ? (
    <div className="flex justify-center items-center text-3xl ">
      There was no quizzes found!
    </div>
  ) : (
    <div>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{total}</span>
              </li>
              <li>
                Pending <span>{pending}</span>
              </li>
              <li>
                Mark Sent <span>{sent}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Total Mark</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {assignmentMark?.map((assignment) => (
                    <SingleAssignmentMark
                      assignmentMark={assignment}
                      key={assignment.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminAssignmentMark;
