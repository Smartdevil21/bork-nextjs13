export default function convertDatesArrToObj(dateArr){
    const datesObj = {};
    dateArr?.map((date,index)=>{
        datesObj[`${date}`] = date;
    });
     return datesObj;
};