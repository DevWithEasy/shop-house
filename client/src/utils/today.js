const today = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return `${year}-${String(month + 1).padStart(2, '0')}-${day}`
}

export default today