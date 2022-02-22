const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
db();
//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/posts", require('./routes/postRoutes'));
app.use("/api/users", require('./routes/userRoutes'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

