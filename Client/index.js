const socket = io({ transports: ["websocket"], upgrade: false });

//!DOM
const parentDiv = document.getElementById("message-container");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (document.getElementById("input").value.trim() === "") {
    return;
  } else {
    console.log("msg sent");
    socket.emit("msg-cli", document.getElementById("input").value);
    document.getElementById("input").value = "";
    document.getElementById("input").focus();
  }
});

socket.on("msg-server", (msg) => {
  displayMessage(msg);
  parentDiv.scrollTop = parentDiv.scrollHeight;
});

const displayMessage = (msg) => {
  console.log("🚀 ~ file: index.js ~ line 22 ~ displayMessage ~ msg", msg);

  const newMsg = document.createElement("div");
  newMsg.classList.add("each-message");

  const usernameHolder = document.createElement("h2");
  usernameHolder.innerHTML = msg.user;

  const messageTextDiv = document.createElement("div");
  messageTextDiv.classList.add("message-text");

  const text = document.createElement("h3");
  text.innerText = msg.msg;

  messageTextDiv.appendChild(text);

  newMsg.appendChild(usernameHolder);
  newMsg.appendChild(messageTextDiv);
  parentDiv.appendChild(newMsg);
};
