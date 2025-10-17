import { createToDo } from "./createToDo";

export function createProject(title){
    const uuid = crypto.randomUUID();
    const projectName = title;
    let toDo = [];
    const tasks = () => {return toDo}
    const addToDo = (title, description, dueDate, priority) => toDo.push(createToDo(title, description, dueDate, priority));
    return { uuid, projectName, tasks, addToDo};
}
