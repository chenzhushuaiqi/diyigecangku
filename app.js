const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const moment = require('moment')
const mysql = require('mysql')
    // 创建数据库链接对象
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql001'


});



// 注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))
    // 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')
    // 把node_modules文件托管为静态资源目录
app.use('/node_modules', express.static('node_modules'))

// 用户请求的是首页页面
app.get('/', (req, res) => {

    // const sql = 'select * from users'
    // conn.query(sql, (err, result) => {
    //         if (err) return console.log('错误');
    //         console.log();

    //     })
    res.render('index', {})
})

// 用户请求的是注册页面
app.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})

// 用户请求的是登陆页面
app.get('/login', (req, res) => {
    res.render('./user/login.ejs', {})
})

// 表示用户要注册了
app.post('/register', (req, res) => {

    // 完成注册业务的逻辑
    const body = req.body;


    // 验证用户输入的信息数据
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请填写完整的表单信息后再注册', status: 501 })
    }

    // 查询用户名是否重复
    const sql1 = 'select count(*) as count from users where username=?'
    conn.query(sql1, body.username, (err, result) => {
        // 如果查询失败，则告知客户端失败。 :

        if (err) return res.send({ msg: '用户名查重失败', status: 502 })
        if (result[0].count !== 0) return res.send({ msg: '用户名存在', status: 503 })
            // console.log(result);

        // 执行注册的业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into users set ?'
        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '注册新用户失败', status: 504 });
            if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败', status: 505 })
            res.send({ status: 200, msg: '注册成功' })


        })


    })
})

// 用户登录
app.post('/login', (req, res) => {

    // 获取用书输入的数据
    const body = req.body;
    // console.log(body);

    // 执行sql语句  查询用户在数据库中是否存在
    const sql1 = 'select * from users where username=? and password=?'
    conn.query(sql1, [body.username, body.password], (err, result) => {
        if (err) return res.send({ msg: '用户登录失败', status: 601 });
        // console.log(result);

        if (result.length !== 1) return res.send({ msg: '用户登录失败', status: 602 })

        res.send({ status: 200, msg: '登录成功' })

    })

})

app.listen(3000, () => {
    console.log("服务器运行成功……")
})