document.addEventListener("DOMContentLoaded", () => {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const getQuoteBtn = document.getElementById("get-quote-btn");

  async function fetchQuote() {
    quoteText.textContent = "Loading quote...";
    quoteAuthor.textContent = "";

    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();

      quoteText.textContent = `"${data[0].q}"`;
      quoteAuthor.textContent = `— ${data[0].a}`;
    } catch (error) {
      quoteText.textContent = "Failed to load quote. Please try again.";
      quoteAuthor.textContent = "";
    }
  }

  getQuoteBtn.addEventListener("click", fetchQuote);
});