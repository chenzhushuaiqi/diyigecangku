// 封装路由模块的目的 是让每个路由模块职能单一
// 对于路由模块来说  只需要分配URL地址到处理函数对应的关系即可

const express = require('express');
const router = express.Router()

// 用户请求的是首页页面
router.get('/', )

module.exports = router;