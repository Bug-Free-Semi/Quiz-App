const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text : "Shark" , Correct: false},
            {text : "Blue Whale" , Correct: true},
            {text : "Elephant" , Correct: false},
            {text : "Giraffe" , Correct: false},            
        ]
    },
    {
        question: "Which is smallest Desert in the world?",
        answers: [
            {text : "Kalahari" , Correct: false},
            {text : "Gobi" , Correct: false},
            {text : "Sahara" , Correct: false},
            {text : "Antarctica" , Correct: true},            
        ]
    },
    {
        question: "Which is smallest Country in the world?",
        answers: [
            {text : "Vatican City" , Correct: true},
            {text : "Bhutan" , Correct: false},
            {text : "Nepal" , Correct: false},
            {text : "Sri Lanka" , Correct: false},            
        ]
    },
    {
        question: "Which is smallest Continent in the world?",
        answers: [
            {text : "Asia" , Correct: false},
            {text : "Australia" , Correct: true},
            {text : "Arctic" , Correct: false},
            {text : "Africa" , Correct: false},            
        ]
    }
];
const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector(".answer-btns");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button); 
        if(answer.Correct)
        {
            button.dataset.Correct = answer.Correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState()
{
   nextBtn.style.display = "none";
   while(answerBtn.firstChild){
    answerBtn.removeChild(answerBtn.firstChild);
   } 
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.Correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.Correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextBtn()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
nextBtn.addEventListener("click" , () => {
    if(currentQuestionIndex < questions.length)
    {
         handleNextBtn();
    }
    else{
        startQuiz();
    }
});
startQuiz();