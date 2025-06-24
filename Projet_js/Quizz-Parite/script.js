const form = document.querySelector(".form-quizz");
const questionsContainer = document.getElementById("questions-container");
const titreResultat = document.querySelector(".resultats h2");
const noteResultat = document.querySelector(".note");
const aideResultat = document.querySelector(".aide");
const retryButton = document.getElementById("retry-button");

// Pool of questions and answers
const questionPool = [
    {
        question: "Quelle est la capitale de la France ?",
        answers: ["Paris", "Lyon", "Marseille"],
        correctAnswer: "a"
    },
    {
        question: "Quelle est la capitale de l'Italie ?",
        answers: ["Rome", "Milan", "Naples"],
        correctAnswer: "a"
    },
    {
        question: "Quelle est la capitale de l'Espagne ?",
        answers: ["Barcelone", "Madrid", "Valence"],
        correctAnswer: "b"
    },
    {
        question: "Quelle est la capitale de l'Allemagne ?",
        answers: ["Berlin", "Munich", "Hambourg"],
        correctAnswer: "a"
    },
    {
        question: "Quelle est la capitale du Royaume-Uni ?",
        answers: ["Manchester", "Londres", "Liverpool"],
        correctAnswer: "b"
    },
    {
        question: "Quelle est la capitale du Canada ?",
        answers: ["Toronto", "Ottawa", "Montréal"],
        correctAnswer: "b"
    },
    {
        question: "Quelle est la capitale du Japon ?",
        answers: ["Osaka", "Tokyo", "Kyoto"],
        correctAnswer: "b"
    },
    {
        question: "Quelle est la capitale de l'Australie ?",
        answers: ["Sydney", "Canberra", "Melbourne"],
        correctAnswer: "b"
    },
    {
        question: "Quelle est la capitale du Brésil ?",
        answers: ["Rio de Janeiro", "Brasilia", "São Paulo"],
        correctAnswer: "b"
    },
    {
        question: "Quelle est la capitale de l'Inde ?",
        answers: ["Mumbai", "New Delhi", "Bangalore"],
        correctAnswer: "b"
    }
];

let currentQuestions = []; // Stores the current set of questions
let reponses = []; // Stores the correct answers for the current quiz

// Function to generate a random set of 5 questions
function generateQuestions() {
    // Shuffle the question pool and select the first 5 questions
    const shuffledQuestions = questionPool.sort(() => Math.random() - 0.5);
    currentQuestions = shuffledQuestions.slice(0, 5);
    reponses = currentQuestions.map(q => q.correctAnswer);

    // Clear the questions container
    questionsContainer.innerHTML = "";

    // Generate the HTML for the selected questions
    currentQuestions.forEach((question, index) => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question-block");

        const questionText = document.createElement("p");
        questionText.innerText = `${index + 1}. ${question.question}`;
        questionBlock.appendChild(questionText);

        question.answers.forEach((answer, i) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `q${index + 1}`;
            input.value = String.fromCharCode(97 + i); // a, b, c, etc.
            label.appendChild(input);
            label.appendChild(document.createTextNode(` ${answer}`));
            questionBlock.appendChild(label);
        });

        questionsContainer.appendChild(questionBlock);
    });
}

// Function to check the answers
function verifFunc(tabResultats) {
    const verifTableau = [];
    for (let a = 0; a < 5; a++) {
        verifTableau.push(tabResultats[a] === reponses[a]);
    }
    afficherResultats(verifTableau);
    couleursFonction(verifTableau);
}

// Function to display the results
function afficherResultats(tabCheck) {
    const nbFautes = tabCheck.filter(el => el !== true).length;

    switch (nbFautes) {
        case 0:
            titreResultat.innerText = "Bravo, c'est un sans fautes !";
            aideResultat.innerText = "";
            noteResultat.innerText = "5/5";
            break;
        case 1:
            titreResultat.innerText = "Vous y êtes presque !";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges puis validez !";
            noteResultat.innerText = "4/5";
            break;
        case 2:
            titreResultat.innerText = "Encore un effort";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges puis validez !";
            noteResultat.innerText = "3/5";
            break;
        case 3:
            titreResultat.innerText = "Il reste quelques erreurs";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges puis validez !";
            noteResultat.innerText = "2/5";
            break;
        case 4:
            titreResultat.innerText = "Peut mieux faire !";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges puis validez !";
            noteResultat.innerText = "1/5";
            break;
        case 5:
            titreResultat.innerText = "Peut mieux faire !";
            aideResultat.innerText = "Retentez une autre réponse dans les cases rouges puis validez !";
            noteResultat.innerText = "0/5";
            break;
        default:
            titreResultat.innerText = "Oops, cas inattendu !";
    }
}

// Function to change the background color of questions based on correctness
function couleursFonction(tabValide) {
    const toutesLesQuestions = document.querySelectorAll(".question-block");
    for (let j = 0; j < tabValide.length; j++) {
        if (tabValide[j] === true) {
            toutesLesQuestions[j].style.background = "lightgreen";
        } else {
            toutesLesQuestions[j].style.background = "#ffbbbb";
            toutesLesQuestions[j].classList.add("echec");
            setTimeout(() => {
                toutesLesQuestions[j].classList.remove("echec");
            }, 500);
        }
    }
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const tableauResultats = [];
    for (let i = 1; i <= 5; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        tableauResultats.push(selectedAnswer ? selectedAnswer.value : null);
    }

    verifFunc(tableauResultats);
});

// Event listener for the retry button
retryButton.addEventListener("click", () => {
    generateQuestions(); // Generate new questions
    titreResultat.innerText = "";
    noteResultat.innerText = "";
    aideResultat.innerText = "";
    document.querySelectorAll(".question-block").forEach(block => {
        block.style.background = "white";
    });
});

// Generate questions when the page loads
generateQuestions();