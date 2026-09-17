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

function startMission() {

    alert("🚀 ¡Mission starting!");

}