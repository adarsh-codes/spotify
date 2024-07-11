/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import {url} from '../App.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';
const Listsong = () => {

    

    const [data,setdata] = useState([]);

    const removesong = async(id)=>{
      try{  
        const response = await axios.post(`${url}/api/song/remove`,{id});

      if(response.data.success){
        toast.success("song removed successfully");
        await fetchsongs();
      }}
      catch(e){
        toast.error("error removing song");
      }
      
    }

    const fetchsongs = async()=>{
        try{
          const response = await axios.get(`${url}/api/song/list`);
          if(response.data.success){
            setdata(response.data.songs);
          }
        }
        catch(e){
          toast.error("error getting songs");
        }
    }

    useEffect(()=>{
        fetchsongs();
    },[]);


  return (
    <div>
      <p>All Songs List</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b><b>Name</b><b>Album</b><b>Duration</b><b>Action</b>
        </div>
        {
          data.map((item,index)=>{
            return (<div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-10' src={item.image} alt={item.name}/>
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <button onClick={()=>{removesong(item._id)}}>Delete</button>
            </div>)
           })
        }
      </div>

    </div>
  )
}

export default Listsong
