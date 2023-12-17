import React from 'react'
import Header from '../components/common/Header.jsx'
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-1 flex flex-row '>
         <div className='w-3/6 flex flex-col items-center justify-center px-8'>
          <h2 className='text-4xl font-bold mb-2'>Welcome to Scrum Flow</h2>
          <h3 className='text-2xl font-bold mb-2 text-olive-green'>Your Agile Project Companion</h3>
          <p className='mx-4 my-8 text-center'>
          Unlock the power of unparalleled project management with Scrum Flow. Designed for teams that thrive on efficiency, Scrum Flow is your go-to solution for embracing the Agile methodology.
          </p>
          <Link to="/users/">
            <button className='border-2 border-olive-green text-olive-green rounded-2xl hover:bg-olive-green hover:text-light-gray font-bold p-2 px-4'>Get Started Today !</button>
          </Link>
         </div>
         <div className='w-3/6 bg-olive-green'></div>
      </div>
    </div>
  )
}

export default Home