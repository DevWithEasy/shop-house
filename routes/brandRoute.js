const {getAllCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/brandControllers')
const verifyToken = require('../utils/verifyToken')
const router = require('express').Router()

router.post('/create', verifyToken, createCategory)
router.put('/update/:id', verifyToken, updateCategory)
router.delete('/delete/:id', verifyToken, deleteCategory)
router.get('/', getAllCategory)

module.exports = router