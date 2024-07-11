/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { assets } from '../assets/assets'

const DisplayAlbum = ({album}) => {
  const {albumsData, songsData} = useContext(PlayerContext);
  const {id} = useParams();
  const [albumdata,setalbumdata] = useState("");
  const {playwithid} = useContext(PlayerContext);

  useEffect(()=>{
    albumsData.map((item)=>{
      if(item._id === id){
        setalbumdata(item);
      }
    })
  },[])

  return albumdata ? (
    <>
      <Navbar/>
      <div className='flex gap-8 mt-10 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumdata.image}></img>
        <div className='flex flex-col'>
          <p>Playlist</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumdata.name}</h2>
          <h4>{albumdata.desc}</h4>
          <p className='mt-1'>
            <img className='inline-block w-5' src={assets.spotify_logo}></img>
            <b>Spotify</b>
            &bull; 1,323,513 likes
            &bull; <b>50 songs, </b>
            About 2 hr 30 mins
          </p>
        </div>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4 ' src={assets.clock_icon}></img>
      </div>
      <hr/>
      {
        songsData.filter((item)=> item.album === album.name).map((item,index)=>(
          <div onClick={()=>{playwithid(item._id)}} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
            <p className='text-white'>
            <b className='text-[#a7a7a7] mr-4'>{index+1}</b> 
            <img className='inline w-10 mr-5' src={item.image}></img>
            {item.name}
            </p>
            <p className='text-[15px]'>{albumdata.name}</p>
            <p className='text-[15px] hidden sm:block'>5 days ago</p>
            <p className='text-[15px] text-center'>{item.duration}</p>
          </div>  
        ))
      }
    </>
  ) : null
}

export default DisplayAlbum
