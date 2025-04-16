const socket = io();

function register() {
  const username = document.getElementById("username").value;
  socket.emit("register", username);
}

function sendPrivate() {
  const to = document.getElementById("to").value;
  const message = document.getElementById("pm").value;
  socket.emit("private message", { to, message });
}



function sendGroup() {
  const group = document.getElementById("group").value;
  const message = document.getElementById("gm").value;
  socket.emit("group message", { group, message });
}

socket.on("private message", ({ from, message }) => {
  const div = document.getElementById("messages");
  div.innerHTML += `<p><strong>PM from ${from}:</strong> ${message}</p>`;
});

socket.on("group message", ({ from, message }) => {
  const div = document.getElementById("messages");
  div.innerHTML += `<p><strong>Group - ${from}:</strong> ${message}</p>`;
});

function createGroup() {
  const groupName = document.getElementById("newGroup").value;
  socket.emit("create group", groupName, (response) => {
    alert(response.message);
  });
}

function joinGroup() {
  const group = document.getElementById("group").value;
  socket.emit("join group", group, (response) => {
    alert(response.message);
  });
}
