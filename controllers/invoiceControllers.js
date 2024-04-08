const Invoice = require('../models/Invoice');
const Product = require('../models/Product');

exports.createInvoice = async (req, res, next) => {

  try {
    
    const new_invoice = new Invoice({
      user: req.user,
      buy: req.body.buy,
      sale: req.body.sale,
      products: req.body.products
    })

    const invoice = await new_invoice.save()

    if (invoice) {
      req.body.products.forEach(async (item) => {
        await Product.findByIdAndUpdate(item.product, {
          $inc: {
            quantity: - item.quantity
          }
        })
      })
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Invoice successfully created',
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

exports.getInvoices = async (req, res, next) => {

  try {
    const invoices = await Invoice.find().populate('user', '_id name phone')
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Invoices successfully retrieved',
      data: invoices
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message
    })
  }
}

exports.getInvoice = async (req, res, next) => {

  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('user', '-_id name')
      .populate('products.product')

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Invoice retrieved successfully',
      data: invoice
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message
    })
  }
}

exports.deleteInvoice = async (req, res, next) => {

  try {
    const invoice = await Invoice.findById(req.params.id)

    invoice.products.forEach(async (product) => {
      await Product.findByIdAndUpdate(product.product, {
        $inc: {
          quantity: product.quantity
        }
      })
    })

    await Invoice.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Invoice deleted successfully',
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