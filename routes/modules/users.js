const express = require('express')
const router = express.Router()

// 登入路由
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {})

// 註冊路由
router.get('/register', (req, res) => {
  res.render('register')
})
module.exports = router
