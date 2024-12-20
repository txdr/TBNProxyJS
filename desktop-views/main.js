const socket = io("http://localhost:3000");

function setInfo(a) {
   if (a === "Initialized contact with proxy service.") {
      document.getElementById("startButton").disabled = false;
   }
   document.getElementById("info").innerHTML = a;
}

function start() {
   socket.emit("begin", document.getElementById("address").value);
}

socket.on("info", setInfo);
socket.on("connected", () => {
   setInfo("Socket opened.")
});