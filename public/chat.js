debugger;
const form = document.querySelector("form");
const input = document.querySelector(".input");
const messages = document.querySelector(".messages");
const username = prompt("Please enter a nickname: ", "");
const socket = io();


form.addEventListener("submit", function (event) {
  // Prevent default reload behavior that occurs when a form is submitted.
  // Default page reload behavior on form submit is due to pre-javascript days where
  // any form submission required submission of form data to the server, then for the client 
  // to receive the server respnose.
  // Read more here: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  event.preventDefault();

  // Keep user from submitting blank message
  if (!input.value) {
    return false;
  }

  sendPlainMessage(input.value);
  
  addMessage(username + ": " + input.value);

  socket.emit("chat_message", {
    message: input.value
  });

  input.value = "";
  return false;
}, false);

socket.on("chat_message", function (data) {
  addMessage(data.username + ": " + data.message);
});

socket.on("user_join", function (data) {
  addMessage(data + " just joined the chat!");
});

socket.on("user_leave", function (data) {
  addMessage(data + " has left the chat.");
});

addMessage("You have joined the chat as '" + username + "'.");
socket.emit("user_join", username);

function addMessage(message) {
  const li = document.createElement("li");
  li.innerHTML = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

const sendPlainMessage = message => {
  const data = { message: message }
  fetch('/messageReceiving', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => {
    console.log('Success:', data)
  })
  .catch((error) => {
    console.error('Error:', error);
  })
}
