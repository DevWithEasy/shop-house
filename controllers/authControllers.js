const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Product = require('../models/Product')
const Invoice = require('../models/Invoice')
const Purchase = require('../models/Purchase')
const Report = require('../models/Report')
const Brand = require('../models/Brand')
const mongoose = require('mongoose')
const month = require('../utils/month')

exports.createAdmin = async (req, res, next) => {

  try {
    if (!req.body.name || !req.body.phone || !req.body.password) {
      return res.redirect('/failed.html')
    }
    const hash_password = await bcrypt.hash(req.body.password, 10)

    const new_user = new User({
      ...req.body,
      isAdmin: true,
      password: hash_password
    })

    await new_user.save()

    res.redirect('/')

  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message
    })
  }
}

exports.signup = async (req, res, next) => {

  try {
    const hash_password = await bcrypt.hash(req.body.password, 10)

    const new_user = new User({
      ...req.body,
      password: hash_password
    })

    const user = await new_user.save()

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully Signup.',
      data: user
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message
    })
  }
}

exports.signin = async (req, res, next) => {

  try {
    const user = await User.findOne({phone: req.body.phone})

    if (!user) {
      return res.status(405).json({
        success: false,
        status: 405,
        message: 'Not Found any account.'
      })
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    const isVerified = await bcrypt.compare(req.body.password, user.password)

    if (!isVerified) {
      return res.status(405).json({
        success: false,
        status: 405,
        message: 'Credentials wrong.'
      })
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully signin.',
      token: token,
      data: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message
    })
  }
}

exports.updateUser = async (req, res, next) => {

  try {
    console.log(req.body)
    if (req.body.change_password && req.body.new_password) {
      const hash_password = await bcrypt.hash(req.body.new_password, 10)
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          isAdmin: req.body.isAdmin,
          password: hash_password
        }
      },
        { new: true }
      )

      res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully updated.',
        data: user
      })
    } else {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          isAdmin: req.body.isAdmin
        }
      },
        { new: true }
      )

      res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully updated.',
        data: user
      })
    }


  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message
    })
  }
}

exports.deleteUser = async (req, res, next) => {

  try {
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      status: 200,
      message: 'User successfully deleted.',
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

exports.getAllUsers = async (req, res, next) => {

  try {
    const users = await User.find({})

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully Signup.',
      data: users
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message
    })
  }
}

exports.getDashboardData = async (req, res, next) => {
  const user = new mongoose.Types.ObjectId(req.user)
  const date = new Date()
  const year = date.getFullYear()
  const c_month = date.getMonth()
  const days = new Date(date.getFullYear(), c_month + 1, 0).getDate()
  const start = `${year}-${String(c_month + 1).padStart(2, '0')}-01`
  const end = `${year}-${String(c_month + 1).padStart(2, '0')}-${days}`
  
  try {
    const employees = await Employee.find({user : user}).countDocuments()
    const categories = await Brand.find().countDocuments()
    const customers = await Customer.find().countDocuments()

    const filter = {
      $match: {
        user : user,
        createdAt: {
          $gte: month(start,end,'start'),
          $lte: month(start,end,'end'),
        },
      },
    }

    //cuurent month purchase value
    const purchase_current = await Purchase.aggregate([
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

    //curremt month sale value
    const sale_current = await Invoice.aggregate([
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

    //get dashboard stock value price
    const products = await Product.aggregate([
      {
        $match: {
          user : user
        }
      },
      {
        $project: {
          total_price: { $multiply: ['$price', '$quantity'] }
        }
      },
      {
        $group: {
          _id: null,
          stock_value: {
            $sum: '$total_price'
          },
          total_products: {
            $sum: 1
          }
        }
      }
    ])

    //total purchase value price
    const purchase = await Purchase.aggregate([
      {
        $match: {
          user : user
        }
      },
      {
        $group: {
          _id: null,
          value: {
            $sum: '$total'
          }
        }
      }
    ])

    //total sales value price
    const sale = await Invoice.aggregate([
      {
        $match: {
          user : user
        }
      },
      {
        $group: {
          _id: null,
          value: {
            $sum: '$total'
          }
        }
      }
    ])

    //monthly reports
    const reports = await Report.find({
        reportType : 'daily',
        user : req.user,
        from: {
          $gte: month(start,end,'start'),
          $lte: month(start,end,'end'),
        },
    })

    console.log(start,end)

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully Signup.',
      data: {
        employees,
        categories,
        customers,
        current_month: {
          sale: !sale_current[0] ? 0 : sale_current[0].value,
          purchase: !purchase_current[0] ? 0 : purchase_current[0].value
        },
        product: products[0],
        total: {
          sale: !sale[0]? 0 : sale[0].value,
          purchase: !purchase[0]? 0 : purchase[0]?.value
        },
        reports
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

exports.getOutletData = async (req, res, next) => {
  const user = new mongoose.Types.ObjectId(req.params.id)
  const date = new Date()
  const year = date.getFullYear()
  const c_month = date.getMonth()
  const days = new Date(date.getFullYear(), c_month + 1, 0).getDate()
  const start = `${year}-${String(c_month + 1).padStart(2, '0')}-01`
  const end = `${year}-${String(c_month + 1).padStart(2, '0')}-${days}`
  
  try {
    const filter = {
      $match: {
        user : user,
        createdAt: {
          $gte: month(start,end,'start'),
          $lte: month(start,end,'end'),
        },
      },
    }

    //cuurent month purchase value
    const purchase_current = await Purchase.aggregate([
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

    //curremt month sale value
    const sale_current = await Invoice.aggregate([
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

    //get dashboard stock value price
    const products = await Product.aggregate([
      {
        $match: {
          user : user
        }
      },
      {
        $project: {
          total_price: { $multiply: ['$price', '$quantity'] }
        }
      },
      {
        $group: {
          _id: null,
          stock_value: {
            $sum: '$total_price'
          },
          total_products: {
            $sum: 1
          }
        }
      }
    ])

    //total purchase value price
    const purchase = await Purchase.aggregate([
      {
        $match: {
          user : user
        }
      },
      {
        $group: {
          _id: null,
          value: {
            $sum: '$total'
          }
        }
      }
    ])

    //total sales value price
    const sale = await Invoice.aggregate([
      {
        $match: {
          user : user
        }
      },
      {
        $group: {
          _id: null,
          value: {
            $sum: '$total'
          }
        }
      }
    ])

    //monthly reports
    const reports = await Report.find({
        reportType : 'daily',
        user : req.params.id,
        from: {
          $gte: month(start,end,'start'),
          $lte: month(start,end,'end'),
        },
    })



    res.status(200).json({
      success: true,
      status: 200,
      message: 'Successfully Signup.',
      data: {
        current_month: {
          sale: !sale_current[0] ? 0 : sale_current[0].value,
          purchase: !purchase_current[0] ? 0 : purchase_current[0].value
        },
        product: products[0],
        total: {
          sale: !sale[0]? 0 : sale[0].value,
          purchase: !purchase[0]? 0 : purchase[0]?.value
        },
        reports
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

exports.getAdminDashboardData = async (req, res, next) => {
  const date = new Date()
  const year = date.getFullYear()
  const c_month = date.getMonth()
  const days = new Date(date.getFullYear(), c_month + 1, 0).getDate()
  const start = `${year}-${String(c_month + 1).padStart(2, '0')}-01`
  const end = `${year}-${String(c_month + 1).padStart(2, '0')}-${days}`
  
  try {
    const categories = await Brand.find().countDocuments()
    const outlets = await User.find({isAdmin : false}).select('name address')

    const filter = {
      $match: {
        createdAt: {
          $gte: month(start,end,'start'),
          $lte: month(start,end,'end'),
        },
      },
    }

    //cuurent month purchase value
    const purchase_current = await Purchase.aggregate([
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

    //curremt month sale value
    const sale_current = await Invoice.aggregate([
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

    //get dashboard stock value price
    const products = await Product.aggregate([
      {
        $project: {
          total_price: { $multiply: ['$price', '$quantity'] }
        }
      },
      {
        $group: {
          _id: null,
          stock_value: {
            $sum: '$total_price'
          }
        }
      }
    ])

    //total purchase value price
    const purchase = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          value: {
            $sum: '$total'
          }
        }
      }
    ])

    //total sales value price
    const sale = await Invoice.aggregate([
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
      message: 'Successfully Signup.',
      data: {
        employees,
        categories,
        customers,
        outlets,
        current_month: {
          sale: !sale_current[0] ? 0 : sale_current[0].value,
          purchase: !purchase_current[0] ? 0 : purchase_current[0].value
        },
        product: products[0],
        total: {
          sale: !sale[0]? 0 : sale[0].value,
          purchase: !purchase[0]? 0 : purchase[0]?.value
        }
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