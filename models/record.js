const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // 使用mongoose提供的userId做關聯設定
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
})

module.exports = mongoose.model('record', recordSchema)
