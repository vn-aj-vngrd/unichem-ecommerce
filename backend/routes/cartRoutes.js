const express = require('express')
const router = express.Router()
const {
  getCarts,
  setCart,
  deleteCart,
} = require('../controllers/cartController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCarts).post(protect, setCart)
router.route('/:id').delete(protect, deleteCart)

module.exports = router