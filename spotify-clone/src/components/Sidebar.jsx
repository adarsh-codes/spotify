/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] flex flex-col rounded justify-around'>
        <div onClick={()=>{navigate('/')}} className='flex gap-3 items-center pl-8 cursor-pointer'>
            <img className='w-6' src={assets.home_icon}></img>
            <p className='font-bold'>Home</p>
        </div>
        <div className='flex gap-3 items-center pl-8 cursor-pointer'>
            <img className='w-6' src={assets.search_icon}></img>
            <p onClick={()=>{navigate('/search-song')}} className='font-bold'>Search</p>
        </div>
      </div>
      <div className='h-[85%] bg-[#121212] rounded'>
            <div className='p-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img className='w-8' src={assets.stack_icon}></img>
                    <p className='font-semibold'>Your Library</p>
                </div>
                <div className='flex items-center gap-3'>
                    <img className='w-8' src={assets.arrow_icon}></img>
                    <img className='w-8' src={assets.plus_icon}></img>
                </div>
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start pl-4 gap-1'>
                <h1>Create your first Playlist</h1>
                <p className='font-light'>It's easy we will help you</p>
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create Playlist</button>
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start pl-4 gap-1'>
                <h1>Let's find some Podcasts for you</h1>
                <p className='font-light'>We will keep you updated with new episodes</p>
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse Podcasts</button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
