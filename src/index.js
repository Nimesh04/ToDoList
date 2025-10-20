import "./styles.css";
import { createProject } from "./createProjects.js";
import { dummyProject } from "./defaultProjects.js";
import { format, formatDistance } from "date-fns";

// import "./taskManager.js";

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
    checkTask(currentProject.tasks());
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
    let resultDate;
    if(dataObject.dueDate){
        console.log(dataObject.dueDate);
        const date = dataObject.dueDate.split("-");
        console.log(date);
        const dateFormat = format(new Date(date[0], date[1]-1, date[2]), 'MM/dd/yy')
        const dateFrame = formatDistance(
            new Date(),
            new Date(date[0], date[1]-1, date[2])
        )
        resultDate = `${dateFormat} | ${dateFrame}`;
    }
    currentProject.addToDo(dataObject.title, dataObject.description, resultDate, dataObject.Priority );
    taskForm.reset();
    taskSection.style.display = "none";
    checkTask(currentProject.tasks());
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
        document.querySelector(".active")?.classList.remove("active");
        event.target.classList.add("active");
        const carry = projectsArr.filter(project => project.uuid == event.target.dataset.id);
        currentProject = carry[0];
        heroHeading.textContent = `${currentProject.projectName}`;
        // taskSectionDiv.innerHTML = '';
        const taskList = currentProject.tasks();
        console.log("taskList:", taskList);
        checkTask(taskList);
    }
})

// right now we're clearing the entire task section div every time we add a new task or we open
// new things and adding the priority color to appropriate to it's urgency
function checkTask(taskList){
    taskSectionDiv.innerHTML = '';
    taskList.forEach(element => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-list");
        taskDiv.dataset.name = `${element.title}`;
        console.log("element:", element);
        taskDiv.innerHTML += 
        `<div class="left">
            <input type="checkbox" name="checkbox">
        </div>
        <div class="middle">
            <p>${element.title}  <span>${element.priority}</span> </p>    
            <p>${element.description}</p>
            <p>${element.dueDate}</p>
        </div>
        <div class="right">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
        </div>`
        const middleSpan = taskDiv.querySelector(".middle span");
        if( element.priority == "High"){
            middleSpan.classList.add("High");
        }else if(element.priority =="Medium"){
            middleSpan.classList.add("Medium");
        }else if(element.priority == "Low"){
            middleSpan.classList.add("Low");
        }

        if(element.completed){
            taskDiv.querySelector(".left > input").checked = true;
            taskDiv.style.textDecoration = "line-through";
            taskDiv.style.backgroundColor = "#d6d4d6";
        }
        taskSectionDiv.appendChild(taskDiv);   
    });

}

taskSectionDiv.addEventListener("input", event =>{
    const taskList = event.target.closest(".task-list");
    const indexElm = currentProject.tasks().filter(name => name.title == taskList.dataset.name);
    console.log(indexElm);
    if(event.target.checked){
        indexElm[0].completed = true;
        taskList.style.textDecoration = "line-through";
        taskList.style.backgroundColor = "#d6d4d6";
    }
    if(event.target.checked == false){
        indexElm[0].completed = false;
        taskList.style.textDecoration = "none";
        taskList.style.backgroundColor = "#f6eeff";
    }
})

// task remove button
taskSectionDiv.addEventListener("click", event =>{
    if(event.target.closest("svg")){
        const elm = event.target.closest(".task-list");
        const indexElm = currentProject.tasks().filter(name => name.title == elm.dataset.name);
        const index = currentProject.tasks()
                        .map(name =>name.title)
                        .indexOf(`${indexElm[0].title}`);
        currentProject.tasks().splice(index, 1);
        console.log(currentProject.tasks());
        elm.remove();
    }
})