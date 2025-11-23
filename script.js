// 10 Pyetjet e kuizit
const quizData = [
    {
        question: "1. Ku dhe kur ka lindur Jeronim De Rada?",
        a: "1814, Shkodër",
        b: "1814, Makia e Kalabrisë",
        c: "1830, Tiranë",
        d: "1832, Arbëri",
        correct: "b"
    },
    {
        question: "2. Cila është vepra e tij më e njohur?",
        a: "Serafina Topia",
        b: "Këngët e Milosaos",
        c: "Çeta e Profetëve",
        d: "Skënderbeu i pafan",
        correct: "b"
    },
    {
        question: "3. Çfarë lloj vepre është “Këngët e Milosaos”?",
        a: "Roman historik",
        b: "Poemë liriko-epike",
        c: "Dramatizim",
        d: "Baladë popullore",
        correct: "b"
    },
    {
        question: "4. Në cilën gjuhë shkruante De Rada veprat e para?",
        a: "Shqip",
        b: "Italisht me elemente shqipe",
        c: "Latinisht",
        d: "Greqisht",
        correct: "b"
    },
    {
        question: "5. Cila vepër e De Radës u ndalua nga censura?",
        a: "Rapsodi e një poeme arbëreshe",
        b: "Serafina Topia",
        c: "Këngët e Milosaos",
        d: "Arbëreshët dhe Italia",
        correct: "b"
    },
    {
        question: "6. Cili ishte qëllimi kryesor i krijimtarisë së tij?",
        a: "Të argëtonte lexuesit",
        b: "Të zhvillonte letërsinë arbëreshe dhe gjuhën shqipe",
        c: "Të shkruante fantazi",
        d: "Të botonte libra fetarë",
        correct: "b"
    },
    {
        question: "7. Me çfarë merrej përveç letërsisë?",
        a: "Ishte mjek",
        b: "Ishte profesor dhe gazetar",
        c: "Ishte piktor",
        d: "Ishte ushtar",
        correct: "b"
    },
    {
        question: "8. “Serafina Topia” ka motive të…",
        a: "Luftës",
        b: "Dashurisë",
        c: "Komedisë",
        d: "Fantazisë shkencore",
        correct: "b"
    },
    {
        question: "9. Pse është i rëndësishëm për shqiptarët?",
        a: "Fitoi çmime",
        b: "Ishte udhëheqës politik",
        c: "Ruajti identitetin arbëresh dhe zhvilloi letërsinë shqipe",
        d: "Udhëtoi shumë",
        correct: "c"
    },
    {
        question: "10. Si paraqitet Shqipëria në veprat e tij?",
        a: "Si vend i varfër dhe pa vlera",
        b: "Si tokë mitike me histori dhe krenari",
        c: "Si vend i rrezikshëm",
        d: "Si vend pa tradita",
        correct: "b"
    }
];

// Elementet
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

// Ngarkon pyetjen
loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(el => el.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(el => {
        if (el.checked) {
            answer = el.id;
        }
    });
    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>Rezultati juaj: ${score} / ${quizData.length}</h2>
                <button onclick="location.reload()">Rifillo kuizin</button>
            `;
        }
    }
});
