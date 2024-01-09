
const startButton = document.getElementById('start-btn');

const nextButton = document.getElementById('next-btn');

const questionsContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');

const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex; 



// Event Listener Click
startButton.addEventListener('click', startGame);
    //add event of click to button and increase currentQuestion by 1 (++)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

//FUNCTIONS
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionsContainerElement.classList.remove('hide');
  setNextQuestion()
}

function setNextQuestion() {
  //resetState - resets questions and answers back to default state every time we set a new questions
  resetState() 
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question

  //loop through the answers for the questions so they show the answer options
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

//resets the question and answers back to default state
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

//Action for when you select your answer
function selectAnswer(e) {
  //e.target just means whatever we clicked on
  const selectedButton = e.target

  //check if selected button is correct or not
  const correct = selectedButton.dataset.correct

  //set status class of body
  setStatusClass(document.body, correct)

  //loop through all other buttons and set the class for them.  Converting to an array using Array.from().  Then we us a for each to loop for each button to set the status for them
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
  //
}

//create function for setStatusClass with parameters of element and correct
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if(correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


//QUESTIONS FOR THE QUIZ APP
//Remember array ( use square brackets []) holds multiple objects which can contain arrays inside of them
const questions = [
  //object (use curly brackets{} ) in the array is the questions
  {
    question: 'What is 2 + 2?',
    //here is the array for multiple choice
    answers: [
      // here are the objects with contain items
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    //here is the array for multiple choice
    answers: [
      // here are the objects with contain items
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Coding Phase', correct: true },
      { text: 'Dev Ed', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    //here is the array for multiple choice
    answers: [
      // here are the objects with contain items
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um, no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 4?',
    //here is the array for multiple choice
    answers: [
      // here are the objects with contain items
      { text: '4', correct: false },
      { text: '16', correct: true }
    ]
  }
]