const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 정적 파일 제공
app.use(express.static("public"));

// 라우팅 설정
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// 소켓 연결
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chatMessage", (msg) => {
    console.log(`message: ${msg.message} from ${msg.username}`);
    io.emit("chatMessage", msg);
  });
});

// 서버 시작
httpServer.listen(3001, () => {
  console.log("listening on *:3001");
});
