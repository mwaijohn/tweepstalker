const jwt = require('jsonwebtoken')
// authentication
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '7d' })
}

// get last seven days including today
const lastSevenDates = () => {
    let dates = []
    for (let i = 6; i >= 0; i--) {
        let date = new Date();
        const newDate = formatDate(date.setDate(date.getDate() - i));
        dates.push(newDate);
    }
    return dates;
}

// get last seven days including today
const dayBeforeSevenDays = () => {
    let date = new Date();
    const newDate = formatDate(date.setDate(date.getDate() - 6));
    return newDate;
}

const formatDate = (date) => {
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

// convert date to timestamp
const dateToTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
}

module.exports = {
    generateAccessToken,
    dayBeforeSevenDays,
    lastSevenDates,
    formatDate,
    dateToTimestamp
}

