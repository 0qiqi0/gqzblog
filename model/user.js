/**
 * Created by dell on 2016/3/24.
 */
 var mongoose=require('mongoose');

 //mongoose.connect('mongodb://127.0.0.1:27017/gqzblog');
 //定义模型:1集合的名称
 var userModel=mongoose.model('user',new mongoose.Schema({
 username:String,
 password:String,
     email:String,
 avatar:String
 }));
 module.exports=userModel;
