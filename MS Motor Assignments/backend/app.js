const express = require('express');
const app = express();
const bcrypt = require("bcrypt")
const { bodyParser, urlencoded } = require('body-parser');
const users = require('./routes/users')
const cars = require('./routes/cars')
const cors = require("cors");


const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3001',  // Allow requests from this origin
    methods: ['GET', 'POST'],  // Allow specific methods (adjust as needed)
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers (if necessary)
};

app.use(cors(corsOptions));

app.use(urlencoded({ extended: false }))

app.use(express.json());

app.use('/api', users);
app.use('/api', cars);
app.use('/uploads', express.static('uploads'));


app.listen(PORT, (err) => {
    if (err) {
        console.log('Server is not running')
    } else {
        console.log(`Listening at port ${PORT}`)
    }
})