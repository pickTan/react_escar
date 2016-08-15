/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import GetOtp from './GetOtp';
import PopInput from './PopInput';
import BtmCnt from './BtmCnt';
import PopErrorDiv from './PopErrorDiv';
/**
 * 登录框组件
 */
class LoginTab extends Component{
    shouldComponentUpdate(nextProps,nextStates){
        return  !nextProps.loginTab !== this.loginTab;
    }
    render() {
        const {loginFun,bouncedFun} = this.props.funs,
              {bouncFlg,btnFlag} = this.props.loginTab,
              choiceClass = bouncFlg ? 'choice' : '';
;
        return(
                <div>
                    <div className="login_form">
                    <ul className="login_choice">
                        <li className={`${choiceClass} public_pnt`} value="2" name="loginType" onClick={bouncedFun} >账号登录</li>
                        <li className="public_pnt" value="1" name="loginType" >手机登录</li>
                    </ul>
                    <div className="login_ursName public_errMsg" >
                        <label></label><input type="text" name="loginName"  placeholder="手机号码/用户名" />
                    </div>
                    <div style={{position:'relative'}} >
                        <div className="login_psd public_errMsg">
                            <label></label><input type="password" id="password" name="password" placeholder="6到12位数字与字母" />
                        </div>
                        <GetOtp
                            //source={otpSource}
                            msmType="LOGIN"
                            cellPhone="loginName"
                        />
                    </div>
                    <p className="login_rmk">
                        <input type="checkbox" className="public_pnt" name="autoLogin" value="1"  />
                        <span className="login_longLg" >自动登录</span>
                        <span className="login_gtBkPsd public_pnt" >忘记密码?</span>
                    </p>
                    <BtmCnt
                        className="public_btn login_btn public_pnt"
                        onClick={loginFun}
                        btnName="登录"
                        loadName="登录中"
                        btnFlag = {btnFlag}
                    />
                    <p className="login_gtRegister public_pnt" ><em></em>注册申请</p>
                </div>
                </div>
        );
    }
};
export default LoginTab;
