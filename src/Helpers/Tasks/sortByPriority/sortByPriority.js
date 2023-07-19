export default function sortByPriority(taskArr){
    taskArr.sort((a,b)=>(a.task.priority-b.task.priority));
    return taskArr;
}