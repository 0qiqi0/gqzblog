/**
 * Created by dell on 2016/3/24.
 */
var a = require('debug')('a');
a('aaaaa');
var b = require('debug')('b:test');
b('bbbbb');

//'a'    'b:test'是整个匹配

// set port=3000    echo %port%