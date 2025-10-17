import { createProject } from "./createProjects";


const dummyProject = createProject("Dummy");

dummyProject.addToDo("Laundry", "Finish the laundry", "10/24/25", "Medium");
dummyProject.addToDo("Kitchen", "Clean the Kitchen", "10/20/25", "High");
dummyProject.addToDo("BookShelves", "Organize the bookshelves", "10/30/25", "Low");

export { dummyProject };
