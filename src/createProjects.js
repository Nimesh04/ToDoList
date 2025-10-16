import { createToDo } from "./createToDo";

export function createProject(title, uuid){
    const id = uuid;
    const projectName = title;
    let toDo = [];
    const tasks = () => {return toDo}
    const addToDo = (title, description, dueDate, priority) => toDo.push(createToDo(title, description, dueDate, priority));
    return { id, projectName, tasks, addToDo};
}
