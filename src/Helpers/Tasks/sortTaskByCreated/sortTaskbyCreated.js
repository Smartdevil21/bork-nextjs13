// const unsortedDates = [{date:"2022-03-18"}, {date:"2022-07-06"}, {date:"2021-10-12"}];


function dateComparison(a, b) {
    const date1 = new Date(a.task.createdOn)
    const date2 = new Date(b.task.createdOn)
    
    return date1 - date2;
};

export default function sortByCreated(tasksArr){
    tasksArr.sort(dateComparison);
    return tasksArr;
}


