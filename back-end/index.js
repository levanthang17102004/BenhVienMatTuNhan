const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/connectDb');
const path = require('path');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT;

// routes






// middleware






//connectDB
connectDB();


app.listen(PORT, "0.0.0.0", (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Server running at http://0.0.0.0:${PORT}`);
});


