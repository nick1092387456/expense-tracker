const db = require('../../config/mongoose')
const categoriesJson = require('../datas/categories.json')
const Category = require('../category')

db.once('open', () => {
  console.log('category seeder start!')
  Category.create(categoriesJson).then(() => {
    db.close()
    console.log('category seeder done!')
  })
})
