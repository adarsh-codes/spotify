import {v2 as cloudinary} from 'cloudinary'
import albummodel from '../models/albumModel.js'

const addalbum = async(req,res)=>{
    try{
        const name = req.body.name;
        const desc = req.body.desc;
        const bgcolour = req.body.bgcolour;
        const imagefile = req.file;
        const imageupload = await cloudinary.uploader.upload(imagefile.path,{resource_type: "image"});

        const albumdata = {
            name,
            desc,
            bgcolour,
            image: imageupload.secure_url,
        }
        const album = albummodel(albumdata);
        await album.save();
        res.json({success:true, message:"album added"});
    }
    catch(err){
        res.json({success:false});
    }
}

const listalbums = async (req,res)=>{
    try{
        const allalbums = await albummodel.find({});
        res.json({success:true, albums:allalbums});
    }
    catch(err){
        res.json({success:false});
    }
}

const removealbum = async(req,res)=>{
    try{
        await albummodel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"album removed"});
    }
    catch(err){
        res.json({success:false});
    }
}


export {addalbum, listalbums, removealbum};