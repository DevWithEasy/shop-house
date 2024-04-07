const { createPurchase, getAllPurchase, deletePurchase } = require('../controllers/purchaseControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create',verifyToken, createPurchase)
      .get('/', verifyToken, getAllPurchase)
      .delete('/delete/:id', verifyToken, deletePurchase)

module.exports = router