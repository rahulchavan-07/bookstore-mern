import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("https://bookstore-5ik6.onrender.com/api/get-user-cart", { headers });
        setCart(res.data.data || []);

        // Calculate total price correctly
        let totalAmount = res.data.data.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart([]);
      }
    };
    fetch();
  }, []);

  const PlaceOrder = async () => {
    if (Cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
      const orderData = Cart.map((item) => ({ _id: item._id }));


        const response = await axios.post(
            "https://bookstore-5ik6.onrender.com/api/place-order",
            { order: orderData },
            { headers }
        );

        console.log("Order Response:", response.data); 
        alert(response.data.message);
        navigate("/profile/orderHistory");
    } catch (error) {
        console.error("Error placing order:", error.response?.data || error);
        alert("Failed to place order. Check console for details.");
    }
};


  return (
    <div className='bg-[#F3F4F6] px-6 md:px-12 h-screen py-8 text-[#1F2937] overflow-y-auto'>
      {Cart.length === 0 ? (
        <div className='h-screen flex flex-col items-center justify-center'>
          <h1 className='text-4xl md:text-6xl font-semibold text-[#6B7280]'>Empty Cart</h1>
          <img src='/empty-cart.png' alt='empty cart' className='h-40 md:h-64 mt-6' />
        </div>
      ) : (
        <>
          <h1 className='text-4xl font-semibold text-[#374151] mb-8'>Your Cart</h1>
          <div className='max-h-[80vh] overflow-y-auto'>
            {Cart.map((item) => (
              <div key={item._id} className='w-full my-4 rounded-lg flex flex-col md:flex-row p-4 bg-[#E5E7EB] hover:bg-[#D1D5DB] transition duration-300 ease-in-out justify-between items-center shadow-md'>
                <img src={item.url} alt='/' className='h-32 md:h-40 object-cover rounded-lg' />
                <div className='w-full md:w-auto text-center md:text-left px-4'>
                  <h1 className='text-xl md:text-2xl font-semibold'>{item.title}</h1>
                  <p className='text-sm md:text-base text-[#4B5563] mt-2 hidden lg:block'>{item.desc.slice(0, 100)}...</p>
                  <p className='text-sm md:text-base text-[#4B5563] mt-2 lg:hidden md:block'>{item.desc.slice(0, 65)}...</p>
                </div>
                <div className='flex flex-col md:flex-row mt-4 md:mt-0 w-full md:w-auto items-center justify-between space-y-2 md:space-y-0 md:space-x-6'>
                  <h2 className='text-xl md:text-3xl font-semibold text-[#10B981]'>Rs{item.price}</h2>
                  <button className='bg-[#EF4444] text-white rounded-lg p-2 hover:bg-[#DC2626] transition duration-300 ease-in-out' onClick={() => deleteItem(item._id)}>
                    <AiFillDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-4 w-full flex items-center justify-end'>
            <div className='p-4 bg-zinc-800 rounded'>
              <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
              <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                <h2>{Cart.length} books</h2>
                <h2>Rs {Total}</h2>
              </div>
              <div className='w-[100%] mt-3'>
                <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200' onClick={PlaceOrder}>
                  Place Your Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
