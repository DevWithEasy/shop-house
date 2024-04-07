const padStart = require("./padStart");

const today = (date, query) => {

    const currentDate = date ? new Date(date) : new Date();

    const year = currentDate.getFullYear()
    const month = padStart(currentDate.getMonth())
    const day = padStart(currentDate.getDate())

    if (query === 'start') {
        return new Date(year,month,day, 0, 0, 0, 0);
    } else if (query === 'end') {
        return new Date(year,month,day, 23, 59, 59, 999);
    }else if(query === 'name'){
        return currentDate.toLocaleString('default', { month: 'long' })
    }else if(query === 'year'){
        return year
    }
}

module.exports = today