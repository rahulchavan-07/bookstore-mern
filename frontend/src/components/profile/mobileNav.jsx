import React from 'react'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
const mobileNav = () => {

  const role=useSelector((state)=>state.auth.role)
  return (
    <>  
        {role==="user" && (

            <div className='w-full flex items-center justify-between my-8'>
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
    
    </>
  )
}

export default mobileNav
