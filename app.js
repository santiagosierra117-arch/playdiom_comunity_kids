// ===============================
// ENGLISH QUEST - APP
// ===============================

// Seleccionamos los botones de las estudiantes
const studentButtons = document.querySelectorAll(".student-button");

// Cuando una estudiante elige su nombre
studentButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const studentName = button.dataset.name;

        showMission(studentName);
    });
});


// ===============================
// MOSTRAR LA MISIÓN
// ===============================

function showMission(studentName) {

    document.body.innerHTML = `
        <main class="app-container">

            <section class="mission-card">

                <div class="mission-icon">🎯</div>

                <p class="mission-label">TODAY'S ENGLISH MISSION</p>

                <h1>
                    Hello, ${studentName}! 👋
                </h1>

                <h2>
                    To Be Adventure
                </h2>

                <p class="mission-description">
                    Hoy vamos a practicar:
                </p>

                <div class="grammar-pills">
                    <span>I am</span>
                    <span>She is</span>
                    <span>They are</span>
                </div>

                <div class="mission-info">

                    <div class="info-item">
                        <span>⏱️</span>
                        <strong>10–15 min</strong>
                    </div>

                    <div class="info-item">
                        <span>⭐</span>
                        <strong>15 Stars</strong>
                    </div>

                </div>

                <button class="start-button" onclick="startMission()">
                    START MISSION
                    <span>→</span>
                </button>

            </section>

        </main>
    `;
}


// ===============================
// COMENZAR MISIÓN
// ===============================

// ===============================
// SISTEMA DE ACTIVIDADES
// ===============================

let currentActivity = buildItActivity;
let currentExercise = 0;
let selectedWords = [];
let placedWords = [];
let activityStars = 0;


// ===============================
// COMENZAR ACTIVIDAD
// ===============================

function startMission() {

    currentActivity = buildItActivity;
    currentExercise = 0;
    activityStars = 0;

    showBuildIt();
}


// ===============================
// MOSTRAR BUILD IT
// ===============================

function showBuildIt() {

    const exercise = currentActivity.exercises[currentExercise];

    const shuffledWords = [...exercise.sentence].sort(
        () => Math.random() - 0.5
    );

    selectedWords = [];
    placedWords = new Array(exercise.sentence.length).fill(null);

    document.body.innerHTML = `
        <main class="app-container">

            <section class="activity-card">

                <div class="activity-header">

                    <div>
                        <p class="mission-label">TODAY'S ENGLISH MISSION</p>
                        <h1>Build It 🧩</h1>
                    </div>

                    <div class="activity-stars">
                        ⭐ ${activityStars}
                    </div>

                </div>


                <div class="activity-progress">
                    Challenge ${currentExercise + 1} / ${currentActivity.exercises.length}
                </div>


                <p class="activity-instruction">
                    Toca una palabra y después toca el lugar donde quieres ponerla.
                </p>


                <div class="hint-box">

                    <button class="hint-title" onclick="toggleHint()">
                        💡 HELP
                    </button>

                    <div id="hint-content" class="hint-content">
                        <strong>${currentActivity.hint.formula}</strong>
                        <p>${currentActivity.hint.example}</p>
                    </div>

                </div>


                <div class="sentence-area">

                    <p class="sentence-label">
                        Build the sentence:
                    </p>

                    <div id="answer-area" class="answer-area">
                        ${placedWords.map((word, index) => `
                            <button
                                class="answer-slot"
                                onclick="selectSlot(${index})"
                            >
                                ${word ? word.text : "+"}
                            </button>
                        `).join("")}
                    </div>

                </div>


                <div class="word-bank">

                    <p class="sentence-label">
                        Words:
                    </p>

                    <div id="word-bank-container">
                        ${shuffledWords.map((word, index) => `
                            <button
                                class="word-button"
                                id="word-${index}"
                                onclick="selectWord(${index}, '${word}')"
                            >
                                ${word}
                            </button>
                        `).join("")}
                    </div>

                </div>


                <div id="feedback"></div>


                <button
                    class="check-button"
                    onclick="checkAnswer()"
                >
                    CHECK ANSWER
                </button>

            </section>

        </main>
    `;

    window.currentWords = shuffledWords;
}


// ===============================
// SELECCIONAR UNA PALABRA
// ===============================

function selectWord(index, word) {

    document.querySelectorAll(".word-button").forEach(button => {
        button.classList.remove("selected");
    });

    const button = document.getElementById(`word-${index}`);

    if (selectedWords.length > 0 && selectedWords[0].index === index) {

        selectedWords = [];

        button.classList.remove("selected");

        return;
    }

    selectedWords = [{
        index: index,
        word: word
    }];

    button.classList.add("selected");
}


// ===============================
// SELECCIONAR POSICIÓN
// ===============================

function selectSlot(slotIndex) {

    if (selectedWords.length === 0) {
        return;
    }

    const selected = selectedWords[0];

    // Si el espacio está ocupado, intercambiamos las palabras
    if (placedWords[slotIndex]) {

        const previousWord = placedWords[slotIndex];

        placedWords[slotIndex] = {
            text: selected.word,
            index: selected.index
        };

        selectedWords = [{
            index: previousWord.index,
            word: previousWord.text
        }];

    } else {

        placedWords[slotIndex] = {
            text: selected.word,
            index: selected.index
        };

        selectedWords = [];

    }

    renderAnswerArea();
    updateWordSelection();
}


// ===============================
// ACTUALIZAR ÁREA DE RESPUESTA
// ===============================

function renderAnswerArea() {

    const answerArea = document.getElementById("answer-area");

    answerArea.innerHTML = placedWords.map((word, index) => `
        <button
            class="answer-slot ${word ? "filled" : ""}"
            onclick="selectPlacedWord(${index})"
        >
            ${word ? word.text : "+"}
        </button>
    `).join("");
}


// ===============================
// SELECCIONAR PALABRA YA PUESTA
// ===============================

function selectPlacedWord(index) {

    if (!placedWords[index]) {
        return;
    }

    const word = placedWords[index];

    selectedWords = [{
        index: word.index,
        word: word.text
    }];

    document.querySelectorAll(".answer-slot").forEach(button => {
        button.classList.remove("selected");
    });

    const slots = document.querySelectorAll(".answer-slot");

    slots[index].classList.add("selected");
}


// ===============================
// ACTUALIZAR SELECCIÓN VISUAL
// ===============================

function updateWordSelection() {

    document.querySelectorAll(".word-button").forEach(button => {
        button.classList.remove("selected");
    });

    if (selectedWords.length === 0) {
        return;
    }

    const selected = selectedWords[0];

    const wordButton = document.getElementById(
        `word-${selected.index}`
    );

    if (wordButton) {
        wordButton.classList.add("selected");
    }
}


// ===============================
// COMPROBAR RESPUESTA
// ===============================

function checkAnswer() {

    const exercise = currentActivity.exercises[currentExercise];

    const feedback = document.getElementById("feedback");

    const isComplete = placedWords.every(word => word !== null);

    if (!isComplete) {

        feedback.innerHTML = `
            <div class="feedback-warning">
                💡 Almost! Completa todos los espacios antes de comprobar.
            </div>
        `;

        return;
    }


    let correctPositions = 0;

    placedWords.forEach((word, index) => {

        if (word.text === exercise.sentence[index]) {
            correctPositions++;
        }

    });


    const slots = document.querySelectorAll(".answer-slot");


    slots.forEach((slot, index) => {

        slot.classList.remove(
            "correct",
            "incorrect"
        );

        if (
            placedWords[index].text ===
            exercise.sentence[index]
        ) {

            slot.classList.add("correct");

        } else {

            slot.classList.add("incorrect");

        }

    });


    // ===============================
    // RESPUESTA CORRECTA
    // ===============================

    if (correctPositions === exercise.sentence.length) {

        activityStars += currentActivity.starsPerExercise;

        feedback.innerHTML = `
            <div class="feedback-success">
                🎉 Excellent! ¡Muy bien!<br>
                La oración está correcta.<br>
                ⭐ +${currentActivity.starsPerExercise} Stars
            </div>
        `;

        showNextButton();

        return;
    }


    // ===============================
    // RESPUESTA INCORRECTA
    // ===============================

    feedback.innerHTML = `
        <div class="feedback-error">
            💡 Almost! Las palabras rojas están
            en una posición incorrecta.
            <br><br>
            Toca una palabra para cambiarla
            y vuelve a intentarlo.
        </div>
    `;
}


// ===============================
// SIGUIENTE RETO
// ===============================

function showNextButton() {

    const existingButton = document.querySelector(".next-button");

    if (existingButton) {
        return;
    }

    const button = document.createElement("button");

    button.className = "next-button";

    button.innerHTML = `
        NEXT →
    `;

    button.onclick = nextExercise;

    document.querySelector(".activity-card").appendChild(button);
}


// ===============================
// SIGUIENTE EJERCICIO
// ===============================

function nextExercise() {

    currentExercise++;

    if (
        currentExercise >=
        currentActivity.exercises.length
    ) {

        showActivityComplete();

        return;
    }

    showBuildIt();
}


// ===============================
// ACTIVIDAD COMPLETADA
// ===============================

function showActivityComplete() {

    document.body.innerHTML = `

        <main class="app-container">

            <section class="complete-card">

                <div class="complete-icon">
                    🏆
                </div>

                <p class="mission-label">
                    BUILD IT COMPLETE
                </p>

                <h1>
                    Great job! 🎉
                </h1>

                <p class="mission-description">
                    ¡Completaste los 5 retos!
                </p>

                <div class="final-stars">
                    ⭐ ${activityStars} Stars
                </div>

                <button
                    class="next-button"
                    onclick="nextActivity()"
                >
                    NEXT ACTIVITY →
                </button>

            </section>

        </main>
    `;
}


// ===============================
// SIGUIENTE ACTIVIDAD
// ===============================

function nextActivity() {

    alert("🚀 Next activity coming soon!");
}


// ===============================
// MOSTRAR / OCULTAR HELP
// ===============================

function toggleHint() {

    const hint = document.getElementById("hint-content");

    if (!hint) {
        return;
    }

    hint.classList.toggle("show");
}
