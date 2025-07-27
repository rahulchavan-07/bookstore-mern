import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

const AllBooks = () => {

  const [Data,setData]=useState();

  useEffect(()=>{   
      const fetch = async()=> {
        const response = await axios.get("https://bookstore-5ik6.onrender.com/api/get-all-books");
       setData(response.data.data);
      };
      fetch();
  },[]);


  return (
    <div className='h-auto px-12 py-8'>
        <h1 className='text-3xl text-black font-semibold'>All Top Sellers Book</h1>
      {!Data && 
        <div className='flex items-center justify-center my-8'>
            <Loader/>{" "}
        </div>
      }
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>

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

export default AllBooks
