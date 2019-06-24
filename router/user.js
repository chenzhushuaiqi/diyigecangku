const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const moment = require('moment')
    // 创建数据库链接对象
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql001'


});

module.exports = router;

// 用户请求的是注册页面
router.get('/register', (req, res) => {
    res.render('./user/register.ejs', {})
})

// 用户请求的是登陆页面
router.get('/login', (req, res) => {
    res.render('./user/login.ejs', {})
})

// 用户要注册了
router.post('/register', (req, res) => {

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
router.post('/login', (req, res) => {

    // 获取用书输入的数据
    const body = req.body;
    // console.log(body);

    // 执行sql语句  查询用户在数据库中是否存在
    const sql1 = 'select * from users where username=? and password=?'
    conn.query(sql1, [body.username, body.password], (err, result) => {
        // 查询期间 如果执行sql语句失败，则表示查询失败
        if (err) return res.send({ msg: '用户登录失败', status: 601 });
        // console.log(result);
        // 查询结果如果记录条数不等于1，则证明查询失败
        if (result.length !== 1) return res.send({ msg: '用户登录失败', status: 602 })
            // 查询成功
        res.send({ status: 200, msg: '登录成功' })

    })

})