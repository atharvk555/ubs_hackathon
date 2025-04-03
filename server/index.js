const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const {upload} =require("./config/multer");
const {dbConnect}=require("./config/database");
const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  `${process.env.FRONTEND_URL}/`
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// data base
dbConnect();
// Routes
const { userRoute } = require("./router/userRoute");
const {geminiRoute}=require("./router/geminiRoute");
const {donorRouter}=require("./router/donorRouter");
app.use("/api/user", userRoute);
app.use("/api/gemini",geminiRoute);
app.use("/api/donor",donorRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.BACKEND_PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running successfully on port: ${PORT}`);
});
