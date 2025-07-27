import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import Chatbot from '../components/Home/chatBot'

const Home = () => {
  return (
    <div className='bg-white text-white px-10 py-8'>
      <Hero/>
      <RecentlyAdded/>
      <Chatbot/>
    </div>
  )
}

export default Home
