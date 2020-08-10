var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel} = require('../db/models')
const filter = {password: 0}
/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res) {
  const {username, password} = req.body
  if (username === 'admin') {
    res.send({code: 1, msg: '此用户已存在'})
  } else {
    res.send({code: 0, data: {id: 'abc123', username, password}})
  }
}) */
// 注册
router.post('/register', function (req, res) {
  const {username, password, type} = req.body
  UserModel.findOne({username}, function (err, user) {
    if(user) {
      res.send({code: 1, msg: '此用户已存在'})
    } else {
      new UserModel({username, type, password: md5(password)}).save(function (err, user) {
        console.log(user)
        const data = {username, type, _id: user._id}
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
        res.send({code: 0, data: data})
      })
    }
  })
})

router.post('/login', function (req, res) {
  console.log(11,req.params)
  const {username, password} = req.body
  UserModel.findOne({username, password:md5(password)}, function (err, user) {
    if (user) {
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
      res.send({code: 0, data: user})
    } else {
      res.send({code: 1, msg: '用户名或密码不正确！'})
    }
  })
})
module.exports = router;
