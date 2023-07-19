export default function daysSorter(dayArr){
    const sortedArr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const resultObj = {};
    dayArr.map((day,index)=>{
        resultObj[`${sortedArr.indexOf(day)}`] = `${day}`;
    });
    return Object.values(resultObj);
};
