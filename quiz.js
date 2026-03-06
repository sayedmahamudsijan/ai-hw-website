document.addEventListener("DOMContentLoaded", () => {
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const nextBtn = document.getElementById("next-question-btn");
  const restartBtn = document.getElementById("restart-quiz-btn");
  const resultEl = document.getElementById("quiz-result");

  const quizData = [
    {
      question: "What does AI stand for?",
      options: [
        "Automatic Internet",
        "Artificial Intelligence",
        "Advanced Input",
        "Applied Interface"
      ],
      answer: "Artificial Intelligence"
    },
    {
      question: "Which language is commonly used in web development?",
      options: ["Python", "Java", "JavaScript", "C++"],
      answer: "JavaScript"
    },
    {
      question: "Which HTML tag is used for a button?",
      options: ["<div>", "<button>", "<span>", "<inputtext>"],
      answer: "<button>"
    },
    {
      question: "Which storage allows saving data in browser?",
      options: ["localStorage", "sessionStorage", "cookies", "All of these"],
      answer: "All of these"
    },
    {
      question: "Which of these is a frontend technology?",
      options: ["HTML", "Node.js", "MongoDB", "Express"],
      answer: "HTML"
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let selectedAnswer = null;

  function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";
    resultEl.textContent = "";
    selectedAnswer = null;

    current.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.className = "option-btn";

      btn.addEventListener("click", () => {
        document.querySelectorAll(".option-btn").forEach((b) => {
          b.classList.remove("selected");
        });
        btn.classList.add("selected");
        selectedAnswer = option;
      });

      optionsEl.appendChild(btn);
    });
  }

  nextBtn.addEventListener("click", () => {
    if (!selectedAnswer) {
      resultEl.textContent = "Please select an answer first.";
      return;
    }

    if (selectedAnswer === quizData[currentQuestion].answer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      questionEl.textContent = "Quiz Completed!";
      optionsEl.innerHTML = "";
      resultEl.textContent = `Your score is ${score} out of ${quizData.length}.`;
      nextBtn.style.display = "none";
      restartBtn.style.display = "inline-block";
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
    loadQuestion();
  });

  loadQuestion();
});