import "./styles.css";
import { createProject } from "./createProjects.js";



const projectBtn = document.querySelector("#createProj");
const projectSection = document.querySelector(".projectSection");
const taskBtn = document.querySelector("#add-task");
const taskSection = document.querySelector(".taskSection");
const projectCloseBtn = document.querySelector(".projectSection-heading > svg");
const taskCloseBtn = document.querySelector(".taskSection-heading > svg");
const titleForm = document.querySelector(".titleForm");
const projectsTabDiv = document.querySelector(".projectsTab");


projectBtn.addEventListener("click", () =>{
    projectSection.style.display = "flex";
})

taskBtn.addEventListener("click", () =>{
    taskSection.style.display = "flex";
})


titleForm.addEventListener("submit", event =>{
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const projects = document.createElement("p");
    projects.textContent = `#${title}`;
    projectsTabDiv.appendChild(projects);
    document.querySelector("#title").value = '';
    projectSection.style.display = "none";
})

projectCloseBtn.addEventListener("click", ()=>{
    projectSection.style.display = "none";  
})

taskCloseBtn.addEventListener("click", ()=>{
    taskSection.style.display = "none";
})





// const home = createProject("Home");

// home.addToDo("Laundry","All to do works related to home", "10/09/2025", "medium");
// home.addToDo("Dishes","All to do works related to home", "10/09/2025", "medium");

// const office = createProject("Office");

// office.addToDo("Papers","All to do works related to office", "10/09/2025", "medium");
// console.log(home);
// console.log(office);