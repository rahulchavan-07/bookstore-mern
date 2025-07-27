import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from 'react-icons/fa6'; 
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from "../../store/auth";
function Sidebar({ data }) {

  const dispatch=useDispatch();
  const history=useNavigate();
  const role=useSelector((state)=>state.auth.role)
  return (
    <div className="bg-white shadow-md p-5 rounded-lg flex flex-col items-center min-h-[40vh]">
      <div className="flex items-center flex-col justify-center"> 
        <img src={data?.avatar} className="h-[9vh] rounded-full shadow-md" alt="User Avatar" /> 
        <p className="mt-3 text-lg text-teal-800 font-semibold"> 
            {data?.username} 
        </p>
        <p className="mt-1 text-sm text-teal-600">{data?.email}</p> 
        <div className="w-full mt-4 h-[1px] bg-teal-300 hidden lg:block"></div>
      </div>

      {role==="user" && (
        <div className="w-full flex flex-col items-center mt-3 space-y-2">
        <Link
          to="/profile"
          className="text-teal-800 font-medium w-full py-2 text-center hover:bg-teal-100 rounded transition-all"
        >
          Favourite
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-teal-800 font-medium w-full py-2 text-center hover:bg-teal-100 rounded transition-all"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-teal-800 font-medium w-full py-2 text-center hover:bg-teal-100 rounded transition-all"
        >
          Settings
        </Link>
      </div>
      )}
      {role=="admin" && (
        <div className="w-full flex flex-col items-center mt-3 space-y-2">
        <Link
          to="/profile"
          className="text-teal-800 font-medium w-full py-2 text-center hover:bg-teal-100 rounded transition-all"
        >
         All Order
        </Link>
        <Link
          to="/profile/add-book"
          className="text-teal-800 font-medium w-full py-2 text-center hover:bg-teal-100 rounded transition-all"
        >
          Add Book
        </Link>
      </div>
      )}
      <button className="bg-teal-600 w-3/6 lg:w-full mt-4 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-teal-700 transition-all duration-300"
        onClick={()=>{
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Log Out <FaArrowRightFromBracket className="ms-3"/>
      </button>
    </div>
  );
}

export default Sidebar;
