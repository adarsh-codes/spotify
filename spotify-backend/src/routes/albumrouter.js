import express from 'express';
import upload from '../middlewares/multer.js'
import {addalbum,removealbum,listalbums} from '../controllers/albumController.js'

const albumrouter = express.Router();

albumrouter.post('/add',upload.single('image'), addalbum);
albumrouter.post('/remove', removealbum);
albumrouter.get('/list', listalbums);

export default albumrouter;