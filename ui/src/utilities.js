// format date to YY-mm_DD
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

// get last seven days including today
export const lastSevenDates = () => {
    let dates = []
    for (let i = 6; i >= 0; i--) {
        let date = new Date();
        const newDate = formatDate(date.setDate(date.getDate() - i));
        dates.push(newDate);
    }
    return dates;
}

// convert numbers like twitter
export const numberFormatterLikeTwitter = (num, fixed) => {
    // terminate early
    if (num === null) {
        return null;
    }

    // terminate early
    if (num === 0) {
        return '0';
    }

    fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show

    let b = num.toPrecision(2).split('e'), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c =
            k < 1
                ? num.toFixed(0 + fixed)
                : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power

    return e;
}

// convert date to timestamp
export const dateToTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
}

// export const apiPath = "https://agitated-goldwasser-99cad0.netlify.app/.netlify/functions/api"

export const apiPath = "http://localhost:9000/.netlify/functions/api"

