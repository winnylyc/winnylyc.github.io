let topics = ['all', 'biology', 'capitalization', 'chemistry', 'civics', 'culture', 'earth-science', 'economics', 'figurative-language', 'geography', 'global-studies', 'grammar', 'literacy-in-science', 'phonological-awareness', 'physics', 'pronouns', 'punctuation', 'reading-comprehension', 'reference-skills', 'science-and-engineering-practices', 'units-and-measurement', 'us-history', 'verbs', 'vocabulary', 'word-study', 'world-history', 'writing-strategies'];
let grades = ['all', 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7', 'grade8', 'grade9', 'grade10', 'grade11', 'grade12'];
let subjects = ['all', 'natural science', 'social science', 'language science'];
let has_img = ['both', 'yes', 'no'];
let has_hint = ['both', 'yes', 'no'];
let has_lec = ['both', 'yes', 'no'];
let has_sol = ['both', 'yes', 'no'];

let optbtn = document.getElementsByClassName("optionsbtn")[0];
let closebtn = document.getElementsByClassName("closebtn")[0];
let optionpanel = document.getElementById("option-panel");
let body = document.getElementById("content-body");
let display = document.getElementById("display");
let optboxes = document.getElementsByClassName("optbox");
let opt_dds = document.getElementsByClassName("opt-dd");
let filter_submit = document.getElementById("filter-submit");

let topic_dd = make_dropdown("Choose a topic:", topics, "topic-dd");
let grade_dd = make_dropdown("Choose a grade:", grades, "grade-dd");
let subject_dd = make_dropdown("Choose a subject:", subjects, "subject-dd");
let img_dd = make_dropdown("Question with image context?", has_img, "img-dd");
let hint_dd = make_dropdown("Question with text context?", has_hint, "hint-dd");
let lec_dd = make_dropdown("Question with lecture?", has_lec, "lec-dd", 1);
let sol_dd = make_dropdown("Question with solution?", has_sol, "sol-dd", 1);

optboxes[0].innerHTML += subject_dd;
optboxes[0].innerHTML += topic_dd;
optboxes[0].innerHTML += grade_dd;
optboxes[0].innerHTML += img_dd;
optboxes[0].innerHTML += hint_dd;
optboxes[0].innerHTML += lec_dd;
optboxes[0].innerHTML += sol_dd;

// data filters
let filters = {};

optbtn.addEventListener("click", openNav);
closebtn.addEventListener("click", closeNav);


for (each of opt_dds) {
    each.addEventListener("change", change_filters);
}
filter_submit.addEventListener("click", filter_data);

// display the page
filter_data();

function openNav() {
    optionpanel.style.width = "20vw";
    display.style.width = "60vw";
    for (each of optionpanel.children) {
        each.style.display = "block";
    }
}

function closeNav() {
    optionpanel.style.width = "0";
    display.style.width = "80vw";
    for (each of optionpanel.children) {
        each.style.display = "none";
    }
}

function change_filters(e) {
    filters.topic = document.getElementById("topic-dd").value;
    filters.grade = document.getElementById("grade-dd").value;
    filters.subject = document.getElementById("subject-dd").value;
    filters.has_img = document.getElementById("img-dd").value;
    filters.has_hint = document.getElementById("hint-dd").value;
    filters.has_sol = document.getElementById("sol-dd").value;
    filters.has_lec = document.getElementById("lec-dd").value;
    // console.log(filters);
}

// draw the page
function create_page(d) {
    if (d.length === 0) {
        body.innerHTML = "<p>No example satisfies all the filters.</p>";
    } else {
        col1 = create_col(d.slice(0, d.length / 2));
        col2 = create_col(d.slice(d.length / 2));
        body.innerHTML = col1 + col2;
    }
    reflow(body);
    console.log("reflowed");
}

function create_col(data) {
    res = [];
    for (each of data) {
        res.push(create_example(each));
    }
    return `<div class="display-col"> ${res.join("")} </div>`;
}

// data is an object with the following attr.
// hint: textual hint
// path: link/path to the image
// question: question text
// choices: an array of choices
// answer: answer to the question
// lecture: lecture text
// solution: solution text
function create_example(data) {
    let question = make_qt(data.question);

    let hint = make_hint(data.hint)
    let image = "";
    if (data.image !== -1)
        image = make_img(data.path);

    let choices = make_choices(data.choices);
    let answer = make_answer(data.choices[data.answer]);
    lecture = make_lecture(data.lecture);
    solution = make_solution(data.solution);
    html = make_box([question, hint, image, choices, answer, lecture, solution]) + "<hr/>";

    return html;
}

// creates a div with question text in it
function make_qt(text) {
    let html = `
            <p><b>Question </b></p>
            <p class="question-txt">${text}</p>
    `;
    return html;
}

function make_hint(hint) {
    if (hint === null) return "";
    let html = `<p><b>Context </b></p><p class="hint-txt">${hint}</p>`;
    return html;
}

function make_img(path) {
    if (path === null) return "";
    let html = `<img src="${path}" alt="example image" class="question-img" />`;
    return html;
}

function make_box(contents, cls = "") {
    if (contents.join("").length === 0) return "";
    let html = `
        <div class="box ${cls}"> 
            ${contents.join(" ")}
        </div>
    `;
    return html;
}

function make_choices(choices) {
    let temp = "";
    let len = 0;
    for (each of choices) {
        let html = make_choice(each);
        temp += html;
        len += each.length;
    }
    let html = "";
    if (len < 60)
        html = `<p><b>Choices </b></p><div class="choices">${temp}</div>`;
    else
        html = `<p><b>Choices </b></p><div class="choices-vertical">${temp}</div>`;
    return html;
}
function make_choice(choice) {
    let html = `<div class="choice-txt">${choice}</div>`;
    return html;
}

function make_answer(answer) {
    let html = `<p><b>Answer </b></p><p class="answer-txt">${answer}</p>`;
    return html;
}

function make_lecture(lecture) {
    if (lecture === null) return "";
    let html = `<p><b>Lecture </b></p><p class="lecture"> ${lecture}</p>`;
    return html;
}

function make_solution(solution) {
    if (solution === null) return "";
    let html = `<p><b>Solution </b></p><p class="solution"> ${solution}</p>`;
    return html;
}

function make_dropdown(label, options, id, default_ind = 0) {
    let html = "";
    for (let i = 0; i < options.length; i++) {
        if (i === default_ind)
            html += `<option value="${options[i]}" selected> ${options[i]} </option>`;
        else
            html += `<option value="${options[i]}"> ${options[i]} </option>`;
    }
    html = `<label class="dd-label">${label} <select id="${id}" class="opt-dd"> ${html} </select> </label><br/>`;
    return html;
}

function filter_data() {
    change_filters();
    res = problem_data;
    if (filters.subject !== "all")
        res = res.filter(e => e.subject === filters.subject);
    if (filters.grade !== "all")
        res = res.filter(e => e.grade === filters.grade);
    if (filters.topic !== "all")
        res = res.filter(e => e.topic === filters.topic);
    if (filters.has_img !== "both") {
        res = res.filter((e) => {
            if (filters.has_img === "yes")
                return e.image !== null;
            else
                return e.image === null;
        });
    }
    if (filters.has_hint !== "both") {
        res = res.filter((e) => {
            if (filters.has_hint === "yes")
                return e.hint !== null;
            else
                return e.hint === null;
        });
    }
    if (filters.has_lec !== "both") {
        res = res.filter((e) => {
            if (filters.has_lec === "yes")
                return e.lecture !== null;
            else
                return e.lecture === null;
        });
    }
    if (filters.has_sol !== "both") {
        res = res.filter((e) => {
            if (filters.has_sol === "yes")
                return e.solution !== null;
            else
                return e.solution === null;
        });
    }
    d = _.sample(res, Math.min(10, res.length));
    for (each of d) {
        console.log(d);
    }
    create_page(d);
}

// force the browser to reflow
function reflow(elt) {
    elt.offsetHeight;
}
