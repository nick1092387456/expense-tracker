//首頁
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/record')
// 定義首頁路由
router.get('/', (req, res) => {
  Record.find() //找出全部紀錄
    .lean() //轉換格式成Javascript陣列
    .sort({ _id: 'asc' }) //照_id數字降序排序
    .then((records) => res.render('index', { records })) //把records傳給index.hbs，並且渲染index
    .catch((errors) => console.log(errors)) //如果有錯誤console出來
})
// 匯出路由模組
module.exports = router
