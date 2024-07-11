/* eslint-disable no-unused-vars */
import React,{useContext} from 'react'
import { assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
    const {track,seekbar,seekbg,play,playstatus,pause,time,previous,next,seeksong} = useContext(PlayerContext);
  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={track.image}>
            </img>
            <div>
                <p>{track.name}</p>
                <p>{track.desc.slice(0,12)}</p>
            </div>

        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-4'>
                <img className='w-4 cursor-pointer' src={assets.shuffle_icon}></img>
                <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon}></img>
                
                
                {playstatus ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon}></img>:
                <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon}></img>
                }

                <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon}></img>
                <img className='w-4 cursor-pointer' src={assets.loop_icon}></img>
            </div>
            <div className='flex items-center gap-5'>
                <p>{time.currentime.minutes}:{time.currentime.seconds}</p>
                <div ref={seekbg} onClick={seeksong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                    <hr ref={seekbar} className='h-1 border-none w-0 bg-green-800 rounded-full'></hr>
                </div>
                <p>{time.totalt.minutes}:{time.totalt.seconds}</p>
            </div>
        </div>
        <div className='hidden lg:flex items-center gap-2 opacity-75'>
            <img className='w-4' src={assets.play_icon}></img>
            <img className='w-4' src={assets.mic_icon}></img>
            <img className='w-4' src={assets.queue_icon}></img>
            <img className='w-4' src={assets.speaker_icon}></img>
            <img className='w-4' src={assets.volume_icon}></img>
            <div className='w-20 bg-slate-50 h-1 rounded '>

            </div>
            <img className='w-4' src={assets.mini_player_icon}></img>
            <img className='w-4' src={assets.zoom_icon}></img>

        </div>
      
    </div>
  ) : null
}

export default Player
