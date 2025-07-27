import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const ViewBookDetails = () => {
    const { id } = useParams();

    const navigate=useNavigate();
    const [data, setData] = useState();

    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    const role=useSelector((state)=>state.auth.role)

    useEffect(() => {   
        const fetch = async () => {
            const response = await axios.get(`https://bookstore-5ik6.onrender.com/api/get-book-by-id/${id}`); 
            setData(response.data.data);
        };
        fetch();
    }, []); 

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Fixed missing backticks
        bookid:id,
      };

    const handleFavourite = async ()=>{

        const response = await axios.put("https://bookstore-5ik6.onrender.com/api/add-book-to-favourite",{},{headers});

       alert(response.data.message);
    }

    const handleCart= async ()=>{

        const response=await axios.put("https://bookstore-5ik6.onrender.com/api/add-to-cart",{},{headers});

        alert(response.data.message);
    }
    const deletebook =async()=> {
       const response= await axios.delete("https://bookstore-5ik6.onrender.com/api/delete-book",{headers});
      alert(response.data.message);
      navigate("/all-books");
    }

    return (
        <>
            {data ? (
                <div className="min-h-screen flex flex-col md:flex-row items-center md:items-start gap-10 px-6 md:px-16 py-12 bg-gradient-to-b from-gray-50 to-gray-200">
                    
                    {/* Book Image Container */}
                    <div className="relative bg-gray-200 shadow-lg rounded-lg p-5 w-full md:w-[40%] flex flex-col items-center h-[65vh]">
                        <img src={data.url} alt="Book" className="h-full max-h-[500px] object-contain rounded-lg"/>
                            {isLoggedIn && (
                                <div className="absolute flex gap-4 w-full md:w-auto 
                                    bottom-4 md:top-4 md:right-4 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 
                                    justify-center md:flex-col">
                                    {role === "user" && (
                                        <>
                                            <button className="bg-white rounded-full text-xl p-3 shadow-md hover:bg-gray-100 transition" onClick={handleFavourite}>
                                                <FaHeart className="text-red-500" />
                                            </button>
                                            <button className="bg-white rounded-full text-xl p-3 shadow-md hover:bg-gray-100 transition" onClick={handleCart}>
                                                <FaShoppingCart className="text-blue-500" />
                                            </button>
                                        </>
                                    )}
                                    {role === "admin" && (
                                        <>
                                            <Link to={`/updateBook/${id}`} className="bg-white rounded-full text-xl p-3 shadow-md hover:bg-gray-100 transition">
                                                <FaEdit className="text-yellow-500" />
                                            </Link>
                                            <button className="bg-white rounded-full text-xl p-3 shadow-md hover:bg-gray-100 transition"
                                            onClick={deletebook}>
                                                <MdDelete className="text-red-500" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}


                    </div>
            


                    {/* Book Details */}
                    <div className="w-full md:w-[55%] flex flex-col justify-start text-gray-900">
                        <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
                        <p className="text-red-500 mt-4 text-lg md:text-xl font-medium">by {data.author}</p>

                        <p className="text-gray-700 mt-6 text-lg leading-relaxed max-w-2xl">
                            {data.desc}
                        </p>

                        <p className="flex items-center mt-6 text-gray-700 text-lg font-medium">
                            <GrLanguage className="mr-2 text-2xl" /> {data.language}
                        </p>

                        <p className="mt-6 text-green-600 text-3xl font-semibold">
                            Price: ₹ {data.price}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="h-screen flex items-center justify-center bg-gray-100">
                    <Loader />
                </div>
            )}
        </>
    );
};

export default ViewBookDetails;
