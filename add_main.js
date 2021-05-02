const problemElement = document.querySelector(".problem")
const form = document.querySelector("#our-form")
const field = document.querySelector("#our-field")
const pointsNeeded = document.querySelector('#points-needed')
const mistakesAllowed = document.querySelector('#mistakes-allowed')
const progressBar = document.querySelector('.progress-inner')
const endMessage = document.querySelector('#end-message')
const resetButton = document.querySelector('#reset-button')


let state = {
    score: 0,
    wrongAnswers: 0,
}

function updateProblem() {
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.num1} ${state.currentProblem.operator} ${state.currentProblem.num2}`
    field.value = ''
    field.focus()
}

updateProblem()


function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
    return {
        num1: generateNumber(10),
        num2: generateNumber(10),
        operator: ["+", "-", "x"][generateNumber(2)]
    }
}

form.addEventListener('submit', handlesubmit)

function handlesubmit(e) {
    e.preventDefault()

    let correctAnswer
    const p = state.currentProblem
    if (p.operator === "+") {
        correctAnswer = p.num1 + p.num2
    }
    if (p.operator === "-") {
        correctAnswer = p.num1 - p.num2
    }
    if (p.operator === "x") {
        correctAnswer = p.num1 * p.num2
    }

    if (parseInt(field.value, 10) === correctAnswer) {
        state.score++
        pointsNeeded.textContent = 10 - state.score
        updateProblem()
        renderProgressBar()
    } else {
        state.wrongAnswers++
        mistakesAllowed.textContent = 2 - state.wrongAnswers
        problemElement.classList.add('animate-wrong')
        setTimeout(() => problemElement.classList.remove('animate-wrong'), 331)
    }

    checkLogic()
}

function checkLogic() {
    // if you won
    if (state.score === 10) {
        endMessage.textContent = 'You won!'
        document.body.classList.add('overlay-is-open')
        setTimeout(() => resetButton.focus(), .331)
    }
    // if you lost
    if (state.wrongAnswers === 3) {
        endMessage.textContent = 'You lost!'
        document.body.classList.add("overlay-is-open")
        setTimeout(() => resetButton.focus(), 331)
    }
    resetButton.addEventListener('click', resetGame)

    function resetGame() {        
        document.body.classList.remove("overlay-is-open")
        updateProblem()
        state.score = 0
        state.wrongAnswers = 0
        pointsNeeded.textContent = 10
        mistakesAllowed.textContent = 2
        renderProgressBar()
    }
}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score / 10})`
}