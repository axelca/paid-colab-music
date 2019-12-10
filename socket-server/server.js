const io = require("socket.io")();
const fs = require("fs");
const port = 8000;
let data = [];

io.on("connection", socket => {
  socket.on("values to server", userData => {
    // send data to spotify client
    io.sockets.emit("values from server", userData.toFixed(2));

    // merge old clicks with new, add a date stamp
    data = [...data, { value: userData.toFixed(2), time: new Date() }];

    // write events to file
    fs.writeFile("data.json", JSON.stringify(data), err => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });
});

io.listen(port);
console.log("listening on port ", port);
