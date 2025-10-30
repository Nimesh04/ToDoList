import{ taskSectionDiv } from "./DOMmanager.js";

function createElm(element){
    const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-list");
        taskDiv.dataset.name = `${element.title}`;
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
        middleSpan.classList.add(element.priority);
        if(element.completed){
            taskDiv.querySelector(".left > input").checked = true;
            taskDiv.classList.add("completed");
        }


        return taskDiv;
}



function renderTask(taskList){
    const container = taskSectionDiv();
    container.innerHTML = '';
    taskList.forEach(element => {
        const taskDiv = createElm(element);
        container.appendChild(taskDiv);   
    });

}
export { renderTask };