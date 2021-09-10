// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars') //載入樣板引擎
const Record = require('./models/record') //載入資料庫連結 Record
const bodyParser = require('body-parser') //req.body存取器 (form資料存取器)

const app = express()

// --資料庫設定--
// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost:27017/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// --樣板設定--
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

// --路由設定--
// 首頁路由
app.get('/', (req, res) => {
  Record.find() //找出全部紀錄
    .lean() //轉換格式成Javascript陣列
    .then((records) => res.render('index', { records })) //把records傳給index.hbs，並且渲染index
    .catch((errors) => console.log(errors)) //如果有錯誤console出來
})

// create路由
app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const name = req.body.name // 從 req.body 拿出new.hbs form裡的 name="name" 資料(value)
  return Record.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch((errors) => console.log(errors))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
