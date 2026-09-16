const questions = [
  {
    question: "Quelle methode ajoute un element a la fin d'un tableau ?",
    options: ["push()", "pop()", "shift()", "slice()"],
    answer:  "push()"
  },
  {
    question: "Quel mot-cle declare une variable qu'on ne peut pas reassigner ?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },
  {
    question: "Que retourne typeof [] en JavaScript ?",
    options: ["array", "object", "list", "undefined"],
    answer: "object"
  },
  {
    question: "Quelle methode selectionne un element par son id ?",
    options: [
      "document.querySelectorAll()",
      "document.getElementById()",
      "document.createElement()",
      "document.getElementsByClassName()"
    ],
    answer: "document.getElementById()"
  },
  {
    question: "Quel operateur compare la valeur ET le type ?",
    options: ["==", "===", "=", "!="],
    answer: "==="
  }
];
 
/* ============================================
   2. Les elements du DOM
   ============================================ */
const quizZone = document.getElementById("quiz-zone");
const resultZone = document.getElementById("result-zone");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const resultScore = document.getElementById("result-score");
const resultMessage = document.getElementById("result-message");
 
/* ============================================
   3. L'etat du quiz
   ============================================ */
let currentIndex = 0;
let score = 0;
 
/* ============================================
   4. Afficher une question
   ============================================ */
function showQuestion() {
  const current = questions[currentIndex];
 
  // On vide les anciennes options et l'ancien feedback
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.disabled = true;
 
  // Texte de la question
  questionEl.textContent = current.question;
 
  // Progression
  progressText.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  progressBar.style.width = `${(currentIndex / questions.length) * 100}%`;
 
  // On cree un bouton par option, dans une boucle
  current.options.forEach(function (option) {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = option;
    btn.addEventListener("click", function () {
      checkAnswer(btn, option, current.answer);
    });
    optionsEl.appendChild(btn);
  });
}
 
/* ============================================
   5. Verifier la reponse
   ============================================ */
function checkAnswer(clickedBtn, selected, correct) {
  const allButtons = optionsEl.querySelectorAll(".option");
 
  // On desactive tous les boutons pour eviter un second clic
  allButtons.forEach(function (btn) {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("is-correct");
    }
  });
 
  if (selected === correct) {
    score++;
    feedbackEl.textContent = "Bonne reponse";
    feedbackEl.classList.add("is-correct");
  } else {
    clickedBtn.classList.add("is-wrong");
    feedbackEl.textContent = `Incorrect. La bonne reponse est ${correct}`;
    feedbackEl.classList.add("is-wrong");
  }
 
  nextBtn.disabled = false;
}
 
/* ============================================
   6. Question suivante
   ============================================ */
nextBtn.addEventListener("click", function () {
  currentIndex++;
 
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});
 
/* ============================================
   7. Ecran final
   ============================================ */
function showResult() {
  quizZone.classList.add("is-hidden");
  resultZone.classList.remove("is-hidden");
 
  resultScore.textContent = `${score} / ${questions.length}`;
 
  const percent = Math.round((score / questions.length) * 100);
  if (percent === 100) {
    resultMessage.textContent = "Sans faute, tes bases sont solides.";
  } else if (percent >= 60) {
    resultMessage.textContent = `${percent} % de reussite. Encore un effort sur les details.`;
  } else {
    resultMessage.textContent = `${percent} % de reussite. Revois les bases et retente.`;
  }
}
 
/* ============================================
   8. Recommencer
   ============================================ */
restartBtn.addEventListener("click", function () {
  currentIndex = 0;
  score = 0;
  resultZone.classList.add("is-hidden");
  quizZone.classList.remove("is-hidden");
  showQuestion();
});
 
/* ============================================
   9. Demarrage
   ============================================ */
showQuestion();
 