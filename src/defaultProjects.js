import { createProject } from "./createProjects";
import { formatDistance } from "date-fns";


const dummyProject = createProject("Home");

dummyProject.addToDo("Laundry", "Finish the laundry", `10/24/25 | ${formatDistance(new Date(), new Date(2025, 9,24))}`, "Medium");
dummyProject.addToDo("Kitchen", "Clean the Kitchen", `10/26/25 | ${formatDistance(new Date(), new Date(2025, 9,26))}`, "High");
dummyProject.addToDo("BookShelves", "Organize the bookshelves", `11/24/25 | ${formatDistance(new Date(), new Date(2025, 10,24))}`, "Low");

export { dummyProject };
