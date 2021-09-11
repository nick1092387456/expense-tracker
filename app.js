// 載入 express 並建構應用程式伺服器
const express = require('express')
const session = require('express-session') //截取 cookie 資訊、生成 session，並把 session 資訊存放在伺服器端
require('./config/mongoose') //對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
const exphbs = require('express-handlebars') //載入樣板引擎
const Record = require('./models/record') //載入model連結 Record
const methodOverride = require('method-override') //路由自定義模組 (restful用)
const flash = require('connect-flash') //小訊息box套件
const bodyParser = require('body-parser') //req.body存取器 (form資料存取器)

// Helpers
const { ifEqual } = require('./tools/helper')
require('handlebars-helpers')()

const routes = require('./routes') //引入路由設定
const usePassport = require('./config/passport')
const app = express()
app.use(flash())
const PORT = process.env.PORT || 3000 // 如果在 Heroku 環境則使用 process.env.PORT

// --樣板設定--
app.engine(
  'hbs',
  exphbs({ defaultLayout: 'main', helpers: { ifEqual }, extname: '.hbs' })
)
app.set('view engine', 'hbs')

app.use(
  session({
    secret: 'ThisisMySecret',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

app.use(methodOverride('_method'))
usePassport(app)

//middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() //isAuthenticated()回傳的是布林值
  res.locals.user = req.user //res.locals 是 Express.js 幫我們開的一條捷徑，放在 res.locals 裡的資料，所有的 view 都可以存取。
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})

// --路由設定--
app.use(routes)

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
