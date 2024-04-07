const Invoice = require("../models/Invoice")
const Purchase = require("../models/Purchase")
const Report = require("../models/Report")
const month = require("../utils/month")
const mongoose = require("mongoose")

exports.generateReport = async (req, res, next) => {
    try {

        const start = month(req.body.start, req.body.end, 'start')
        const end = month(req.body.start, req.body.end, 'end')

        const filter = {
            $match: {
                user : new mongoose.Types.ObjectId(req.user),
                createdAt: {
                    $gte: start,
                    $lte: end,
                },
            }
        }

        const purchases = await Purchase.aggregate([
            filter,
            {
                $group: {
                    _id: null,
                    value: {
                        $sum: '$total'
                    }
                }
            }
        ])

        const invoices = await Invoice.aggregate([
            filter,
            {
                $group: {
                    _id: null,
                    value: {
                        $sum: '$total'
                    }
                }
            }
        ])


        res.status(200).json({
            success: true,
            status: 200,
            message: 'Report successfully generated',
            data: {
                purchase: purchases[0],
                invoice: invoices[0]
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

exports.createReport = async (req, res, next) => {
    try {

        const new_report = new Report({
            user : req.user,
            ...req.body
        })

        await new_report.save()

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Report successfully created.',
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

exports.getAllReport = async (req, res, next) => {
    try {

        const reports = await Report.find({user : req.user}).sort({
            createdAt: 1
        })

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Report successfully retrived.',
            data: reports
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

exports.deleteReport = async (req, res, next) => {

    try {
        await Report.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Report deleted successfully.',
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}