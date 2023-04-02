import React, { useState } from "react";
import { useGetAssignmentsQuery } from "../../../features/assignment/assignmentAPI";
import Loading from "../../ui/Loading";
import SingleAssignment from "../Features/SingleAssignment";
import AddAssignmentInput from "../InputForm/AddAssignmentInput";
import AdminNavbar from "../Share/AdminNavbar";

const AdminAssignment = () => {
  // <title>Add Assignment</title>
  const [showModal, setShowModal] = useState(false);

  // all redux state
  const { data: assignments, isError, isLoading } = useGetAssignmentsQuery();

  if (isLoading) <Loading />;

  return isError ? (
    <div className="flex justify-center items-center text-3xl ">
      There was an error!
    </div>
  ) : assignments?.length === 0 ? (
    <div className="flex justify-center items-center text-3xl ">
      There was no assignment found!
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
                onClick={(e) => setShowModal(!showModal)}
              >
                Add Assignment
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {assignments?.map((asig) => (
                    <SingleAssignment assignment={asig} key={asig.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <AddAssignmentInput showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default AdminAssignment;
