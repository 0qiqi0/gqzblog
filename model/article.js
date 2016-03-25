/**
 * Created by dell on 2016/3/24.
 */
 var mongoose=require('mongoose');

 //mongoose.connect('mongodb://123.57.143.189:27017/gqzblog');
 //定义模型:1集合的名称
 var articleModel=mongoose.model('article',new mongoose.Schema({
 title:String,
 content:String,
   user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},//类型：主键类型，引用类型是user
  //发表日期，类型：Date，默认是当前时间
  createAt:{type:Date,default:Date.now}
 }));
 module.exports=articleModel;
