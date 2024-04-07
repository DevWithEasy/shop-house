const statusColor = (status) => {
    let color
    switch (status) {
        case 'P':
            color =  'bg-sky-100 text-sky-500'
            break;
        case 'A':
            color = 'bg-red-100 text-red-500'
            break;
        case 'H':
            color = 'bg-green-100 text-green-500'
            break;
        case 'L':
            color = 'bg-yellow-100 text-yellow-500'
            break;
        default:
            color = 'bg-gray-100 text-gray-500'
            break;
    }

    return color
}

export default statusColor;