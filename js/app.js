document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".module");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const target = button.getAttribute("data-target");

      sections.forEach((section) => {
        section.classList.remove("active-section");
      });

      document.getElementById(target).classList.add("active-section");
    });
  });
});