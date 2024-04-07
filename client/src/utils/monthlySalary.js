class MonthlySalary{
    constructor(date,data){
        this.date = date,
        this.employeesdata = data
    }
    year(){
        return new Date(this.date).getFullYear()
    }
    month(){
        return new Date(this.date).getMonth()+ 1
    }
    days() {
        const date = new Date(this.date)
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }
    dailyPay(employee){
        return Math.ceil(employee.salary / this.days())
    }
    payable(employee){
        const payableDays = this.days() - employee.attendance.A
        return this.dailyPay(employee) * payableDays
    }
    employees(){
        const data = []
        this.employeesdata.forEach(employee=>{
            data.push({
                ...employee,
                payable : this.payable(employee)
            })
        })
        return data
    }
    totalPayable(){
        return this.employees().reduce((a,c)=>a+c.payable,0)
    }

}

export default MonthlySalary