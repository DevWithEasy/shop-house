const todayDayName = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDate = new Date();

    const dayOfWeekIndex = currentDate.getDay();

    const dayName = daysOfWeek[dayOfWeekIndex];

    return dayName
}

module.exports = todayDayName