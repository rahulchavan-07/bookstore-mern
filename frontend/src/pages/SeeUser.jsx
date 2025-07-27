import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeeUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">No user data found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Back
      </button>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4">
          User Details
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full border"
          />

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold text-gray-700">Username:</h2>
              <p>{user.username}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Email:</h2>
              <p>{user.email}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Address:</h2>
              <p>{user.address}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Role:</h2>
              <p>{user.role}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Orders Id's:</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((orderId, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-sm px-2 py-1 rounded"
                >
                  {orderId}
                </span>
              ))
            ) : (
              <p>No orders.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeUser;
