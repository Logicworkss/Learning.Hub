/* ====================================
   PAGE FADE-IN ANIMATION
==================================== */

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "1";
    }, 100);
});

/* ====================================
   SLIDESHOW
==================================== */

let slideIndex = 0;

function showSlides() {

    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";

    if (dots.length > 0) {
        dots[slideIndex - 1].classList.add("active");
    }

    setTimeout(showSlides, 5000);
}

document.addEventListener("DOMContentLoaded", showSlides);

/* Manual controls */
function changeSlide(n) {

    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    slideIndex += n;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";

    if (dots.length > 0) {
        dots[slideIndex - 1].classList.add("active");
    }
}

/* ====================================
   FLASHCARDS
==================================== */

function flipCard(card) {
    card.classList.toggle("flipped");
}

/* ====================================
   QUIZ SYSTEM (FIXED FOR YOUR 5 SUBJECTS)
==================================== */
function calculateQuiz(){

    let score = 0;
    let weakSubjects = [];

    // ================= MATHEMATICS =================
    let mathScore = 0;
    if(document.querySelector('input[name="math1"]:checked')?.value === "correct") mathScore++;
    if(document.querySelector('input[name="math2"]:checked')?.value === "correct") mathScore++;
    if(document.querySelector('input[name="math3"]:checked')?.value === "correct") mathScore++;
    if(mathScore < 2) weakSubjects.push("Mathematics");
    score += mathScore;

    // ================= ENGLISH =================
    let engScore = 0;
    if(document.querySelector('input[name="eng1"]:checked')?.value === "correct") engScore++;
    if(document.querySelector('input[name="eng2"]:checked')?.value === "correct") engScore++;
    if(document.querySelector('input[name="eng3"]:checked')?.value === "correct") engScore++;
    if(engScore < 2) weakSubjects.push("English");
    score += engScore;

    // ================= COMPUTER =================
    let compScore = 0;
    if(document.querySelector('input[name="comp1"]:checked')?.value === "correct") compScore++;
    if(document.querySelector('input[name="comp2"]:checked')?.value === "correct") compScore++;
    if(document.querySelector('input[name="comp3"]:checked')?.value === "correct") compScore++;
    if(compScore < 2) weakSubjects.push("Computer Studies");
    score += compScore;

    // ================= ACCOUNTING =================
    let accScore = 0;
    if(document.querySelector('input[name="acc1"]:checked')?.value === "correct") accScore++;
    if(document.querySelector('input[name="acc2"]:checked')?.value === "correct") accScore++;
    if(document.querySelector('input[name="acc3"]:checked')?.value === "correct") accScore++;
    if(accScore < 2) weakSubjects.push("Accounting");
    score += accScore;

    // ================= ECONOMICS =================
    let ecoScore = 0;
    if(document.querySelector('input[name="eco1"]:checked')?.value === "correct") ecoScore++;
    if(document.querySelector('input[name="eco2"]:checked')?.value === "correct") ecoScore++;
    if(document.querySelector('input[name="eco3"]:checked')?.value === "correct") ecoScore++;
    if(ecoScore < 2) weakSubjects.push("Economics");
    score += ecoScore;

    // ================= RESULT =================
    document.getElementById("quizResult").innerHTML =
        `Your Score: ${score}/15`;

    // ================= SMART RECOMMENDATION =================
    let rec = document.getElementById("recommendationText");

    if(rec){
        if(weakSubjects.length === 0){
            rec.innerHTML = "🔥 Excellent! You are strong across all 5 subjects.";
        } else {
            rec.innerHTML =
                "📚 Revise: <b>" + weakSubjects.join(", ") +
                "</b><br>Go to Resources page for past papers.";
        }
    }
}

/* Load timetable */
/* ====================================
   TIMETABLE PLANNER
==================================== */

/* ====================================
   TIMETABLE PLANNER
==================================== */

function addTimetableEntry() {

    const dayInput = document.getElementById("day");
    const subjectInput = document.getElementById("subject");
    const timeInput = document.getElementById("time");

    if (!dayInput || !subjectInput || !timeInput) {
        console.error("Timetable inputs not found.");
        return;
    }

    const day = dayInput.value.trim();
    const subject = subjectInput.value.trim();
    const time = timeInput.value.trim();

    if (day === "" || subject === "" || time === "") {
        alert("Please fill in all fields.");
        return;
    }

    let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

    timetable.push({
        day: day,
        subject: subject,
        time: time
    });

    localStorage.setItem("timetable", JSON.stringify(timetable));

    dayInput.value = "";
    subjectInput.value = "";
    timeInput.value = "";

    loadTimetable();
}

function deleteTimetableEntry(index) {

    let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

    if (index < 0 || index >= timetable.length) return;

    timetable.splice(index, 1);

    localStorage.setItem("timetable", JSON.stringify(timetable));

    loadTimetable();
}

function loadTimetable() {

    const tableBody = document.getElementById("timetableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

    timetable.forEach((entry, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.day}</td>
            <td>${entry.subject}</td>
            <td>${entry.time}</td>
            <td>
                <button class="quiz-btn"
                    onclick="deleteTimetableEntry(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadTimetable();
});

/* ====================================
   COMMUNITY POSTS (SAFE STORAGE)
==================================== */

function addPost() {

    let postInput = document.getElementById("postInput");
    let feed = document.getElementById("communityFeed");

    if (!postInput || !feed) return;

    let text = postInput.value.trim();

    if (text === "") {
        alert("Please enter a message.");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.unshift({
        content: text,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();

    postInput.value = "";
}

function displayPosts() {

    let feed = document.getElementById("communityFeed");
    if (!feed) return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    feed.innerHTML = "";

    posts.forEach(post => {

        let div = document.createElement("div");
        div.classList.add("post");

        div.innerHTML = `
            <p>${post.content}</p>
            <small>${post.date}</small>
        `;

        feed.appendChild(div);

    });
}

document.addEventListener("DOMContentLoaded", displayPosts);

/* ====================================
   BACK TO TOP BUTTON
==================================== */

window.onscroll = function () {

    let topBtn = document.getElementById("topBtn");
    if (!topBtn) return;

    if (document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* ====================================
   SUCCESS STORIES (SAFE LOOP FIX)
==================================== */

let storyIndex = 0;

function rotateStories() {

    let stories = document.querySelectorAll(".story-slide");

    if (stories.length === 0) return;

    stories.forEach(s => s.style.display = "none");

    storyIndex++;

    if (storyIndex > stories.length) {
        storyIndex = 1;
    }

    stories[storyIndex - 1].style.display = "block";

    setTimeout(rotateStories, 5000);
}

document.addEventListener("DOMContentLoaded", rotateStories);