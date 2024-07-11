import mongoose from 'mongoose';

const userSchema = {
    username : {type : String, required: true, unique : true},
    email : {type : String, required: true, unique : true},
    password : {type : String, required: true},
    profile_picture : {type : String, required: true}
}

const userModel = new mongoose.Model(userSchema);

export default userModel;

