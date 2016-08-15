/**
 * Created by girl on 16/6/15.
 */
import ReactDOM from 'React-dom';
import $ from 'jquery';
import '../../tool/lib/Cookie';
import Ajax from '../../source/ajax';
import validate from '../../validate/validate';
import JsonTool from '../../tool/lib/JsonTool' ;
import RSA from '../../rsa/lib/RSA' ;
/**
 *
 * @param obj           this
 * @param validates     校验类 不填是直接查询
 * @param submitType    提交类型GET,POST
 * @param moreParams    更多的params
 * @param isCheck       只需要校验,默认false,为false只校验提交,不提交 如果为true 校验通过整个函数返回为json且不提交
 */
const validateAndSubmit=({
    obj,
    validates=[],
    submitType='Get',
    moreParams={},
    isCheck=false
    }={})=>{
    let params={};
    if (validates !== []){
        params = validate(validates);
        //弹出错误
        const errors=params.error;
        $('.public_errMsg').attr('errMsg','');          //去除错误
            //表单提交
        let isNull =false;
        for(let key in errors){
            $(key).parents('.public_errMsg').attr('errMsg',`  *${errors[key]}`);  //显示错误
            isNull = key;
        }
        if (isNull) {
            obj.setState({closeLoading:'1'}); //解除loading按钮
            return !isNull;
        }
    }
    let jsonTool = new JsonTool(),
        sucParams=jsonTool.concat(params.success,moreParams);
    for(let key in sucParams){  //进行前后排空 并将密码进行rsa加密
        sucParams[key] = $.trim(sucParams[key]);
        const  pswLength = sucParams[key].length,
               flag= ((key =='password' || key =='userPsw' ) && sucParams.loginType != '1' && pswLength < 14 ); //判断是否是密码,排除验证码,排除token
        sucParams[key] = flag  ? RSA(sucParams[key]) : sucParams[key];
    }
    isCheck || Ajax[submitType](obj,sucParams);
    return sucParams;
};
    validateAndSubmit.errorCode=(obj)=>{
        const rlt = obj.state.resulte,
              code = rlt.status_code;
         let  flg = false ;
        if(code=='997'){
            $.clearCookie();
            window.location.href = 'login.html';
        }else if(code =='000'){
            flg =  true;
        }
        return flg;
    };



module.exports =  validateAndSubmit;
