var express = require('express');
var userModel=require('../model/user');
var validate=require('../middle/index.js');
var crypto=require('crypto');
//生成一个路由实例
var router = express.Router();
//1空的注册表单 /users/reg  2填了数据后返回给服务器，写入服务器数据库
router.get('/reg',validate.checkNotLogin,function(req,res){
  res.render('user/reg')
});

//提交用户注册的表单
router.post('/reg',validate.checkNotLogin,function(req,res){
  var user=req.body;
  user.avatar='https://secure.gravatar.com/avatar/'+md5(user.email);
  //user.password=md5(user.password);
  userModel.create(user,function(err,doc){
    if(err){
      req.flash('error',err)
      res.redirect('back');
    }else{
      //doc是保存后的用户信息
      //req.session.就是当前用户在服务器报错的一个数据对象
      req.session.user=doc;
      //追加一个成功的提示，success是一个类型在这里
      req.flash('success','注册成功'); //原理req.session.success='注册成功'
      res.redirect('/');
    }
  })

});
//用户登录
router.post('/login',validate.checkNotLogin,function(req,res){
    var user=req.body;
   // user.password=md5(user.password);
    userModel.findOne(user,function(err,user){
      if(err){
        req.flash('error',err)
        res.redirect('back');
      }else{
        req.session.user=user;
        req.flash('success','登录成功');
        res.redirect('/');
      }
    })
});
//退出登录
router.get('/logout',validate.checkLogin,function(req,res){
  req.session.user=null;
  res.redirect('/')
});
module.exports = router;

function md5(str){
  return crypto.createHash('md5').update(str).digest('hex');
}