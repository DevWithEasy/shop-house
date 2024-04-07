const dayDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const differenceInMilliseconds = startDate - endDate ;

    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    return differenceInDays
}

export default dayDifference