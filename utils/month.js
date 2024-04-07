const padStart = require("./padStart")

const month = (startDate,endDate,query) => {
    const startdate = new Date(startDate)
    const startYear = startdate.getFullYear()
    const startMonth = padStart(startdate.getMonth())
    const startDay = padStart(startdate.getDate())

    const enddate = new Date(endDate)
    const endYear = enddate.getFullYear()
    const endMonth = padStart(enddate.getMonth())
    const endDay = padStart(enddate.getDate())

    if (query === 'start') {
        return new Date(startYear,startMonth,startDay, 0, 0, 0, 0);
    } else if (query === 'end') {
        return new Date(endYear,endMonth,endDay, 17, 59, 59, 999);
    }else if(query === 'post-start'){
        return new Date(startYear,startMonth,startDay, 0, 0, 1, 0);
    }
    
}

module.exports = month