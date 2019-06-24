const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')





// 注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))
    // 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')
    // 把node_modules文件托管为静态资源目录
app.use('/node_modules', express.static('node_modules'))

// 导入router/index.js 路由模块
// const router1 = require('./router/index.js')
// app.use(router1)
// 导入用户相关的路由模块
// const router2 = require('./router/user.js')
// app.use(router2)

// 使用循环的方式 进行路由的自动注册
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
    if (err) return console.log('读取router目录下的路由模块失败')
        // 循环router目录下的每一个文件名
    filenames.forEach(fname => {
        // 每循环一次，拼接处一个完整的路由模块地址
        const router = require(path.join(__dirname, './router', fname))
        app.use(router);
    })
})

app.listen(3000, () => {
    console.log("服务器运行成功……")
})