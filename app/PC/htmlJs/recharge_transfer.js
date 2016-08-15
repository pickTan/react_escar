/**
 * Created by rong on 2016/7/8 0008.
 */
require('console-polyfill');
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';

import Footer from '../component/Footer';
import Head from '../component/Head';
import Recharge from '../component/RechargeOffline';
import RechargePay from '../component/RechargePay';
import CurrentLocation from '../component/CurrentLocation';
import NavMenue from '../component/NavMenue';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/recharge_index.css';
import '../css/recharge_pay.css';
import '../css/recharge_transfer.css';

class UnionFrontRcvResponse extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            payType:'RechargeOffline',
            money:0
        };
    }
    render() {
        const   currLct =[{name:'账户充值',url:''}],
            sourceRoot = `${(new UrlTool()).sourceRoot()}pay/offline/`,
            payType = this.state.payType=='RechargeOffline' ?  <RechargeOffline childReact={this}  /> : <RechargePay childReact={this} money={this.state.money} source={sourceRoot} />;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="0" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            {payType}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <UnionFrontRcvResponse   />,
    document.getElementById('content')
);
