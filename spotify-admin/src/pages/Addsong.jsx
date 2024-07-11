/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import {url} from '../App.jsx'
import { toast } from 'react-toastify'

const Addsong = () => {

  const [name,setname] = useState("");
  const[desc,setdesc] = useState("");
  const [image,setimage] = useState(false);
  const [song,setsong] = useState(false);
  const [album,setalbum] = useState("none");
  const [loading,setloading] = useState(false);
  const [albumdata,setalbumdata] = useState([]);

  const onsubmithandler = async(e)=>{
      e.preventDefault();
      setloading(true);
      try{
        const formData = new FormData();
        formData.append('name',name);
        formData.append('desc',desc);
        formData.append('image',image);
        formData.append('audio',song);
        formData.append('album',album);

        const response = await axios.post(`${url}/api/song/add`,formData);
        
        if(response.data.success){
          toast.success("song added successfully");
          setname("");
          setdesc("");
          setalbum("none");
          setsong(false);
          setimage(false);
        }
        else{
          toast.error("Failed to add song");
        }
      }
      catch(e){
        toast.error("something went wrong");
        console.log(e);
      }
      setloading(false);
  }

  const loadalbumdata = async()=>{
      try{
        const response = await axios.get(`${url}/api/album/list`);
        if(response.data.success){
            setalbumdata(response.data.albums);
        }
        else{
            toast.error("Failed to load albums");
        }
      }
      catch(e){
        toast.error("something went wrong");
      }
  }

      useEffect(()=>{
        loadalbumdata();
      }, []); //

  return loading ? (
     <div className='grid place-items-center min-h-[80vh]'>
    <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>

    </div>
  </div>
  ): (
    <form onSubmit={onsubmithandler} className='flex flex-col items-start gap-8 text-gray-600'>
        <div className='flex gap-8'>
            <div className='flex flex-col gap-4'>
                <p>Upload Song</p>
                <input onChange={(e)=>{setsong(e.target.files[0])}} type='file' id = 'song' accept='audio/*' hidden/>
                <label htmlFor='song'>
                    <img src={song? assets.upload_added: assets.upload_song} className='w-24 cursor-pointer'/>
                </label>
            </div>
            <div className='flex flex-col gap-4'> 
            <p>Upload image</p>
            <input onChange={(e)=>{setimage(e.target.files[0])}} type='file' id = 'image' accept='image/*' hidden/>
            <label htmlFor='image'>
                <img src={image ? URL.createObjectURL(image) :assets.upload_area} className='w-24 cursor-pointer'/>
            </label>
            </div>
            
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Song name</p>
          <input onChange={(e)=>{setname(e.target.value)}} value={name} type='text' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(4vw,250px)]' placeholder='Type Here' required/>
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Song Description</p>
          <input onChange={(e)=>{setdesc(e.target.value)}} value={desc} type='text' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(4vw,250px)]' placeholder='Type Here' required/>
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Album</p>
          <select onChange={(e)=>{setalbum(e.target.value)}} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(4vw,250px)]'>
          <option value="none">None</option>
          {albumdata.map((item,index)=>(
              <option key={index} value={item.name}>{item.name}</option>
          ))}
          </select>
        </div>
        <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default Addsong
