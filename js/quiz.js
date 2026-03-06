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

  function saveQuizState(state) {
    localStorage.setItem("quizState", JSON.stringify(state));
  }

  function getInitialQuizState() {
    const savedState = JSON.parse(localStorage.getItem("quizState"));

    if (
      savedState &&
      Number.isInteger(savedState.currentQuestion) &&
      Number.isInteger(savedState.score) &&
      typeof savedState.completed === "boolean" &&
      savedState.currentQuestion >= 0 &&
      savedState.currentQuestion <= quizData.length
    ) {
      return savedState;
    }

    return {
      currentQuestion: 0,
      score: 0,
      completed: false
    };
  }

  const quizState = getInitialQuizState();
  let selectedAnswer = null;

  function renderCompletedState() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    resultEl.textContent = `Your score is ${quizState.score} out of ${quizData.length}.`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
  }

  function loadQuestion() {
    if (quizState.completed || quizState.currentQuestion >= quizData.length) {
      quizState.completed = true;
      saveQuizState(quizState);
      renderCompletedState();
      return;
    }

    const current = quizData[quizState.currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";
    resultEl.textContent = "";
    selectedAnswer = null;
    nextBtn.style.display = "inline-block";
    restartBtn.style.display = "none";

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

    if (selectedAnswer === quizData[quizState.currentQuestion].answer) {
      quizState.score++;
    }

    quizState.currentQuestion++;

    if (quizState.currentQuestion < quizData.length) {
      saveQuizState(quizState);
      loadQuestion();
    } else {
      quizState.completed = true;
      saveQuizState(quizState);
      renderCompletedState();
    }
  });

  restartBtn.addEventListener("click", () => {
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.completed = false;
    saveQuizState(quizState);
    loadQuestion();
  });

  loadQuestion();
});
