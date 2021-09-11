const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// create路由
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((error) => console.error(error))
})

router.post('', (req, res) => {
  const userId = req.user._id //從req.local拿的user資料
  const { name, date, category, amount,} = req.body // 從 req.body 拿出new.hbs form裡的 name="name" 資料(value)
  return Record.create({ name, date, category, amount, userId }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch((error) => console.log(error))
})

// edit路由
router.get('/:id/edit', async (req, res) => {
  const userId = await req.user._id
  const categoryList = await Category.find({ userId }).lean()
  const _id = req.params.id //使用params取得網址上的動態id
  return Record.findById({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record, categoryList }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findOne({ _id, userId })
    .then((record) => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// delete路由
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
