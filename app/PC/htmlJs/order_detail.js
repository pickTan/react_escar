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
import OrderDetail from '../component/OrderDetail';
import CurrentLocation from '../component/CurrentLocation';
import NavMenue from '../component/NavMenue';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/order_detail.css';


class OrderDtl extends Component{
    render() {
        const   currLct =[{name:'订单记录',url:'order_message.html'},{name:'订单明细',url:''}],
            sourceRoot = `${(new UrlTool()).sourceRoot()}order/info`;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="1" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            <OrderDetail source={sourceRoot}  />
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
ReactDOM.render(
    <OrderDtl   />,
    document.getElementById('content')
);
