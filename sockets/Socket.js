const SendStocket = (room, data) => {
  const server = require("../server");
  server.io.emit(room, data);
};

module.exports = {
  SendStocket,
};
