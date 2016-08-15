/**
 * Created by asdfghj on 2016/6/27.
 */
//require('es5-shim');
//require('es5-shim/es5-sham');
require('console-polyfill');
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import Footer from '../component/Footer';
import Head from '../component/Head';
import NavMenue from '../component/NavMenue';
import Order from '../component/OrderMessage';
import '../css/public.css';
import '../css/order_message.css';

class OrderMessage extends Component {
    render() {
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue menue="1"/>
                        <Order   />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
;

ReactDOM.render(
    <OrderMessage   />,
    document.getElementById('content')
);