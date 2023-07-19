function dateComparison(a, b) {
    const date1 = new Date(a)
    const date2 = new Date(b)
    
    return date1 - date2;
};

export default function doneDatesSorter(dateArr){
    dateArr.sort(dateComparison);
    return dateArr;
}