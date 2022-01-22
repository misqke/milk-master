require('dotenv').config();
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 8000;
const app = express();

// middleware
app.use(express.json());

// cors
const corsOptions = process.env.NODE_ENV === 'development' ? {origin: "http://localhost:3000"} : {origin: null}
app.use(cors(corsOptions))


app.get("/", (req, res) => {
  res.status(200).json({msg: "hello world"})
})

app.listen(port, () => console.log(`server running on port: ${port}...`));