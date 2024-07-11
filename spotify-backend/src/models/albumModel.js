import mongoose from "mongoose";

const albumschema = new mongoose.Schema({
    name : {type: String, required: true},
    desc : {type: String, required: true},
    bgcolour : {type: String, required: true},
    image : {type: String, required: true},

});

const albummodel = mongoose.models.album || mongoose.model('album',albumschema);

export default albummodel;