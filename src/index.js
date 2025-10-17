import "./styles.css";
import { createProject } from "./createProjects.js";
import { dummyProject } from "./defaultProjects.js";



const projectBtn = document.querySelector("#createProj");
const projectSection = document.querySelector(".projectSection");
const taskBtn = document.querySelector("#add-task");
const taskSection = document.querySelector(".taskSection");
const projectCloseBtn = document.querySelector(".projectSection-heading > svg");
const taskCloseBtn = document.querySelector(".taskSection-heading > svg");
const titleForm = document.querySelector(".titleForm");
const taskForm = document.querySelector(".taskForm");
const projectsTabDiv = document.querySelector(".projectsTab");
const taskSectionDiv = document.querySelector(".task-section");
const heroHeading = document.querySelector(".hero-heading");

let currentProject = '';
let projectsArr = [];




if(projectsArr.length == 0){
    projectsArr.push(dummyProject);
    currentProject = dummyProject;
    addProjects(dummyProject);
    checkTask();
    heroHeading.textContent = `${currentProject.projectName}`;
}

projectBtn.addEventListener("click", () =>{
    projectSection.style.display = "flex";
})

taskBtn.addEventListener("click", () =>{
    taskSection.style.display = "flex";
})
function addProjects(name){
    const projects = document.createElement("p");
    projects.classList.add("projects");
    projects.dataset.id = `${name.uuid}`;
    projects.textContent = `#${name.projectName}`;
    projectsTabDiv.appendChild(projects);
}

titleForm.addEventListener("submit", event =>{
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const project = createProject(title);
    projectsArr.push(project);
    addProjects(project);
    document.querySelector("#title").value = '';
    projectSection.style.display = "none";
    // console.log("Project name:",project.projectName, projectsArr);
})



taskForm.addEventListener("submit", event =>{
    event.preventDefault();
    const formData = new FormData(taskForm);
    const dataObject = Object.fromEntries(formData.entries());
    console.log("current: ", currentProject);
    currentProject.addToDo(dataObject.title, dataObject.description, dataObject.dueDate, dataObject.Priority );
    taskForm.reset();
    taskSection.style.display = "none";
    checkTask();
})

projectCloseBtn.addEventListener("click", ()=>{
    projectSection.style.display = "none";  
})

taskCloseBtn.addEventListener("click", ()=>{
    taskSection.style.display = "none";
})

// Capturing all the clicks that are done to change the projects and assigning the clicked one
// so that the task can be added to the appropriate project.

projectsTabDiv.addEventListener("click", (event) =>{
    if(event.target.matches(".projects")){
        const carry = projectsArr.filter(project => project.uuid == event.target.dataset.id);
        currentProject = carry[0];
        heroHeading.textContent = `${currentProject.projectName}`;
        taskSectionDiv.innerHTML = '';
        checkTask();
    }
})


function checkTask(){
    const taskList = currentProject.tasks();
    console.log("taskList:", taskList);
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-list");
    taskList.forEach(element => {
        console.log("element:", element);
        taskDiv.innerHTML += 
        `<p>Title : <span>${element.title}</span>  Due Date: <span>${element.dueDate}</p>
        <p> Description:</p>
        <p>${element.description}</p>
        <input type="checkbox" name="completed" id="completed>`;
        taskSectionDiv.appendChild(taskDiv);
    });
}