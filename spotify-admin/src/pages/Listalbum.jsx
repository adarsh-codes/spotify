/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import {url} from '../App.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';

const Listalbum = () => {
    const [data,setdata] = useState([]);

    const removealbum = async (id) => {
      try{
        const response = await axios.post(`${url}/api/album/remove`,{id});
        
        if(response.data.success){
          toast.success("album removed successfully");
          fetchalbums();
        }
      }
      catch(err){
        toast.error("error removing album");
      }
    }
    const fetchalbums = async ()=>{
      try{
        const response = await axios.get(`${url}/api/album/list`);
        
        if(response.data.success){
          setdata(response.data.albums);
        }
      }
      catch(err){
        toast.error("error fetching albums");
      }
    }

    useEffect(()=>{
      fetchalbums();
    },[]);


  return (
    <div>
      <p> All Albums List </p>
      <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
      <b>Image</b><b>Name</b><b>Description</b><b>Album Colour</b><b>Action</b>
      </div>
      {
          data.map((item,index)=>{
            return (<div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image}/>
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type='color' value={item.bgcolour}></input>
              <button onClick={()=>{removealbum(item._id)}}>Delete</button>
            </div>)
           })
        }

    </div>
  )
}

export default Listalbum
