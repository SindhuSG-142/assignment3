const express = require("express");
const app= express();
const PORT=3001;

app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
})