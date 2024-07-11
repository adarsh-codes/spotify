
import {v2 as cloudinary} from 'cloudinary'
import songmodel from '../models/songmodel.js'
const addsong = async (req,res)=>{
    try{
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audiofile = req.files.audio[0];
        const imagefile = req.files.image[0];
        const audioupload = await cloudinary.uploader.upload(audiofile.path,{resource_type: "video"});
        const imageupload = await cloudinary.uploader.upload(imagefile.path,{resource_type: "image"});
        const duration = `${Math.floor(audioupload.duration/60)}:${Math.floor(audioupload.duration%60)}`
        // console.log(name,desc,album,audioupload,imageupload); // checked cloudinary upload is done

        const songdata = {
            name,
            desc,
            album,
            file: audioupload.secure_url,
            image: imageupload.secure_url,
            duration
        }

        const song = songmodel(songdata);
        await song.save();

        res.json({success:true, message:"song added"})
    }
    catch(error){
        res.json({success:false})
    }
}

const listsong = async(req,res)=>{
    try{
        const allsongs = await songmodel.find({});
        res.json({success:true,songs:allsongs})
    }
    catch(error){
        res.json({success:false});
    }
}

const removesong = async(req,res)=>{
    try{
        await songmodel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"song removed"});
    }
    catch(error){
        res.json({success:false});
    }
}
export {addsong,listsong,removesong};