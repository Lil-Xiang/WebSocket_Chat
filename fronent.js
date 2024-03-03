// Create WebSocket connection
const ws = new WebSocket("ws://localhost:8080");

const main = document.querySelector("main");
const input = document.getElementById("input");
const button = document.getElementById("button");

var name = prompt("請輸入姓名");

// 在開啟連線時執行
ws.onopen = () => {
  ws.send(
    JSON.stringify({
      type: "name",
      data: name,
    })
  );
};

ws.onmessage = (event) => {
  let json = JSON.parse(event.data);
  let chatHTML = `
    <div class="otherChat">
      <h3 id="client">${json.name}:</h3>
      <h4 id="span">${json.data}</h4>
    </div>`;
  main.innerHTML += chatHTML;
};

button.addEventListener("click", () => {
  let text = input.value;
  ws.send(
    JSON.stringify({
      type: "message",
      data: text,
    })
  );

  let yourChatHTML = `
   <div class="yourChat">
     <h3 id="client">${name}:</h3>
     <h4 id="span">${text}</h4>
   </div>`;
  main.innerHTML += yourChatHTML;
  input.value = "";
});
