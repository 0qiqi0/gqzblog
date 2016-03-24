var express = require('express');
var userModel=require('../model/user');
//生成一个路由实例
var router = express.Router();
//1空的注册表单 /users/reg  2填了数据后返回给服务器，写入服务器数据库
router.get('/reg',function(req,res){
  res.render('user/reg')
});

//提交用户注册的表单
router.post('/reg',function(req,res){
  var user=req.body;
  userModel.create(user,function(err,doc){
    if(err){
      res.redirect('back');
    }else{
      res.redirect('/');
    }
  })

});
//用户登录
router.get('/login',function(req,res){
  res.render('user/login')
});
//退出登录
router.get('/logout',function(req,res){
  res.send('logout')
});
module.exports = router;
