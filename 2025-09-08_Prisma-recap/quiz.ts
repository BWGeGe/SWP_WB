let questionIndex = 0;
let data: any = {};

window.onload = () => {
  const dataStr = sessionStorage.getItem("quizData");
  if (dataStr) {
    data = JSON.parse(dataStr);
    loadQuestion();
  } else {
    alert("No quiz data found.");
  }
};

function loadQuestion() {
  const currentQuestion = data.results[questionIndex];

  // Update question text (the first <h2> inside #question-template)
  const questionTemplate = document.getElementById("question-template")!;
  const questionText = questionTemplate.querySelector("h2")!;
  questionText.textContent = currentQuestion.question;

  // Combine and shuffle answers
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  allAnswers.sort(() => Math.random() - 0.5);

  // Update answer divs and radio inputs
  for (let i = 0; i < 4; i++) {
    const answerDiv = document.getElementById(`answer${i}`)!;
    const radioInput = document.getElementById(`radio${i}`) as HTMLInputElement;

    answerDiv.textContent = allAnswers[i];
    radioInput.value = allAnswers[i];
    radioInput.checked = false; // reset selection on new question
  }

  // Update total question count (fix id typo)
  const allQuestionsCount = document.getElementById("allQuestionsCount")!;
  allQuestionsCount.textContent = `${questionIndex + 1} / ${data.results.length}`;
}
