const express = require("express");
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  pingTimeout: 1000,
  maxHttpBufferSize: 1e8,
  pingInterval: 3000,
});
// path.join(__dirname, './build')
app.use(express.static(__dirname));
 app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


if (process.env.NODE_ENV === "production") {
  console.log('')
  app.use(express.json("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build', '/index.html'));
// });

const room = new Map([
  ["users", new Map()],
  ["messages", []],
]);

app.get("/room", (req, res) => {
  const obj = {
    users: [...room.get("users").values()],
    messages: [...room.get("messages").values()],
  };
  res.json(obj);
});

io.on("connect", (socket) => {
  socket.on("USER:JOIN", ({ name, photo }) => {
    socket.join();
    room.get("users").set(socket.id, { name, photo });
    const users = [...room.get("users").values()];
    socket.broadcast.emit("USER:JOINED", users);
  });
  console.log("user connected > ", socket.id);
  socket.on("ROOM:NEW_MESSAGE", ({ userName, userPhoto, text, img }) => {
    const obj = {
      userName,
      userPhoto,
      text,
      img,
    };
    if (room.get("messages").length > 100) {
      room.get("messages").shift()
    }
    room.get("messages").push(obj);
    socket.broadcast.emit("ROOM:NEW_MESSAGE", obj);
  });

  socket.on("disconnect", () => {
    if (room.get("users").delete(socket.id)) {
      const users = [...room.get("users").values()];
      socket.broadcast.emit("USER:JOINED", users);
    }
  });
});
app.listen(port, () => console.log('work'))

// server.listen(9999, (error) => {
//   if (error) {
//     throw Error(error);
//   }
//   console.log("Сервер запущен!");
// });
