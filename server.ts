import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import donationRouter from './routes/apis/donation';
import blinkRouter from './routes/apis/blinks';


const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());


// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB');
    console.log(error);
});

// Use the donation router
app.use('/api/donations', donationRouter)

// Use the blink router
app.use('/api/blink', blinkRouter)

app.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});