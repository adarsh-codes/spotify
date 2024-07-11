/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState} from "react";
import { useRef} from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props)=>{

    const audioRef = useRef();
    const seekbg = useRef();
    const seekbar = useRef();

    const url = 'http://localhost:4000';

    const [songsData, setsongsData] = useState([]);
    const [albumsData, setalbumsData] = useState([]);


    const getsongsdata = async()=>{
        try{
            const response = await axios(`${url}/api/song/list`);
            setsongsData(response.data.songs);
            setTrack(response.data.songs[0]);
        }
        catch(e){
            console.error(e);
        }
    }

    const getalbumsdata = async()=>{
        try{
            const response = await axios.get(`${url}/api/album/list`);
            setalbumsData(response.data.albums);
        }
        catch(e){
            console.error(e);
        }
    }


    const [track,setTrack] = useState(songsData[0]);
    const [playstatus,setplaystatus] = useState(false);
    const [time,settime] = useState({currentime:{seconds:0,minutes:0}, totalt:{seconds:0,minutes:0}});

    const play = ()=>{
        
        audioRef.current.play();
        setplaystatus(true);
    }
    const pause = ()=>{
        audioRef.current.pause();
        setplaystatus(false);
    }
   const playwithid = async(id)=>{
     await songsData.map((item)=>{
        if(id === item._id){
            setTrack(item);
           
        }
     })
     await audioRef.current.play();
     setplaystatus(true);
   }

   const previous = async ()=>{
        songsData.map(async(item,index)=>{
            if(track._id === item.id && index > 0){
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setplaystatus(true);
            }
        })
   }
   const next = async ()=>{
    songsData.map(async(item,index)=>{
        if(track._id === item.id && index < songsData.length){
            await setTrack(songsData[index + 1]);
            await audioRef.current.play();
            setplaystatus(true);
        }
    })
}

    const seeksong = async (e)=>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekbg.current.offsetWidth)*audioRef.current.duration)
    }

    const contextvalue = {
          audioRef, seekbar, seekbg,
          track, playstatus, time,
          setTrack, setplaystatus, settime,
          play, pause, playwithid, previous,next,seeksong
          ,songsData,albumsData
    }
  
    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = () =>{
                seekbar.current.style.width = Math.floor(audioRef.current.currentTime/audioRef.current.duration*100) + "%"
               settime({
                currentime:{seconds: Math.floor(audioRef.current.currentTime % 60),
                    minutes:Math.floor(audioRef.current.currentTime / 60)},
                     totalt:{seconds:Math.floor(audioRef.current.duration % 60),
                        minutes:Math.floor(audioRef.current.duration / 60)}
                    })
            }
        },1000)
    },[audioRef])
    
    useEffect(()=>{
        getsongsdata();
        getalbumsdata();
    },[])
   

    return (
        <PlayerContext.Provider value={contextvalue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;