import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from "../BookCard/BookCard";

const Favourites = () => {

  const [FavouriteBooks, setFavouriteBooks] = useState([]); // Initialize as an empty array

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookstore-5ik6.onrender.com/api/get-favourite-books", { headers });
        setFavouriteBooks(response.data.data || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    
    fetch();
  }, []); // Empty dependency array to avoid infinite re-renders

  return (
    <div className='p-4'>
      <h1 className="text-2xl md:text-4xl font-semibold text-teal-600 mb-6">Favourite Books</h1>
      
      {FavouriteBooks.length === 0 ? (
        <p>No Favourite Books</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} Favourite={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
