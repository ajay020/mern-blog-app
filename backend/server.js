const express = require('express');

const app = express();
const PORT = 5000;

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Hello world"});
} )

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

