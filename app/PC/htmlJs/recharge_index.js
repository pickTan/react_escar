/**
 * Created by girl on 16/5/19.
 */
//require('es5-shim');
//require('es5-shim/es5-sham');
require('console-polyfill');
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';

import Footer from '../component/Footer';
import Head from '../component/Head';
import Recharge from '../component/Recharge';
import RechargePay from '../component/RechargePay';
import CurrentLocation from '../component/CurrentLocation';
import NavMenue from '../component/NavMenue';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/recharge_index.css';
import '../css/recharge_pay.css';
import '../css/recharge_transfer.css';

class Charge extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            payType:'Recharge',
            money:0
        };
    }
    render() {
        const   currLct =[{name:'账户充值',url:''}],
                sourceRoot = `${(new UrlTool()).sourceRoot()}pay/online/union_frontFrom`,
                payType = this.state.payType =='Recharge' ?  <Recharge childReact={this}  /> : <RechargePay childReact={this} money={this.state.money} source={sourceRoot} />;
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
    <Charge   />,
    document.getElementById('content')
);
