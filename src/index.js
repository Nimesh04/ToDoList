import "./styles.css";
import { createProject } from "./createProjects.js";
import { dummyProject } from "./defaultProjects.js";
import { format, formatDistance } from "date-fns";
import { loadStorage,populateStorage } from "./taskManager.js";
import { gatherTask } from "./changePriority.js";
import {projectBtn, projectCloseBtn, projectSection, prioritiesBtn, taskBtn, taskSection,
    taskCloseBtn, titleForm, taskForm,projectsTabDiv,taskSectionDiv, heroHeading
} from "./DOMmanager.js";
import { renderTask } from "./taskUI.js";


let currentProject = '';
let projectsArr = loadStorage();


function initializeApp() {
    if (projectsArr.length === 0) {
        projectsArr.push(dummyProject);
        populateStorage(projectsArr);
        currentProject = projectsArr[0];
    } else {
        currentProject = projectsArr[0];
    }
    projectsArr.forEach(addProjects);
    renderTask(currentProject.tasks());
    heroHeading().textContent = currentProject.projectName;
}


function addProjects(name){
    const projects = document.createElement("div");
    projects.classList.add("projects");
    projects.dataset.id = `${name.uuid}`;
    projects.innerHTML = `
    <p>#${name.projectName}</p> 
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
    </div>`;
    projectsTabDiv().appendChild(projects);
}


initializeApp();


projectBtn().addEventListener("click", () =>{
    projectSection().style.display = "flex";
})

taskBtn().addEventListener("click", () =>{
    taskSection().style.display = "flex";
})



titleForm().addEventListener("submit", event =>{
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const project = createProject(title);
    projectsArr.push(project);
    populateStorage(projectsArr);
    addProjects(project);
    document.querySelector("#title").value = '';
    projectSection().style.display = "none";
})



taskForm().addEventListener("submit", event =>{
    event.preventDefault();
    const formData = new FormData(taskForm());
    const dataObject = Object.fromEntries(formData.entries());
    let resultDate;
    if(dataObject.dueDate){
        const date = dataObject.dueDate.split("-");
        const dateFormat = format(new Date(date[0], date[1]-1, date[2]), 'MM/dd/yy')
        const dateFrame = formatDistance(
            new Date(),
            new Date(date[0], date[1]-1, date[2])
        )
        resultDate = `${dateFormat} | ${dateFrame}`;
    }
    currentProject.addToDo(dataObject.title, dataObject.description, resultDate, dataObject.Priority );
    populateStorage(projectsArr);
    taskForm().reset();
    taskSection().style.display = "none";
    renderTask(currentProject.tasks());
})

projectCloseBtn().addEventListener("click", ()=>{
    projectSection().style.display = "none";  
})

taskCloseBtn().addEventListener("click", ()=>{
    taskSection().style.display = "none";
})

// Capturing all the clicks that are done to change the projects and assigning the clicked one
// so that the task can be added to the appropriate project.

projectsTabDiv().addEventListener("click", (event) =>{
    if(event.target.matches(".projects > div svg")){
        const elm = event.target.closest(".projectsTab > div");
        const carry = projectsArr.filter(project => project.uuid == event.target.closest(".projectsTab > div").dataset.id);
        const index = projectsArr.indexOf(carry[0]);
        projectsArr.splice(index, 1);
        elm.remove();
        populateStorage(projectsArr);
    }
    if(event.target.closest(".projectsTab > div")){
        document.querySelector(".active")?.classList.remove("active");
        event.target.closest(".projectsTab > div").classList.add("active");
        const carry = projectsArr.filter(project => project.uuid == event.target.closest(".projectsTab > div").dataset.id);
        currentProject = carry[0];
        heroHeading().textContent = `${currentProject.projectName}`;
        const taskList = currentProject.tasks();
        console.log(projectsArr);
        console.log("taskList:", taskList);
        renderTask(taskList);
    }
})

taskSectionDiv().addEventListener("input", event =>{
    const taskList = event.target.closest(".task-list");
    const indexElm = currentProject.tasks().filter(name => name.title == taskList.dataset.name);
    if(event.target.checked){
        indexElm[0].completed = true;
        taskList.classList.add("completed");
    }
    if(event.target.checked == false){
        indexElm[0].completed = false;
        taskList.classList.remove("completed");
    }
    populateStorage(projectsArr);
})

// task remove button
taskSectionDiv().addEventListener("click", event =>{
    if(event.target.closest("svg")){
        const elm = event.target.closest(".task-list");
        const indexElm = currentProject.tasks().filter(name => name.title == elm.dataset.name);
        const index = currentProject.tasks()
                        .map(name =>name.title)
                        .indexOf(`${indexElm[0].title}`);
        currentProject.tasks().splice(index, 1);
        elm.remove();
        populateStorage(projectsArr);
    }
})

let list;
prioritiesBtn().forEach(elm =>{
    elm.addEventListener("click", (event)=>{
        document.querySelector(".active")?.classList.remove("active");
        event.target.classList.add("active");
        if(event.target.textContent =="All task"){
            list = gatherTask("all task");
            
        }else if(event.target.textContent =="High"){
            list = gatherTask("High");
        }else if(event.target.textContent =="Medium"){
            list = gatherTask("Medium");
        }else if(event.target.textContent =="Low"){
           list = gatherTask("Low");
        }
        renderTask(list);
    });
})
