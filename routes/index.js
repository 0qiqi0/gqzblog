var express = require('express');
var articleModel=require('../model/article');
markdown = require('markdown').markdown;
//这是一个路由的实例
var router = express.Router();

/* GET home page. */
//用户访问/时
router.get('/', function(req, res, next) {
  //线配置参数，再执行查询
  //我们查出来的user是id，需要通过populate  转成对象
    articleModel.find().populate('user').exec(function(err,articles){

    if(err){
      req.flash('error',error);
      return res.redirect('/');
    }
        articles.forEach(function(article){
            article.content =markdown.toHTML(article.content);
        });
      //console.log(articles)
    res.render('index',{articles:articles})

    });

});
module.exports = router;
