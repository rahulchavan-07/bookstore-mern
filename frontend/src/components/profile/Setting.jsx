import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../Loader/Loader";

const Setting = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://bookstore-5ik6.onrender.com/api/get-user-info", { headers });
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    const response = await axios.put("https://bookstore-5ik6.onrender.com/api/update-address", value, { headers });
    alert(response.data.message);
  };

  return (
    <>
      {!profileData && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {profileData && (
        <div className='h-[100%] p-4 md:p-8 text-gray-900 bg-white'>
          <h1 className='text-3xl md:text-4xl font-semibold text-teal-600 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12 mb-6'>
            <div className='flex flex-col'>
              <label className='font-medium text-gray-700'>Username</label>
              <p className='p-2 rounded bg-gray-200 mt-2 font-semibold'>
                {profileData.username}
              </p>
            </div>
            <div className='flex flex-col'>
              <label className='font-medium text-gray-700'>Email</label>
              <p className='p-2 rounded bg-gray-200 mt-2 font-semibold'>
                {profileData.email}
              </p>
            </div>
          </div>

          <div className='mt-6 flex flex-col'>
            <label className='font-medium text-gray-700'>Address</label>
            <textarea
              className='p-3 rounded bg-gray-200 mt-2 font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500'
              rows="5"
              placeholder='Enter your address'
              name="address"
              value={value.address}
              onChange={change}
            />
          </div>

          <div className='mt-6 flex justify-end'>
            <button
              className='bg-teal-500 text-white font-semibold px-6 py-2 rounded hover:bg-teal-400 transition duration-300'
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
