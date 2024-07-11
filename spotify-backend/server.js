import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './src/config/mongodb.js';
import connectcloud from './src/config/cloudinary.js';
import songrouter from './src/routes/songrouter.js';
import albumrouter from './src/routes/albumrouter.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
connectDB();
connectcloud();


app.get('/', (req, res) => {
  res.send("api working");
});

app.use('/api/song',songrouter);
app.use('/api/album',albumrouter);

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});