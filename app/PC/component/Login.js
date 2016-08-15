/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import '../../tool/lib/Cookie';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
import GetOtp from './GetOtp';
import PopInput from './PopInput';
import BtmCnt from './BtmCnt';
import PopErrorDiv from './PopErrorDiv';
/**
 * 登录框组件
 */
class Login extends Component{
    constructor() {  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte: {},
            popControl: 'close', //弹框的控制(当为'succ'为请求成功,当为'close'时表示关闭,[String],为具体一个弹框)        };
            Pop:'close'
        }
    }
    //登录
    login(){
        const passText = $('[name="loginType"].choice') .attr('value')=='2' ? '密码' : '验证码',
              autoLogin=$('[name="autoLogin"]:checked').val();
        validateAndSubmit({
            obj:this,
            moreParams:{autoLogin:autoLogin},
            validates:
                [
                    {'name':'loginName', 'rules': [{'rule':'isEmpty', 'errorMsg':'用户名不能为空'}]},
                    {'name':'password', 'rules':[{'rule':'isEmpty', 'errorMsg':`${passText}不能为空.`}]},
                    {'name':'loginType','checkClass':'choice','rules':[{'rule':'isEmpty', 'errorMsg':'密码不能为空'}]}
                ]
        });
        $.clearCookie();
        $.cookie('ursName',$('[name="loginName"]').val());
    }
    //弹框
    bounced(popName){
        this.setState({popControl:popName});
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    //切换
    toggleLogin(obj){
        const  index=obj-1;
        $('[name="loginType"].choice').removeClass('choice');
        $('[name="loginType"]').eq(index).addClass('choice');
        if(obj=='1'){
                $('.login_psd').removeClass('login_otp');
                $('.login_psd input').attr('placeholder','6到12位数字与字母').val('');
                $('.login_rmk').removeClass('hidden');
                $(".public_otp").hide();
            document.getElementById('password').type='password';
            }else{
                $('.login_psd').addClass('login_otp');
                $('.login_psd input').attr('placeholder','6位手机验证码').val('');
                $(".public_otp").show();
                $('.login_rmk').addClass('hidden');
                document.getElementById('password').type='text';
            }
    }
    render() {
        const source = (new UrlTool()).sourceRoot(),
              otpSource = `${source}verifyCode`,
              state = this.state,
              popName = state.popControl ,
              rst = this.state.resulte,
              findPswSource = `${source}findPwd`,
              findPswHtl = popName == 'close' ? '' : <PopInput obj={this} type={popName} source={findPswSource} params='' />;
            let sta = validateAndSubmit.errorCode(this);
        sta && $.cookie('role',rst.role);   // 存储权限
        return sta?( this.goto({url:'corporation_account.html'}) ):(
            (
                <div>
                    <div className="login_form">
                    <ul className="login_choice">
                        <li className="choice public_pnt" value="2" name="loginType" onClick={this.toggleLogin.bind(this,'1')} >账号登录</li>
                        <li className="public_pnt" value="1" name="loginType" onClick={this.toggleLogin.bind(this,'2')}>手机登录</li>
                    </ul>
                     <PopErrorDiv msg={rst.msg} />
                    <div className="login_ursName public_errMsg" >
                        <label></label><input type="text" name="loginName"  placeholder="手机号码/用户名" />
                    </div>
                    <div style={{position:'relative'}} >
                        <div className="login_psd public_errMsg">
                            <label></label><input type="password" id="password" name="password" placeholder="6到12位数字与字母" />
                        </div>
                        <GetOtp source={otpSource} msmType="LOGIN" cellPhone="loginName"  />
                    </div>
                    <p className="login_rmk">
                        <input type="checkbox" className="public_pnt" name="autoLogin" value="1"  />
                        <span className="login_longLg" >自动登录</span>
                        <span className="login_gtBkPsd public_pnt" onClick={this.bounced.bind(this,'resetPsd')}>忘记密码?</span>
                    </p>
                    <BtmCnt className="public_btn login_btn public_pnt" onClick={this.login.bind(this)} btnName="登录" loadName="登录中" random={Math.random()} />
                    <p className="login_gtRegister public_pnt" onClick={this.goto.bind(this,{url:'register.html',obj:this})}><em></em>注册申请</p>
                </div>
                    {findPswHtl}
                </div>
            )
        );
    }
};
module.exports =  Login;
