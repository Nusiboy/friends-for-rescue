const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const cors = require("cors");
const usersRoutes=require("./routes/usersRoute")
const markRoutes=require("./routes/markRoute")
require("dotenv").config();

app.use(express.json())
app.use(
  cors({
    origin: "*",
  })
);

mongoose
.connect(process.env.MONGO_CONNECTOR , {})
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err.message);
  });

  app.use(cors());

  app.use("/users",usersRoutes)
  app.use("/marks",markRoutes)


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoute");
// const adminRoutes = require("./routes/adminRoute");
// const PORT = 3001;
// const cors = require("cors");
// const http = require("http").Server(app);
// const socketIO = require("socket.io")(http);
// require("dotenv").config()
// mongoose
//   .connect(process.env.MONGO_CONNECTOR, {})
//   .then(() => {
//     console.log("Successfully connected to MongoDB Atlas");
//   })
//   .catch((err) => {
//     console.log("Unable to connect to MongoDB Atlas");
//     console.error(err.message);
//   });

// socketIO.on("connection", (socket) => {
//   console.log("user connected");
//   socketIO.emit("userconnected", `${socket.id}`);

//   socket.on("message", (data) => {
//     socketIO.emit("messageResponse", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     socketIO.emit("userDisconnected", `${socket.id}`);
//   });
// });

// app.use(cors());

// app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.use("/users", userRoutes);
// app.use("/admins", adminRoutes);

// http.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });