document.addEventListener("DOMContentLoaded", () => {
  const result = window.localStorage.getItem("result") || 0;
  document.getElementById("result").innerHTML = result;

  const remarksDiv = document.getElementById("remarks");
  if (result > 8) {
    remarksDiv.innerHTML = "Unbelievable Result, bhai party chahiye";
  } else if (result > 5) {
    remarksDiv.innerHTML = "Congratulations! You scored well";
  } else if (result > 0) {
    remarksDiv.innerHTML = "You did good";
  } else if (result == 0) {
    remarksDiv.innerHTML = "Well, you neither won nor lost";
  } else if (result < 0) {
    remarksDiv.innerHTML = "You can do better";
  } else if (result < -5) {
    remarksDiv.innerHTML = "Need a lot of improvement";
  }
});
