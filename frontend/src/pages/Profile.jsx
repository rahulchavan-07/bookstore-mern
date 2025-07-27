import React, { useEffect, useState } from 'react';
import Sidebar from '../components/profile/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";
import Loader from '../components/Loader/Loader';
// import mobileNav from '../components/profile/mobileNav';
const Profile = () => {
  const [profile, setProfile] = useState();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookstore-5ik6.onrender.com/api/get-user-info", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className='bg-white md:px-12 flex flex-col md:flex-row min-h-screen py-8 gap-4 text-gray-900'>
      {!profile && (
        <div className='w-full flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {profile && (
        <>
          {/* Sidebar - Takes full width on small screens and 1/5 width on large screens */}
          <div className='w-full md:w-1/4 lg:w-1/5 flex flex-col'>
            <Sidebar data={profile} />
            {/* <mobileNav/> */}
          </div>

          {/* Content Section - Takes full width on small screens and 4/5 width on large screens */}
          <div className='w-full md:w-3/4 lg:w-4/5 flex flex-col bg-gray-100 p-6 rounded-lg shadow-md'>
            <Outlet />
          </div>
        </>
      )}
</div>

  );
  
};

export default Profile;
