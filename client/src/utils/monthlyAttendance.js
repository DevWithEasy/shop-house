class MonthlyAttendance {
    constructor(date, attendances) {
        this.date = date
        this.attendances = attendances
    }
    year(){
        return new Date(this.date).getFullYear()
    }
    month(){
        return new Date(this.date).getMonth()
    }
    days() {
        const date = new Date(this.date)
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }
    daysArray() {
        const days = []
        for (let i = 1; i <= this.days(); i++) {
            days.push(i);

        }
        return days
    }
    findDate(day){
        return `${this.year()}-${String(this.month()+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    }
    monthName(){
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[this.month()]
    }
    dayName(day){
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const currentday = new Date(this.year(),this.month(),day).getDay()
        return daysOfWeek[currentday]
    }
    daysAttendance() {

        const attendances = []

        const newAttendanceArray = []
        
        this.attendances.forEach(attendance => {
            const day = new Date(attendance.date).getDate()
            newAttendanceArray.push({ ...attendance, day })
        })

        newAttendanceArray.sort((a,b)=>{
            return b.day - a.day
        })

        this.daysArray().forEach(day => {
            const name = this.dayName(day)
            const findAttendance = newAttendanceArray.find(attendance => attendance.day === day)
            if (findAttendance) {
                attendances.push({ day,name, attendance: findAttendance })
            } else {
                attendances.push({ day,name, attendance: {} })
            }
        })
        
        return attendances
    }
    workedDay(){
        return this.attendances.length
    }
    presentDay(){
        return this.attendances.filter(attendance=>attendance.status === 'P').length
    }
    absentDay(){
        return this.attendances.filter(attendance=>attendance.status === 'A').length
    }
    leaveDay(){
        return this.attendances.filter(attendance=>attendance.status === 'L').length
    }
    holiDay(){
        return this.attendances.filter(attendance=>attendance.status === 'H').length
    }
    daySummary(){
        return `P-(${this.presentDay()}),A-(${this.absentDay()}),H-(${this.holiDay()}),L-(${this.leaveDay()}) of ${this.attendances.length} days of ${this.days()}`
    }

}
export default MonthlyAttendance