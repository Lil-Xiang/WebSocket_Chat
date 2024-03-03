const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let name;
//clients:廣告功能

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    message = JSON.parse(message);

    // 連接成功時先創建名字
    if (message.type === "name") {
      ws.personName = message.data;
      return;
    }

    wss.clients.forEach((client) => {
      // 判斷是不是本人
      if (client != ws) {
        client.send(
          JSON.stringify({
            name: ws.personName,
            data: message.data,
          })
        );
      }
    });
  });

  ws.on("close", () => {
    console.log("lost one client");
  });
  console.log("New client");
});
