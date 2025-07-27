import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-12">
      
      {/* Left Section - Text */}
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center gap-6">
        <h1 className="text-4xl lg:text-6xl font-semibold text-black text-center lg:text-left">
          For All Your Reading Needs
        </h1>
        <p className="text-xl text-gray-600 text-center lg:text-left">
          Find your next adventure, deepen your knowledge, and fuel your inspiration with every book
        </p>
        <div className='mb-6 mt-6'>
          <Link to="/all-books" className="text-white bg-green-700 text-xl lg:text-2xl font-semibold border border-black px-10 py-2 rounded-full hover:bg-gray-50 hover:text-black transition">
            Explore Books
          </Link>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-3/6 flex justify-center items-center">
        <img
          src="./hero.png"
          alt="hero"
          className="max-w-[80%] lg:max-w-[60%] h-auto object-contain"
        />
      </div>

    </div>
  );
};

export default Hero;
