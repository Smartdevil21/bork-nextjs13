export default function getDatesOfMonth(year, month, day){
    const date = new Date(year, month, day);
    const dates = [];
    while(date.getMonth() === month){
        const trimmedDate = `${String(date).split(" ")[1]}-${String(date).split(" ")[2]}-${String(date).split(" ")[3]}`;
        dates.push(trimmedDate);
        date.setDate(date.getDate() + 1);
    };
    return dates;
};