/**
 * Created by girl on 16/5/25.
 */
import core from './core.js';

const JpPost = (obj,date="") => {
    core(obj,{dataType:"JSONP",date:date});
}

module.exports =  JpPost;



//$.ajax({
//    'url': '?ac=do&'+$('#form1').serialize(),
//    'type':'POST',
//    'dataType':'JSONP',
//    'jsonp':'jsonpcallback',
//    'error':function(e){
//    },
//    'success':function(data){
//        alert(data[0].msg);
//    }
//});
