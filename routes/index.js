const express = require('express') // 引用 Express
const router = express.Router() // 呼叫 Express 路由器

const home = require('./modules/home') //引入home.js modules
const records = require('./modules/records')

// 準備引入路由模組
router.use('/', home) // 將網址結構符合 / 字串的 request 導向 home modules
router.use('/records', records) // 將網址結構符合 /records 字串開頭的 request 導向 records modules

// 匯出路由器
module.exports = router
