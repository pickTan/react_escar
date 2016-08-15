/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
/**
 * 页面公共手机验证码请求
 * cellPhone
 */


class GetOtp extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            time : 120,
            resulte:{
            }
        };
    }

    shouldComponentUpdate(nextProps,nextState){
        const codeSta = nextState.resulte.status_code == '000',
              timeSta = nextState.time == 120,
              sta = codeSta && timeSta;
        if (codeSta){
                this.lastSetTime();
        }
        return !sta;
    }
    //获取手机验证码
    otp(){
        const cellPhone = this.props.cellPhone;
        let moreParams = {'msmType':this.props.msmType};
        validateAndSubmit({
            obj:this,
            moreParams:moreParams,
            validates:[
                {
                    'name':cellPhone,
                    'rules':
                        [
                            {
                                'rule':'isPhone',
                                'errorMsg':'必须为11为纯数字手机号'
                            }
                        ],
                    'paraName':'cellphone'
                }]
        });

    }
    //倒数
    lastSetTime(){
        let obj = this ;
         setTimeout(()=>{
            let time = obj.state.time;
            --time;
            if(time==0){
                obj.setState({time:120,resulte:{}});
            }else {
                obj.setState({time:time});
            }
        }, 1000);
    }
    render() {
        const sta=false ;
        return sta ? (
            <p className="public_btn public_otp public_pnt" id='times'>
                {this.state.time}
            </p>
        ):(
            <p className="public_btn public_otp public_pnt" onClick={this.otp.bind(this)} >
                获取验证码
            </p>
        );
    }
};



module.exports =  GetOtp;
