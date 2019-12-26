var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 8000;
var allClients = [];

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

io.on("connection", socket => {
  // add connected client to array
  console.log("Client connected!");
  allClients.push(socket);
  // when the client emits 'new message', this listens and executes
  socket.on("new value", data => {
    // modify data with 3 decimals
    newData = parseFloat(data).toFixed(3);
    // tell the console what we got from the client
    console.log("got %d", newData);
    // we tell the client to execute 'new value'
    socket.broadcast.emit("new value", newData);
  });

  socket.on("next", data => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("next", data);
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    console.log("Client disconnected!");

    var i = allClients.indexOf(socket);
    allClients.splice(i, 1);
  });
});
