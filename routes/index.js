const express = require('express') // 引用 Express
const router = express.Router() // 呼叫 Express 路由器

const home = require('./modules/home') //引入home.js modules
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth') //第三方登入路由導入
const { authenticator } = require('../middleware/auth') //本地端登入路由導入

// 引入路由模組
router.use('/records', authenticator, records) // 將網址結構符合 /records 字串開頭的 request 導向 records modules
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 將網址結構符合 / 字串的 request 導向 home modules

// 匯出路由器
module.exports = router
