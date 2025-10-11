import "./styles.css";
import { createProject } from "./createProjects.js";



const projectBtn = document.querySelector("#createProj");



const home = createProject("Home");

home.addToDo("Laundry","All to do works related to home", "10/09/2025", "medium");
home.addToDo("Dishes","All to do works related to home", "10/09/2025", "medium");

const office = createProject("Office");

office.addToDo("Papers","All to do works related to office", "10/09/2025", "medium");
console.log(home);
console.log(office);