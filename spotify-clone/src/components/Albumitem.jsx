/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Albumitem = ({image,name,desc,id}) => {
   const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/album/${id}`)}} className='hover:bg-[#ffffff26] min-w-[180px] p-2 px-3 rounded cursor-pointer'>
      <img className='rounded' src={image} alt=""></img>
      <p className= 'font-bold mt-2 mb-l'>{name}</p>
      <p className= 'text-sm text-slate-200'>{desc}</p>
    </div>
  )
}

export default Albumitem