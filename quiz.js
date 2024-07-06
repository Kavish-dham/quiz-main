var result = 0;
window.localStorage.setItem("result", 0);

const quizAlgo = async () => {
  let questionNumber = 0;
  var category = window.localStorage.getItem("category") || "all";
  var difficulty = window.localStorage.getItem("difficulty") || "easy";
  let loading = true;
  let url;

  if (category === "all") {
    url = `https://the-trivia-api.com/v2/questions?difficulties=${difficulty}`;
  } else {
    url = `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}`;
  }

  try {
    const response = await fetch(url);
    const resJson = await response.json();
    const numberDiv = document.getElementById("question-number");
    const questionDiv = document.getElementById("question");
    const optionsDiv = document.getElementsByClassName("option");
    const wrapper = document.getElementById("option-wrapper");
    const nextQuestionBtn = document.getElementById("next")

    const addOptionListeners = () => {
      for (let i = 0; i < 4; i++) {
        optionsDiv[i].addEventListener("click", () => {
          const index = Number(numberDiv.innerHTML);
          if (resJson[index - 1].correctAnswer == optionsDiv[i].innerHTML) {
            optionsDiv[i].style.backgroundColor = "green";
            optionsDiv[i].style.color = "white";
            wrapper.style.pointerEvents = "none";
            result++;
            window.localStorage.setItem("result", result);
            nextQuestionBtn.style.pointerEvents = "auto";
            return;
          } else {
            optionsDiv[i].style.backgroundColor = "red";
            optionsDiv[i].style.color = "white";
            result--;
            window.localStorage.setItem("result", result);
            for (let j = 0; j < 4; j++) {
              if (optionsDiv[j].innerHTML == resJson[index - 1].correctAnswer) {
                optionsDiv[j].style.backgroundColor = "green";
                optionsDiv[j].style.color = "white";
                break;
              }
            }
            wrapper.style.pointerEvents = "none";
            nextQuestionBtn.style.pointerEvents = "auto";
            return;
          }
        });
      }
    };
    addOptionListeners();

    const nextQuestion = (questionNumber) => {
      if (questionNumber < 10) {
        numberDiv.innerHTML = `${questionNumber + 1}`;
        questionDiv.innerHTML = resJson[questionNumber].question.text;

        for (let i = 0; i < 4; i++) {
          optionsDiv[i].style.backgroundColor = "rgba(255,255,255, 0.75)";
          optionsDiv[i].style.color = "rgb(71,85,105)";
        }
        for (let i = 0; i < 4; i++) {
          if (Math.random() > 0.5 || i == 3) {
            optionsDiv[i].innerHTML = resJson[questionNumber].correctAnswer;
            for (let j = i; j + 1 < 4; j++) {
              optionsDiv[j + 1].innerHTML =
                resJson[questionNumber].incorrectAnswers[j];
            }
            break;
          } else {
            optionsDiv[i].innerHTML =
              resJson[questionNumber].incorrectAnswers[i];
          }
        }

        wrapper.style.pointerEvents = "auto";
        nextQuestionBtn.style.pointerEvents = "none";
      } else {
        window.location.href = "/result.html"
      }

      if (questionNumber === 9) {
        nextQuestionBtn.children[0].innerHTML = "Submit Quiz";
      }
    };

    nextQuestion(questionNumber);

    nextQuestionBtn.addEventListener("click", () => {
      questionNumber++;
      nextQuestion(questionNumber);
    });

    document.getElementById("skip").addEventListener("click", () => {
      wrapper.style.pointerEvents = "none";
      for (let i = 0; i < 4; i++) {
        const index = Number(numberDiv.innerHTML);
        if (resJson[index - 1].correctAnswer == optionsDiv[i].innerHTML) {
          optionsDiv[i].style.backgroundColor = "green";
          optionsDiv[i].style.color = "white";
        }
      }
      nextQuestionBtn.style.pointerEvents = "auto";
    });
  } catch (error) {
    console.error("Error fetching quiz data");
  }
};

quizAlgo();