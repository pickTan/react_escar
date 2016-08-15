/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import Post from '../../source/lib/Post';
import UrlTool from '../../tool/lib/UrlTool';
import RechargeOnline from '../component/RechargeOnline';
import RechargeTransfer from '../component/RechargeTransfer';
/**
 * 充值
 */
class Recharge extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state ={
            payType:'RechargeOnline',
            result : {}
        };
    }
    //切换
    toggleLogin(obj){
        $('.recharge_way ul li.way_onlineT').removeClass('way_onlineT');
        obj == 'RechargeOnline' ? $('.way_online').addClass('way_onlineT') : $('.way_transfer').addClass('way_onlineT');
        this.setState({payType:obj});
    }
    render() {
        const   sourceRoot = `${(new UrlTool()).sourceRoot()}pay/charge_balance`,
                transferSource = `${(new UrlTool()).sourceRoot()}bank_Acc`,
                payType= this.state.payType == 'RechargeOnline' ? <RechargeOnline childReact={this.props.childReact} source={sourceRoot} />
                    : <RechargeTransfer childReact={this.props.childReact} source={transferSource}  />;

        return(
            <div>
                <div className="recharge_way">
                    <ul className="clearFix">
                        <li className="way_online way_onlineT" onClick={this.toggleLogin.bind(this,'RechargeOnline')} ><span>在线充值</span></li>
                        <li className="way_transfer" onClick={this.toggleLogin.bind(this,'RechargeTransfer')} ><span>银行转账</span></li>
                    </ul>
                </div>
                {payType}
            </div>
            );
    }
};
module.exports =  Recharge;
