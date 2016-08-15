/**
 * Created by girl on 16/5/25.
 */
import $ from 'jquery';
const core = (  obj,{
                    url=obj.props.source,
                    type="POST",
                    date="",
                    dateType='JSON',
                    success=(resulte)=>{obj.setState({resulte:resulte})},
                    error=()=>{obj.setState({resulte:{'msg':'请求超时,检查网络','status_code':'9'}})}
                }={}) => {
            for (let key in date){
                date[key] = $.trim(date[key]);
            }
        let otp ={
            'url': url,
            'type':type,
            'date':date,
            'dataType':dateType,
            'error':error.bind(obj),
            'success':success.bind(obj)
        };
    //jsop特殊处理
    if(dateType=="JSONP"){
        otp.jsonpCallback="success_jsonpCallback";
        otp.jsonp="callback";
    }
    if(type!="POST" && dateType!='JSONP' && date!=""){
        let params="",
            i=0;
        for (let key in date ){
            if(i==0){params+="?"}
            if(i>0){params+='&'}
            params+=key+"="+date[key];
            i++;
        }
        otp.url=url+params;
    }
       return $.ajax(otp);
}

module.exports =  core;
