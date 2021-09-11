// 載入 express 並建構應用程式伺服器
const express = require('express')
require('./config/mongoose') //對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
const exphbs = require('express-handlebars') //載入樣板引擎
const Record = require('./models/record') //載入model連結 Record
const methodOverride = require('method-override') //路由自定義模組 (restful用)
const bodyParser = require('body-parser') //req.body存取器 (form資料存取器)

const routes = require('./routes') //引入路由設定
const app = express()
const PORT = process.env.PORT || 3000 // 如果在 Heroku 環境則使用 process.env.PORT

// --樣板設定--
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

app.use(methodOverride('_method'))

// --路由設定--
app.use(routes)

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
