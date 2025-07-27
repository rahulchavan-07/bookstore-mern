import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {

  const [Data,setData]=useState();

  useEffect(()=>{   
      const fetch = async()=> {
        const response = await axios.get("https://bookstore-5ik6.onrender.com/api/get-recent-book");
        setData(response.data.data)
      };
      fetch();
  },[]);

  return (
    <div className='pl-12 mt-8 px-4'>
      <h1 className='text-3xl text-black font-semibold'>Top Sellers Books</h1>
      {!Data && 
        <div className='flex items-center justify-center my-8'>
            <Loader/>{" "}
        </div>
      }
      <div className='text-black my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10'>

          {Data &&
             Data.map((items,i)=>(
              <div key={i}>
                <BookCard data={items}/>{" "}
              </div>
          ))}
      </div>
    </div>
  )
}

export default RecentlyAdded;
