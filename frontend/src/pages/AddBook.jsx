import React, { useState } from 'react'
import axios from "axios";
const AddBook = () => {

    const [Data,setData] = useState({
        url:"",
        title:"",
        author:"",
        price:"",
        desc:"",
        language:"",
    });
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      

    const change = (e)=>{
        const {name,value}=e.target;
        setData({...Data,[name]:value})
    };
    const submit=async()=>{

        try {
            if(
                Data.url==""||
                Data.title===""||
                Data.author===""||
                Data.price===""||
                Data.desc===""||
                Data.language===""
            ) {
                alert("All fields are required");
            }else {
                const response=await axios.post(
                    "https://bookstore-5ik6.onrender.com/api/add-book",
                    Data,
                    {headers}
                );
                setData({
                    url:"",
                    title:"",
                    author:"",
                    price:"",
                    desc:"",
                    language:"",
                });
                alert(response.data.message);
            }

        } catch(error) {
            alert(error.rensponse.data.message);
        }
    }
  return (
<div className='h-full p-4'>
  <h1 className='text-3xl md:text-5xl font-semibold text-gray-800 mb-8'>
    Add Book
  </h1>
  <div className='p-6 bg-white rounded-2xl shadow-md'>
    <div>
      <label htmlFor="" className='text-gray-600 font-medium'>
        Image
      </label>
      <input 
        type="text"
        className='w-full mt-2 bg-gray-50 text-gray-800 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
        placeholder='URL of image'
        name="url" 
        required
        value={Data.url}
        onChange={change}
      />
    </div>

    <div className='mt-4'>
      <label htmlFor="" className='text-gray-600 font-medium'>
        Title
      </label>
      <input 
        type="text"
        className='w-full mt-2 bg-gray-50 text-gray-800 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
        placeholder='Title of book'
        name="title"
        required
        value={Data.title}
        onChange={change}
      />
    </div>

    <div className='mt-4'>
      <label htmlFor="" className='text-gray-600 font-medium'>
        Author
      </label>
      <input 
        type="text"
        className='w-full mt-2 bg-gray-50 text-gray-800 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
        placeholder='Author of book'
        name="author"
        required
        value={Data.author}
        onChange={change}
      />
    </div>

    <div className='mt-4 flex gap-4'>
      <div className='w-3/6'>
        <label htmlFor="" className='text-gray-600 font-medium'>
          Language
        </label>
        <input
          type="text"
          className='w-full mt-2 bg-gray-50 text-gray-800 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500' 
          placeholder='Language of book'
          name="language"
          required
          value={Data.language}
          onChange={change}
        />
      </div>
      <div className='w-3/6'>
        <label htmlFor="" className='text-gray-600 font-medium'> 
          Price
        </label>
        <input
          type="number" 
          className='w-full mt-2 bg-gray-50 text-gray-800 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
          placeholder="Price of book"
          name="price"
          required
          value={Data.price}
          onChange={change}
        />          
      </div>
    </div>

    <div className='mt-4'> 
      <label htmlFor="" className='text-gray-600 font-medium'>
        Description of book
      </label>
      <textarea
        className='w-full mt-2 bg-gray-50 text-gray-800 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500'
        rows="5"
        placeholder='Description of book'
        name="desc" 
        required
        value={Data.desc}
        onChange={change}
      />
    </div>

    <button
      className='mt-6 px-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all shadow-md'
      onClick={submit}
    >
      Add Book
    </button>
  </div>
</div>

  )
}

export default AddBook;
