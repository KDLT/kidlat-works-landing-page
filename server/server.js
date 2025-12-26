const express = require('express');
const app = express();

const PORT = 3000;
const HOST = '127.0.0.1'; // or 'localhost'

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
  res.send(`<h1>Welcome to the home page</h1><p>this is from server.js</p>`)
})

app.post('/api/subscribe',(req,res)=>{
  // console.log(`req.body: ${req.body}`)
  // object destructuring
  const { email, name, mobile } = req.body;
  if (!email) {
    return res.status(400).json({ message: `Email is required for subscription.` });
  }
  if (!name) {
    return res.status(400).json({ message: `Name is required for subscription.` });
  }
  if (!mobile) {
    return res.status(400).json({ message: `Mobile is required for subscription.` });
  }
  console.log(`Received subscription request for: ${name} ${email} ${mobile}`);
  // in a real application this would save to a database, for now just send the success response
  res.status(200).json({ message: `Subscription request received for ${name}, ${email}, ${mobile}` });
})

app.use((req,res)=>{
  res.status(404).send(`404 Page Not Found.`)
})

app.listen(PORT, HOST, ()=>{
  console.log(`Backend server running at http://localhost:${PORT}`)
})

