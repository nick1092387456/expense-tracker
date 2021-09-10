const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// create路由
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('', (req, res) => {
  const name = req.body.name // 從 req.body 拿出new.hbs form裡的 name="name" 資料(value)
  return Record.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch((errors) => console.log(errors))
})

// detail路由
router.get('/:id', (req, res) => {
  const id = req.params.id //使用params取得網址上的動態id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('detail', { record }))
    .catch((error) => console.log(error))
})

// edit路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id //使用params取得網址上的動態id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Record.findById(id)
    .then((record) => {
      record.name = name
      record.isDone = isDone === 'on' //model模型值為布林值，使用===比較產生布林值結果並傳回isDone
      return record.save()
    })
    .then(() => res.redirect(`${id}`))
    .catch((error) => console.log(error))
})

// delete路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
