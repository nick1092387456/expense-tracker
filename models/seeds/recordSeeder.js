const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const RecordsJson = require('../datas/records.json')
const Record = require('../record') // 載入 record model

//這裡db.on拿掉是因為在mongoose.js已經測試過了

db.once('open', () => {
  console.log('record seeder start!')
  Record.create(RecordsJson).then(() => {
    db.close()
    console.log('record seeder done!')
  })
})
