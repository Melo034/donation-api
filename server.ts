import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Bootcampers");
});

app.get("/search", (req, res) => {
   const term = req.query.q;
    res.send(`You searched for ${term}`);
});

app.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});