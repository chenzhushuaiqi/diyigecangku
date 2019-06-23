const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
    // 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')
    // 把node_modules文件托管为静态资源目录
app.use('/node_modules', express.static('node_modules'))

// 用户请求的是首页页面
app.get('/', (req, res) => {
    res.render('index', {})
})

// 用户请求的是注册页面
app.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})

// 用户请求的是登陆页面
app.get('/login', (req, res) => {
    res.render('./user/login.ejs')
})

// 表示用户要注册了
app.post('/register', (req, res) => {
    res.send({ msg: 'ok', status: 200 })
})

app.listen(3000, () => {
    console.log("服务器运行成功……")
})