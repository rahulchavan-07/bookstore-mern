import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({ data , Favourite}) => {

  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.delete("https://bookstore-5ik6.onrender.com/api/delete-book-from-favourite", {
        headers
      });
  
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing book:", error);
      alert("Failed to remove book. Please try again.");
    }
  };
  
  return (
    <div className='bg-white shadow-md rounded-xl p-4 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200'>
        <div className='bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden h-[30vh]'>
            <img src={data.url} alt="/" className='h-full object-cover rounded-lg' />
        </div>
        <h2 className='mt-4 text-lg text-gray-900 font-bold truncate'>{data.title}</h2>
        <p className='mt-1 text-gray-600 text-sm font-medium'>by {data.author}</p>
        <p className='mt-2 text-green-600 font-semibold text-lg'>₹ {data.price}</p>
                            

        
        <Link to={`/view-book-details/${data._id}`}>
          <button className='mt-3 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all w-full'>
            View Details
          </button>
        </Link>
        {Favourite && (
          <button 
            className='bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-all'
            onClick={handleRemoveBook}
          >
            Remove from Favourite
          </button>
        )}


    </div>
  )
}

export default BookCard;
