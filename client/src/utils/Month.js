const padStart=(value,count=2)=>{
    return String(value).padStart(count, '0')
}

const month = (inputDate, query)=>{
    const date = inputDate ? new Date(inputDate) : new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    const days = new Date(date.getFullYear(), month + 1, 0).getDate()

    if(query === 'first'){
        return `${year}-${padStart(month + 1)}-01`
    }else if(query === 'last'){
        return `${year}-${padStart(month + 1)}-${padStart(days)}`
    }else if(query === 'current'){
        return `${year}-${padStart(month +1)}-${padStart(day)}`
    }else if(query === 'name'){
        return date.toLocaleString('default', { month: 'long' });
    }
}

export default month