const Invoice = require("../../models/Invoice")
const Purchase = require("../../models/Purchase")
const Report = require("../../models/Report")
const User = require("../../models/User")
const today = require("../today")
const cron = require('node-cron')

const dailyReport = async () => {
    
    cron.schedule('59 59 23 * * *', async () => {
        
        const users = await User.find({ isAdmin: false })

        const datas = []

        for (const user of users) {
            const filter = {
                $match: {
                    user: user._id,
                    createdAt: {
                        $gte: today('', 'start'),
                        $lte: today('', 'end'),
                    },
                },
            };

            const purchases = await Purchase.aggregate([
                filter,
                {
                    $group: {
                        _id: null,
                        value: {
                            $sum: '$total',
                        },
                    },
                },
            ])

            const invoices = await Invoice.aggregate([
                filter,
                {
                    $group: {
                        _id: null,
                        value: {
                            $sum: '$total',
                        },
                    },
                },
            ])
            datas.push({
                user : user._id,
                purchase : !purchases[0] ? 0 : purchases[0].value,
                sale : !invoices[0] ? 0 : invoices[0].value
            })
            
        }

        datas.forEach(async(data)=>{
            const new_report = new Report({
                user : data.user,
                reportType : 'daily',
                from : today('', 'start'),
                to : today('', 'end'),
                year : today('', 'year'),
                month : today('', 'name'),
                purchase : data.purchase,
                sale : data.sale
            })

            await new_report.save()
        })
    });
};

module.exports = dailyReport