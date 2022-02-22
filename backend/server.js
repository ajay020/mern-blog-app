const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/posts", require('./routes/postRoutes'));
app.use("/api/auth", require('./routes/authRoutes'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

