//首頁
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Record = require('../../models/record')
const Category = require('../../models/category')
// 定義首頁路由
router.get('/', async (req, res) => {
  const records = await Record.find().lean().sort({ date: 'desc', _id: 'desc' })
  const categoryList = await Category.find().lean().sort({ _id: 'asc' })
  let totalAmount = 0
  for (let amount of records) {
    totalAmount += amount.amount
  }
  res.render('index', { totalAmount, records, categoryList }) //把records傳給index.hbs，並且渲染index
})

// category 路由
router.get('/filter', async (req, res) => {
  const categoryList = await Category.find().sort({ _id: 'asc' }).lean()
  const { categorySelector } = req.query
  const records = await Record.find({ category: categorySelector })
    .lean()
    .sort({ _id: 'desc' })
  let totalAmount = 0
  for (let record of records) {
    totalAmount += record.amount
  }
  res.render('index', { totalAmount, records, categoryList, categorySelector })
})

// 匯出路由模組
module.exports = router
