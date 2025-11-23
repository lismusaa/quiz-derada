const quizData = [
    {question: "Jeronim De Rada ishte:", a: "Poet romantik arbëresh", b: "Poet klasik grek", c: "Shkrimtar realist shqiptar", d: "Historian italian", correct: "a"},
    {question: "Në cilin vend lindi De Rada?", a: "Tiranë", b: "Shkodër", c: "Makiej, Kalabri", d: "Prishtinë", correct: "c"},
    {question: "Cila është vepra më e njohur e tij?", a: "Lahuta e Malcis", b: "Këngët e Milosaos", c: "Bagëti e Bujqësia", d: "Skënderbeu te Kastriotëve", correct: "b"},
    {question: "Cili rrymim letrar e përfaqëson De Radën?", a: "Realizmi", b: "Simbolizmi", c: "Romantizmi", d: "Klasikja", correct: "c"},
    {question: "Cila temë është më e shpeshta në veprat e De Radës?", a: "Politika moderne", b: "Dashuria dhe atdhetaria", c: "Teknologjia", d: "Humor satirik", correct: "b"},
    {question: "“Këngë e Serafinës” është vepër...", a: "Epike filozofike", b: "Poezi romantike", c: "Tregim historik", d: "Komedi", correct: "b"},
    {question: "Në veprat e tij, natyra shërben si:", a: "Dekor pa rëndësi", b: "Pasqyrë e ndjenjave të personazhit", c: "Kritikë politike", d: "Element fantastik", correct: "b"},
    {question: "Cili motiv është i pranishëm te “Këngët e Milosaos”?", a: "Jeta në qytetet moderne", b: "Dashuria tragjike", c: "Mitologjia greke", d: "Lufta e Dytë Botërore", correct: "b"},
    {question: "Për çfarë arsye u censurua vepra “Serafina Topia”?", a: "Për temat e dashurisë", b: "Për mënyrën si përshkruante politikën e kohës", c: "Për natyrën liberale të ideve të autorit", d: "Sepse kishte gabime gjuhësore", correct: "c"},
    {question: "Romantizmi i De Radës shfaqet kryesisht përmes:", a: "Ironisë dhe kritikës shoqërore", b: "Përshkrimit të konflikteve familjare", c: "Ndjenjave të forta dhe figuracionit natyror", d: "Analizës shkencore", correct: "c"}
];

let currentQuiz = 0;
let score = 0;
let username = "";
let timer;
let timeLeft = 30;

const usernameContainer = document.getElementById("username-container");
const startBtn = document.getElementById("startBtn");
const usernameInput = document.getElementById("username");

const quizEl = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const answersEls = document.querySelectorAll(".answer");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

const leaderboardEl = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");

// Start quiz
startBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if(name === "") {
        alert("Ju lutem vendosni username!");
        return;
    }
    username = name;
    usernameContainer.classList.add("hidden");
    quizEl.classList.remove("hidden");
    loadQuiz();
    startTimer();
    updateProgress();
});

function startTimer() {
    timeLeft = 30;
    timerEl.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timer);
            showAnswerFeedback();
            setTimeout(nextQuestion, 800);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    updateProgress();
}

function deselectAnswers() {
    answersEls.forEach(answerEl => {
        answerEl.checked = false;
        const label = document.querySelector(`label[for=${answerEl.id}]`);
        label.classList.remove("correct","wrong");
    });
}

function getSelected() {
    let answer;
    answersEls.forEach(answerEl => {
        if(answerEl.checked) answer = answerEl.id;
    });
    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if(!answer) { alert("Ju lutem zgjidhni një përgjigje!"); return; }
    showAnswerFeedback();
    setTimeout(nextQuestion, 800);
});

function showAnswerFeedback() {
    const currentQuizData = quizData[currentQuiz];
    answersEls.forEach(answerEl => {
        const label = document.querySelector(`label[for=${answerEl.id}]`);
        if(answerEl.checked) {
            if(answerEl.id === currentQuizData.correct) {
                score++;
                label.classList.add("correct");
            } else {
                label.classList.add("wrong");
            }
        }
        if(answerEl.id === currentQuizData.correct) label.classList.add("correct");
    });
    clearInterval(timer);
}

function nextQuestion() {
    currentQuiz++;
    if(currentQuiz < quizData.length) {
        loadQuiz();
        resetTimer();
    } else {
        endQuiz();
    }
}

function updateProgress() {
    const percent = ((currentQuiz)/quizData.length)*100;
    progressBar.style.width = `${percent}%`;
}

function endQuiz() {
    clearInterval(timer);
    quizEl.classList.add("hidden");
    resultEl.classList.remove("hidden");
    resultEl.innerHTML = `<h2>${username}, keni përgjigjur ${score}/${quizData.length} pyetje saktë!</h2>`;
    saveScore();
    showLeaderboard();
}

function saveScore() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({name: username, score: score});
    leaderboard.sort((a,b) => b.score - a.score);
    if(leaderboard.length > 5) leaderboard = leaderboard.slice(0,5);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
    leaderboardEl.classList.remove("hidden");
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardList.innerHTML = "";
    leaderboard.forEach(entry => {
        const li = document.createElement("li");
        li.innerText = `${entry.name}: ${entry.score}/${quizData.length}`;
        leaderboardList.appendChild(li);
    });
}
