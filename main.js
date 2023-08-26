const text = document.getElementById("text");
const button = document.querySelector(".submit");
const form = document.getElementById("form");
const box = document.querySelector(".box");
const bc = new BroadcastChannel("channel");
const username = document.getElementById("name");
let miStorage = window.localStorage;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (text.value.trim() == "" || username.value.trim() == "") {
    button.disabled = true;
    alert("Put a true username or text");
  } else {
    bc.postMessage({ name: username.value, text: text.value });
    const msg = document.createElement("div");
    msg.classList.add("message");
    box.appendChild(msg);

    const title = document.createElement("h2");
    title.innerText = `${username.value} =>`;
    msg.appendChild(title);

    const content = document.createElement("p");
    content.innerText = text.value;
    msg.appendChild(content);
    text.value = "";
  }
});

bc.onmessage = (event) => {
  console.log(event);
  const name = event.data.name;
  const text = event.data.text;
  const msg = document.createElement("div");
  msg.classList.add("message");
  box.appendChild(msg);

  const title = document.createElement("h2");
  title.innerText = `${name} =>`;
  msg.appendChild(title);

  const content = document.createElement("p");
  content.innerText = text;
  msg.appendChild(content);
};
