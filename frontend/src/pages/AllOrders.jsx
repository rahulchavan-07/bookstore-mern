import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader/Loader";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const AllOrders = () => {

  const navigate = useNavigate();
  const [AllOrders, setAllOrders] = useState();
  const [statusUpdates, setStatusUpdates] = useState({});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookstore-5ik6.onrender.com/api/get-all-order", { headers });
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetch();
  }, []);

  return (
    <>
      {!AllOrders && (
        <div className='h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {AllOrders && AllOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-gray-900 bg-white">
          <h1 className="text-3xl md:text-5xl font-semibold text-teal-600 mb-8">
            All Orders
          </h1>

          <div className="mt-4 bg-white w-full rounded py-2 px-4 flex gap-2 shadow-lg">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[40%] md:w-[22%]">Books</div>
            <div className="w-0 md:w-[45%] hidden md:block">Description</div>
            <div className="w-[17%] md:w-[9%]">Price</div>
            <div className="w-[30%] md:w-[16%]">Status</div>
            <div className="w-[10%] md:w-[5%]"><FaUserLarge /></div>
          </div>

          {AllOrders.map((items, i) => {
            const book = items.book;
            const statusToShow = statusUpdates[items._id] || items.status;

            return (
              <div
                key={i}
                className="bg-white w-full rounded py-2 px-4 flex gap-2 hover:bg-gray-100 hover:cursor-pointer transition-all duration-300 shadow-sm"
              >
                <div className="w-[3%] text-center">{i + 1}</div>

                <div className="w-[40%] md:w-[22%]">
                  {book ? (
                    <Link to={`/view-book-details/${book._id}`} className="hover:text-teal-500">
                      {book.title}
                    </Link>
                  ) : (
                    <h1 className="text-red-500">Book Deleted</h1>
                  )}
                </div>

                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1>{book?.desc?.slice(0, 50) || "No description"} ...</h1>
                </div>

                <div className="w-[17%] md:w-[9%]">
                  <h1>₹ {book?.price ?? "N/A"}</h1>
                </div>

                <div className="w-[30%] md:w-[16%] font-semibold">
                  <div
                    className={
                      statusToShow === "Order placed"
                        ? "text-yellow-500"
                        : statusToShow === "Canceled"
                          ? "text-red-600"
                          : "text-green-500"
                    }
                  >
                    {statusToShow}
                  </div>

                  <div className="flex items-center mt-1">
                    <select
                      name="status"
                      className="bg-gray-100 text-gray-800 border border-gray-300"
                      value={statusToShow}
                      onChange={(e) =>
                        setStatusUpdates((prev) => ({
                          ...prev,
                          [items._id]: e.target.value,
                        }))
                      }
                    >
                      {["Order placed", "Out for delivery", "Delivered", "Canceled"].map((status, idx) => (
                        <option value={status} key={idx}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button className="text-green-400 hover:text-pink-600 mx-2">
                      <FaCheck />
                    </button>
                  </div>
                </div>

                <div className="w-[10%] md:w-[5%]">
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      navigate("/see-user", { state: { user: items.user } });
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AllOrders;
