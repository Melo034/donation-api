import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import donationRouter from './routes/apis/donation';


const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());


// Connect to MongoDB
/**mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Failed to connect to MongoDB", err);
});*/

app.use('api/donations', donationRouter)

app.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});