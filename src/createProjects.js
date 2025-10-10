import { createToDo } from "./createToDo";

export function createProject(title){
    return{
        title: title,
        toDo: [],
        addToDo: function(title, description, dueDate, priority){
            const task = createToDo(title, description, dueDate, priority);
            return this.toDo.push(task);
        },
        
    }
}