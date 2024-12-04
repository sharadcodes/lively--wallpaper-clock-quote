document.addEventListener("DOMContentLoaded", () => {
  const clocks = [
    { city: "Delhi", offset: 0 },
    { city: "California", offset: -11.5 },
    { city: "Pittsburgh", offset: -10.5 },
    { city: "York", offset: -5.5 },
  ];

  const clockContainer = document.getElementById("clock-container");
  clocks.forEach((clock) => {
    const clockElement = document.createElement("div");
    clockElement.className = "clock";
    clockElement.innerHTML = `<h2>${clock.city}</h2><p id="${clock.city}-time"></p>`;
    clockContainer.appendChild(clockElement);
  });

  function updateClocks() {
    const now = new Date();
    clocks.forEach((clock) => {
      const localTime = new Date(now.getTime() + clock.offset * 3600 * 1000);
      document.getElementById(`${clock.city}-time`).textContent =
        localTime.toLocaleTimeString();
    });
  }

  setInterval(updateClocks, 1000);
  updateClocks();

  function fetchQuote() {
    fetch("https://qapi.vercel.app/api/random")
      .then((response) => response.json())
      .then((data) => {
        data.quote = partitionQuote(data.quote, 8);
        document.getElementById("quote").innerHTML = data.quote;
        document.getElementById("author").textContent = `— ${data.author}`;
      })
      .catch((error) => console.error("Error fetching quote:", error));
  }

  fetchQuote();
  setInterval(fetchQuote, 60000); // Fetch a new quote every minute
});

function partitionQuote(txt, len) {
  // split the quote into parts of 8 words each not character
  const words = txt.split(" ");
  const parts = [];
  for (let i = 0; i < words.length; i += 8) {
    parts.push(words.slice(i, i + 8).join(" "));
  }
  return parts.join("<br>");
}
