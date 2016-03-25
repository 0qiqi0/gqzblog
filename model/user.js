/**
 * Created by dell on 2016/3/24.
 */
 var mongoose=require('mongoose');

 //mongoose.connect('mongodb://123.57.143.189:27017/gqzblog');
 //定义模型:1集合的名称
 var userModel=mongoose.model('user',new mongoose.Schema({
 username:String,
 password:String,
     email:String,
 avatar:String
 }));
 module.exports=userModel;
