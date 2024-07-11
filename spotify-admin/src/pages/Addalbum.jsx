/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {assets} from '../assets/assets.js'
import {url} from '../App.jsx'
import { toast } from 'react-toastify';
import axios from 'axios'

const Addalbum = () => {
    const [image,setimage] = useState(false);
    const [color,setcolor] = useState('#ffffff');
    const [name,setname] = useState('');
    const [desc,setdesc] = useState('');
    const [loading,setloading] = useState(false);

    const onsubmithandler = async(e)=>{
        e.preventDefault();
        setloading(true);
        try{
            const formData = new FormData();
            formData.append('image',image);
            formData.append('bgcolour',color);
            formData.append('name',name);
            formData.append('desc',desc);

            const response = await axios.post(`${url}/api/album/add`,formData);
            if(response.data.success){
                toast.success('Album added successfully');
                setname('');
                setdesc('');
                setimage(false);
                setcolor('#ffffff');
               
            }
            else{
                toast.error('Failed to add album');
                
            }
          }
            catch(e){
              toast.error('Failed try');
              
            }
            setloading(false);
          }
  return  loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
   <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>

   </div>
 </div>
 ):  (
    <form onSubmit={onsubmithandler} className='flex flex-col items-start gap-8 text-gray-600'>
       

            <div className='flex flex-col gap-4'> 
            <p>Upload image</p>
            <input onChange={(e)=>{setimage(e.target.files[0])}} type='file' id = 'image' accept='image/*' hidden/>
            <label htmlFor='image'>
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer'/>
            </label>
            </div>
            
        
        <div className='flex flex-col gap-2.5'>
          <p>Album name</p>
          <input onChange={(e)=>{setname(e.target.value)}} value={name} type='text' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(4vw,250px)]' placeholder='Type Here' required/>
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Album Description</p>
          <input onChange={(e)=>{setdesc(e.target.value)}} value={desc} type='text' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(4vw,250px)]' placeholder='Type Here' required/>
        </div>
        <div className='flex flex-col gap-3'>
          <p>Background Color</p>
          <input type='color' onChange={(e)=>{setcolor(e.target.value)}} defaultValue={color} className='cursor-pointer'>
          </input>
        </div>
        <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default Addalbum
