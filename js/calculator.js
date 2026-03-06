document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("calc-display");
  const calcButtons = document.querySelectorAll(".calc-btn");
  const equalsBtn = document.getElementById("equals-btn");
  const clearBtn = document.getElementById("clear-btn");

  const savedValue = localStorage.getItem("calculatorDisplay");
  if (savedValue) {
    display.value = savedValue;
  }

  function persistDisplay() {
    localStorage.setItem("calculatorDisplay", display.value);
  }

  function isValidExpression(expression) {
    return /^[0-9+\-*/.()\s]+$/.test(expression);
  }

  calcButtons.forEach((button) => {
    if (button.id !== "equals-btn" && button.id !== "clear-btn") {
      button.addEventListener("click", () => {
        display.value += button.textContent;
        persistDisplay();
      });
    }
  });

  equalsBtn.addEventListener("click", () => {
    const expression = display.value.trim();

    if (!expression || !isValidExpression(expression)) {
      display.value = "Error";
      persistDisplay();
      return;
    }

    try {
      const result = Function(`"use strict"; return (${expression})`)();
      display.value = Number.isFinite(result) ? String(result) : "Error";
    } catch (error) {
      display.value = "Error";
    }

    persistDisplay();
  });

  clearBtn.addEventListener("click", () => {
    display.value = "";
    persistDisplay();
  });
});
