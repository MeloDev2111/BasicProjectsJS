const numQuizzes = quizData.length;
let indexQuiz=0;
let actualQuiz = quizData[indexQuiz];
let score = 0;

submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  // check to see the answer
  const optionSelected = getSelected();
  
  if (optionSelected) {
      if (optionSelected === actualQuiz.correct) {
          score++;
      }

      indexQuiz++;
      if (indexQuiz < numQuizzes) {
        actualQuiz = quizData[indexQuiz];
        renderQuiz(actualQuiz);
      } else {
        let quiz = document.getElementById("quiz-container");
        quiz.innerHTML = `
          <h2 class="quiz-header">You answered correctly at ${score}/${numQuizzes} questions.</h2>
          <button class="btn" onclick="location.reload()">Reload</button>
          `;
      }
  }
});

function getSelected() {
  let answer = undefined;
  let optionsDOM = document.querySelectorAll(".answer");
  optionsDOM.forEach((option) => {
      if (option.checked) {
          answer = option.id;
      }
  });

  return answer;
}

function renderQuiz(quiz){
  let tittle = document.getElementById("tittle");
  tittle.innerHTML = quiz.tittle;
  renderOptionList(quiz.options);
}

function renderOptionList(options){
  let ul = document.getElementById("options-list");
  ul.innerHTML = "";

  for (let key in options){
    ul.appendChild(renderOption(key, options[key]))
  }
}

function renderOption(numOption, option){
  let li = document.createElement("li");
  li.setAttribute("class","option");

  let contenido = `<input id="${numOption}" name='answer' class='answer' type='radio'>
  <label id="${numOption}-text" for="${numOption}">${option}</label>`;

  li.innerHTML = contenido;
  return li;
}

/*INIT */
renderQuiz(actualQuiz);