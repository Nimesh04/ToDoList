import { loadStorage } from "./taskManager";


export function gatherTask(urgency){
    const array = [];
    loadStorage().forEach(elm =>
        { array.push(elm.tasks())})
    const finalArray = array.map(elm => {
        const tempArr = [];
        elm.forEach(task =>{
            if(urgency == "all task"){
                tempArr.push(task);
            }else if(task.priority === urgency){
                tempArr.push(task);
            }
        })
        return tempArr;
    })

    const finalAr= [];
    finalArray.forEach(elm => elm.forEach(li => finalAr.push(li)));
    return finalAr;
}

