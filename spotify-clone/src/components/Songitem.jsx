/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Songitem = ({image,name,desc,id}) => {
  const {playwithid} = useContext(PlayerContext)
  return (
    <div onClick={()=>{playwithid(id)}} className='hover:bg-[#ffffff26] min-w-[180px] p-2 px-3 rounded cursor-pointer'>
      <img className='rounded' src={image} alt=""></img>
      <p className= 'font-bold mt-2 mb-l'>{name}</p>
      <p className= 'text-sm text-slate-200'>{desc}</p>
    </div>
  )
}

export default Songitem