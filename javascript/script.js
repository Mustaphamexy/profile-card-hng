const timeElement = document.getElementById("userTime");

function updateTime() {
  timeElement.textContent = Date.now();
}

updateTime();
setInterval(updateTime, 1000);