const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const Record = require('../record') // 載入 record model

//這裡db.on拿掉是因為在mongoose.js已經測試過了

db.once('open', () => {
  console.log('seeder start!')
  for (let i = 0; i < 10; i++) {
    Record.create({ name: 'name-' + i })
  }
  console.log('seeder done!')
})
