import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://bookstore-5ik6.onrender.com/api/get-order-history", { headers });

     setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setOrderHistory([]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Order History</h2>
      {!orderHistory && <div className="flex items-center justify-center h-[100%]"> <Loader/></div>}
      {orderHistory && orderHistory.length===0 && (
        <div className="h-[80vh] p-4 text-zinc-100"> 

            <div className="h-[100%] flex flex-col items-center justify-center">
              <h1 className="texr-5xl font-semibold text-zinc-500 mb-8">
                No order History
              </h1> 
            </div>
        </div>
      )}
      {orderHistory && orderHistory.length >0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              Your Order History
          </h1>
          <div className="mt-4 bg-green-200 w-full rounded py-2 px-4 flex gap-2 text-black">
            <div className="w-[3%]">
                <h1 className="text-center">sr.</h1>
            </div>
            <div className="w-[22%]">
                <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
                <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
                <h1 className="">price</h1>
            </div>
            <div className="w-[16%]">
                <h1 className="">status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="">Mode</h1>
            </div>
          </div>
          {orderHistory.map((items,i)=>{

                return (
                  <div className="bg-[#ECF2FF] w-full rounded py-2 px-4 flex gap-4 hover:bg-[#E0E7FF] hover:cursor-pointer shadow-md">
  <div className="w-[3%]">
    <h1 className="text-center text-[#374151]">{i + 1}</h1>
  </div>
  <div className="w-[22%]">
    <Link to={`/view-book-details/${items.book._id}`} className="text-[#2563EB] hover:text-[#3B82F6]">
      {items.book.title}
    </Link>
  </div>
  <div className="w-[45%]">
    <h1 className="text-[#374151]">{items.book.desc.slice(0, 50)} ...</h1>
  </div>
  <div className="w-[9%]">
    <h1 className="text-[#374151] font-semibold">Rs. {items.book.price}</h1>
  </div>
  <div className="w-[16%]">
    <h1 className="font-semibold">
      {items.status === "order placed" ? (
        <div className="text-[#FACC15]">{items.status}</div>
      ) : items.status === "cancelled" ? (
        <div className="text-[#EF4444]">{items.status}</div>
      ) : (
        <div className="text-[#10B981]">{items.status}</div>
      )}
    </h1>
  </div>
  <div className="w-none md:w-[5%] hidden md:block">
    <h1 className="text-sm text-[#6B7280]">COD</h1>
  </div>
</div>

                )
  
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
