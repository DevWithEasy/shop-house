const { createProduct, getProducts, updateProduct, deleteProduct, getProductsBySearch, getProduct, all_update } = require('../controllers/productControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create', verifyToken, createProduct)
      .put('/update/:id', verifyToken, updateProduct)
      .delete('/delete/:id', verifyToken, deleteProduct)
      .get('/find/:id',getProduct)
      .get('/',verifyToken,getProducts)
      .get('/search',verifyToken, getProductsBySearch)
      .get('/all_update',all_update)

module.exports = router