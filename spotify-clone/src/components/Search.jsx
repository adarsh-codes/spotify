/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Player from "./Player.jsx";
import Navbar from "./Navbar.jsx";
import axios from "axios";
import Songitem from "./Songitem.jsx";


const Search = () => {
        const [searchTerm, setsearchTerm] = useState("");
        const [songlist, setsonglist] = useState([]);
        const [filteredsongs,setfilteredsongs] = useState([]);

        const url = 'http://localhost:4000';

        useEffect( ()=>{
            try{
                const fetchlist = async () => {
                    const response = await axios.get(`${url}/api/song/list`);
                    if(response.data.success){
                        setsonglist(response.data.songs);
                        console.log(songlist);

                    }
                }
             fetchlist();

            }
            catch(e){
                console.error(e);
            }
        },[]);


        useEffect(()=>{
            setfilteredsongs(songlist.filter((song) => song.name.toLowerCase().includes(searchTerm.toLowerCase())));
        },[searchTerm,songlist]);

        

  return (
    <>
      <div className="flex ml-[200px] justify-center items-center p-4">
        <input onChange={(e)=>{e.preventDefault(); setsearchTerm(e.target.value)}} value={searchTerm}
          type="text"
          placeholder="Search for songs, artists, albums..."
          className="w-full text-black max-w-lg px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits</h1>
      <div className="flex overflow-auto">
        {filteredsongs.map((item,index)=>(<Songitem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}
      </div>
      </div>
    </>
  );
};

export default Search;
