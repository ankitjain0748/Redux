const express = require("express");
const app = express();
const http = require("http");
//const socketio = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/redux")
app.use( cors());
app.use(bodyParser.json());

const router= require('./router/index');

app.use('/user',router)

// app.get("/", (req, res) => {
//   res.json({
//     msg: "Active",
//     status: 200,
//   });
// });

// const Chat = require("./models/Messages");

// const io = socketio(server, { cors: { origin: "*" } });

// io.on("connection", (socket) => {
//   console.log(`user connected ${socket.id}`);
//   socket.on("join-room", (data) => {
//     socket.join(data);
//     console.log(`userId is: ${socket.id} join-room ${data}`);
//   });
//   socket.on("send-message", async (data) => {
//     try {
//       // Save the message to the database
//       const message = new Chat({
//         userId: data.userId,
//         receiveId: data.receiveId,
//         message: data.message,
//         time: new Date().toLocaleTimeString(),
//       });
//       const savedMessage = await message.save();

//       // Emit the message to the recipient's socket room
//       io.to(data.userId).emit("test-event", {
//         receiveId: data.receiveId,
//         author: data.username,
//         userId: data.userId,
//         message: data.message,
//         time: new Date().toLocaleTimeString(),
//       });
//       console.log("Message saved and emitted:", savedMessage);
//       console.log("Receiver Message:", message);
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });

const PORT = process.env.PORT; 
console.log("PORT", PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
