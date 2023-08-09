// const express = require("express");
// const app = express();
// const http = require("http").Server(app);
// const socketClient = require("socket.io-client")("https://friends-for-rescue.onrender.com");
// const cors = require("cors")
// app.use(cors())
// const io = require("socket.io")(http, {
//   cors: {
//     origin: "*",
//   },
// });
// const port = 4000;
// io.on("connection", (socket) => {
//   console.log("soccet connected");
//   io.emit("soccetconnected", `${socket.id}`);
//   socketClient.on("messageResponse", (data) => {
//     socket.emit("message", data);
//   });
//   socket.on("disconnect", () => {
//     console.log("soccet disconnected");
//     io.emit("soccetDisconnected", `${socket.id}`);
//   });
// });
// http.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
const express=require("express")
const app=express()
const port=4000
const http=require("http").Server(app)
const cors= require("cors")

app.use(cors());

const socketIO=require("socket.io")(http,{
    cors:{
        origin:"*",
    },
});

socketIO.on("connection",(socket)=>{
    console.log("user connected")
    socketIO.emit("userconnected",`${socket.id}`)

    socket.on("message",(data)=>{
        socketIO.emit("messageResponse",data);
    });
    socket.on("disconnect",()=>{
        console.log("user disconnected");
        socketIO.emit("userDisconnected",`${socket.id}`);
    })
})


http.listen(port,()=>{
    console.log(`server listening on ${port}`);
})