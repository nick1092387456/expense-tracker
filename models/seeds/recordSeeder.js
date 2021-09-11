const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const records = require('../datas/records.json')
const Record = require('../record') // 載入 record model
const User = require('../user')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
}

//這裡db.on拿掉是因為在mongoose.js已經測試過了

db.once('open', () => {
  console.log('record seeder start!')
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id
      return Promise.all(
        Array.from({ length: records.length }, (_, i) =>
          Record.create({
            name: records[i].name,
            category: records[i].category,
            date: records[i].date,
            amount: records[i].amount,
            userId,
          })
        )
      )
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
