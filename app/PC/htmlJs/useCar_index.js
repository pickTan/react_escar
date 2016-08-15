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
import UseCarDownLine from '../component/UseCarDownLine';
import UseCarOnLine from '../component/UseCarOnLine';
import CurrentLocation from '../component/CurrentLocation';
import NavMenue from '../component/NavMenue';
import UrlTool from '../../tool/lib/UrlTool';
import $ from 'jquery';
import '../css/public.css';
import '../css/usercar.css';
import '../css/user_center.css';
import '../css/usercar_online.css';

class UseCar extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            useType:'useCarOnline'
        };
    }
        //切换
    toggle(obj){
        $('.recharge_way ul li.way_OT').removeClass('way_OT');
        obj == 'useCarOnline' ? $('.way_online').addClass('way_OT') : $('.way_transfer').addClass('way_OT');
        this.setState({useType:obj});
    }
    render() {
        const   currLct =[{name:'发起用车',url:''}],
                sourceRoot = `${(new UrlTool()).sourceRoot()}order/submit`,
                useType = this.state.useType =='useCarOnline' ?  <UseCarOnLine childReact={this} source={sourceRoot} /> : <UseCarDownLine  />;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            <div className="recharge_way">
                                <ul className="clearFix">
                                    <li className="way_online way_OT" onClick={this.toggle.bind(this,'useCarOnline')}  ><span>在线发起用车</span></li>
                                    <li className="way_transfer" onClick={this.toggle.bind(this,'useCarDownLine')} ><span>电话、QQ订车</span></li>
                                </ul>
                            </div>
                            {useType}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <UseCar   />,
    document.getElementById('content')
);
