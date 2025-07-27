import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoReorderThree } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Navbar = () => {

  const links=[
    {
      title:"Home",
      link:"/",
    },
    {
      title:"All Books",
      link:"/all-books",
    },
   
    {
      title:"Cart",
      link:"/cart",
    },
    {
      title:"Profile",
      link:"/profile",
    },
    {
      title:"Admin Profile",
      link:"/profile",
    },
  ];

 const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn);
 const role = useSelector((state)=>state.auth.role);
if(isLoggedIn===false) {

  links.splice(2,3);
}
if(isLoggedIn==true && role==="user") {
  links.splice(4,1);
}
if(isLoggedIn==true && role==="admin") {
  links.splice(2,2);
}
  const [MobileNav,setMobileNav]=useState("hidden")

  return (
    <>
    
    <nav className='z-50 relative bg-slate-700  text-white px-8 py-4 flex items-center justify-between'>
      
        <Link to="/" className='flex items-center'>
          <img className='h-12 me-4' 
               src="https://cdn-icons-png.flaticon.com/512/5606/5606108.png"
               alt="logo" />
          <h1 className='text-2xl font-semibold'>BookVault</h1>
        </Link>
        <div className='nav-links-bookheaven block md:flex items-center gap-8'>
          <div className='hidden md:flex gap-8'>
            {links.map((items,i)=>(
            <div className='flex items-center'>
              {items.title ==="profile" || items.title==="Admin profile"? <Link 
              to={items.link}
              className='hover:text-blue-500 transition-all duration-300 cursor-pointer' key={i}>
              {items.title}{" "}
            </Link>:<Link 
            to={items.link}
            className='hover:text-blue-500 transition-all duration-300 cursor-pointer' key={i}>
            {items.title}
          </Link>}
            </div>
           ))}
          </div>
          {isLoggedIn===false && (
            <>
              <div className='hidden md:flex gap-8'>
            <Link 
              to="/LogIn"
              className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
              Login
            </Link>
            <Link 
               to="/SignUp"  
               className='px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
               SignUp
            </Link>
          </div>
            </>
          ) }
          <button className='text-white text-4xl block md:hidden hover:bg-zinc-300' onClick={()=>{MobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}}>
            <IoReorderThree />
          </button>
        </div>

    </nav>


     <div className={`${MobileNav} bg-black h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
      {links.map((items,i)=>(
              <Link 
                to={items.link}
                className={`${MobileNav} text-white text-2xl font-semibold mb-4 hover:text-blue-500 transition-all duration-300 cursor-pointer`} key={i} onClick={()=>{MobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}}>
                {items.title}
              </Link>
           ))}
          {isLoggedIn===false && (
            <>
              <Link 
              to="/LogIn"
              className={`${MobileNav} px-4 mb-8 py-1 border border-blue-500 rounded bg-white text-black hover:bg-blue-500 transition-all duration-300`} onClick={()=>{MobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}}>
              Login
            </Link>
            <Link 
               to="/SignUp"
               className={`${MobileNav} px-3 py-2 mb-8 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`} onClick={()=>{MobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}}>
               SignUp
            </Link>
            </>
          )}
    </div> 
    </>
  )
}

export default Navbar
