export const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


export const lastSevenDates = () => {
    let dates = []
    for (let i = 6; i >= 0; i--) {
        let date = new Date();
        const newDate = formatDate(date.setDate(date.getDate() - i));
        dates.push(newDate);
    }
    return dates;
}
