document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("calc-display");
  const calcButtons = document.querySelectorAll(".calc-btn");
  const equalsBtn = document.getElementById("equals-btn");
  const clearBtn = document.getElementById("clear-btn");

  calcButtons.forEach((button) => {
    if (
      button.id !== "equals-btn" &&
      button.id !== "clear-btn"
    ) {
      button.addEventListener("click", () => {
        display.value += button.textContent;
      });
    }
  });

  equalsBtn.addEventListener("click", () => {
    try {
      display.value = eval(display.value);
    } catch (error) {
      display.value = "Error";
    }
  });

  clearBtn.addEventListener("click", () => {
    display.value = "";
  });
});