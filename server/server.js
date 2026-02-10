const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;
// tells express to listen on ALL netowrk interfaces
const HOST = process.env.HOST || "0.0.0.0";

const corsOptions = {
  origin: [
    "http://localhost:5173", // mac
    "http://192.168.1.36:5173", // other devices if any
  ],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the home page</h1><p>this is from server.js</p>`);
});

app.post("/api/subscribe", async (req, res) => {
  // uncomment below to set artificial delay for testing timeout
  // await new Promise((resolve) => setTimeout(resolve, 100));

  console.log(`user-agent: ${req.get("User-Agent")}`);
  // console.log(`req.body: ${req.body}`)
  // object destructuring
  const { email, name, mobile } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: `Email is required for subscription.` });
  }
  if (!name) {
    return res
      .status(400)
      .json({ message: `Name is required for subscription.` });
  }
  if (!mobile) {
    return res
      .status(400)
      .json({ message: `Mobile is required for subscription.` });
  }
  console.log(`Received subscription request for: ${name} ${email} ${mobile}`);
  // in a real application this would save to a database, for now just send the success response
  res.status(200).json({
    message: `Subscription request received for ${name}, ${email}, ${mobile}`,
  });
});

app.use((req, res) => {
  res.status(404).send(`404 Page Not Found.`);
});

app.listen(PORT, HOST, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
