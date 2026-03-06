document.addEventListener("DOMContentLoaded", () => {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const getQuoteBtn = document.getElementById("get-quote-btn");

  const fallbackQuotes = [
    { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci" }
  ];

  function renderQuote(quote, author) {
    quoteText.textContent = `"${quote}"`;
    quoteAuthor.textContent = `— ${author}`;
  }

  function saveQuote(quote, author) {
    localStorage.setItem("lastQuote", JSON.stringify({ quote, author }));
  }

  function loadSavedQuote() {
    const savedQuote = JSON.parse(localStorage.getItem("lastQuote"));

    if (savedQuote && savedQuote.quote && savedQuote.author) {
      renderQuote(savedQuote.quote, savedQuote.author);
    }
  }

  function renderFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    const fallback = fallbackQuotes[randomIndex];
    renderQuote(fallback.quote, fallback.author);
    saveQuote(fallback.quote, fallback.author);
  }

  async function fetchQuote() {
    quoteText.textContent = "Loading quote...";
    quoteAuthor.textContent = "";

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) {
        throw new Error("Quote API request failed.");
      }

      const data = await response.json();
      const quote = data.quote;
      const author = data.author || "Unknown";

      if (!quote) {
        throw new Error("Quote API returned invalid response.");
      }

      renderQuote(quote, author);
      saveQuote(quote, author);
    } catch (error) {
      renderFallbackQuote();
    }
  }

  getQuoteBtn.addEventListener("click", fetchQuote);
  loadSavedQuote();
});
