const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req,res)=>{
  res.send(`<h1>Welcome to the home page</h1><p>this is from server.js</p>`)
})

app.listen(PORT,()=>{
  console.log(`Backend server running at http://localhost:${PORT}`)
})
