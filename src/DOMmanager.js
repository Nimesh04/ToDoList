const projectBtn = () => document.querySelector("#createProj");
const projectSection = () => document.querySelector(".projectSection");
const taskBtn = () => document.querySelector("#add-task");
const taskSection = () => document.querySelector(".taskSection");
const projectCloseBtn = () => document.querySelector(".projectSection-heading > svg");
const taskCloseBtn = () => document.querySelector(".taskSection-heading > svg");
const titleForm = () => document.querySelector(".titleForm");
const taskForm = () => document.querySelector(".taskForm");
const projectsTabDiv = () => document.querySelector(".projectsTab");
const taskSectionDiv = () => document.querySelector(".task-section");
const heroHeading = () => document.querySelector(".hero-heading");
const prioritiesBtn = () => document.querySelectorAll(".prioritiesBtn");


export {projectBtn, projectCloseBtn, projectSection, prioritiesBtn, taskBtn, taskSection,
    taskCloseBtn, titleForm, taskForm,projectsTabDiv,taskSectionDiv, heroHeading
}