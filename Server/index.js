const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const PORT = 3001;
const cors = require("cors");
require("dotenv").config();
app.use(express.json())
mongoose
.connect(
  "mongodb+srv://shaharnus:1234@clusterfriendsforrescue.k6kpyda.mongodb.net/?retryWrites=true&w=majority")
  
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err.message);
  });
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/users", userRoutes);
  app.use("/admins", adminRoutes);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });