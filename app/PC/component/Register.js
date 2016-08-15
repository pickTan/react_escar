/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
import GetOtp from './GetOtp';
import PopPrompt from './PopPrompt';
import BtmCnt from './BtmCnt';
/**
 * 注册
 */
class Register extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }
    //登录
    register(){
        validateAndSubmit({
            obj:this,
            validates:
                [
                    {'name':'name','rules':[{'rule':'isEmpty','errorMsg':'用户名不能为空'}]},
                    {'name':'cellphone', 'rules':[{'rule':'isEmpty', 'errorMsg':'手机号不能为空'}, {'rule':'isPhone', 'errorMsg':'请输入11位手机号'}]},
                    {'name':'verifyCode', 'rules':[{'rule':'isEmpty', 'errorMsg':'验证码不能为空.'}, {'rule':'isOtpNum', 'errorMsg':'必须为6位纯数字的验证码.'}]},
                    {'name':'password', 'rules':[{'rule':'isEmpty', 'errorMsg':'密码不能为空'}, {'rule':'isPassword', 'errorMsg':'密码为6~12为数字加字母'}]}
                ]
        });
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    render() {
        const root = (new UrlTool()).sourceRoot(),
              sourceRoot = `${root}verifyCode`,
              loginSource = `${root}login`,
              name = $('[name="name"]').val(),
              sta = this.state,
              resulte = sta.resulte,
              cellphone = $('[name="cellphone"]').val(),
              params = {loginType:3,loginName:cellphone,password:resulte.token},
              msg = resulte.msg,
              paramLst={msg:msg,btnArr:[{btnName:'取消'},{btnName:'登录账号'}]};
        switch(resulte.status_code){
            case '000'://注册成功
                paramLst.msg = `您已经是注册企业：${name}您的手机账号登录权限为企业管理员，如需更换请联系星星平台客服人员400-9999-0000`;
                paramLst.img = 'register_success';
                break;
            case '001': //用户已存在
                paramLst.msg = `您已经是注册企业：${name}企业用车的平台员工用户`;
                paramLst.btnArr[1].btnUrl = 'login.html';
                paramLst.img = 'register_success';
                break;
            case '002'://已经被注册
                paramLst.msg = `您的企业已经存在`;
                paramLst.img = 'register_success';
                break;
            default :
                paramLst.msg = resulte.msg;
                paramLst.img = 'register_fail';
                paramLst.btnArr = [{btnName:'取消',btnUrl:'',btnClass:''}];
                break;
        }
        const popHtl = resulte.status_code != undefined ? <PopPrompt obj={this} paramLst={paramLst} params={params}   source={loginSource} /> :  '';
        return(
                <div className="register">
                    <div className="public_mains">
                        <div className="register-title">
                            <em></em>企业注册
                        </div>
                        <div className="register_content">
                            <div className="register_Name public_errMsg">
                                <span>企业全称：</span><input type="text" name="name" placeholder="须与营业执照保持一致" />
                            </div>
                            <div className="register_phone public_errMsg">
                                <span>注册手机号：</span><input type="text" name="cellphone" placeholder="11位数字" />
                            </div>
                            <div className="register_test public_errMsg">
                                <span>验证码：</span>
                                <input type="text" placeholder="验证码" name="verifyCode" className="register_yanzheng" />
                                <GetOtp source={sourceRoot} msmType="REGISTER"  cellPhone="cellphone" />
                            </div>
                            <div className="register_psd public_errMsg">
                                <span>设置密码：</span>
                                <input type="password" placeholder="6-12位数字加字母" name="password" />
                            </div>
                            <div className="register_agree public_errMsg">
                                <input type="checkbox" id="one" name="one" /><label >同意</label> <u>服务协议</u>
                            </div>
                            <BtmCnt className="public_btn public_pnt register_submit" onClick={this.register.bind(this)} btnName="确认提交" loadName="提交中" random={Math.random()} />
                        </div>
                    </div>
                    {popHtl}
                </div>
        );
    }
};
module.exports =  Register;
