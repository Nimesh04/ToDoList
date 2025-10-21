import { createProject } from "./createProjects";


function loadStorage(){
    const stored = localStorage.getItem("projects");

    if(!stored) return [];

    let arr;
    try{
        arr = JSON.parse(stored);
    }catch(e){
        console.log("Empty array, ", e);
        return [];
    }

    if (!Array.isArray(arr)) arr = [arr];
    const rebuiltProjects = arr.map(p => {
        const project = createProject(p.projectName);
        if(p.uuid) project.uuid = p.uuid;
        if(Array.isArray(p.toDo)){
            p.toDo.forEach(element => {
                project.addToDo(element.title, element.description, element.dueDate, element.priority);
                if (element.completed) project.tasks().at(-1).completed = true;
            });
        }
        
        return project;
    });
    console.log("project:", rebuiltProjects);
    return rebuiltProjects;
}

function populateStorage(arr){
    const plainArr = arr.map(p => ({
        uuid: p.uuid,
        projectName: p.projectName,
        toDo: p.tasks(),
    }));
    localStorage.setItem("projects", JSON.stringify(plainArr));
}

export { loadStorage, populateStorage}