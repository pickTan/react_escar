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
import InvoiceDetail from '../component/InvoiceDetail';
import NavMenue from '../component/NavMenue';
import CurrentLocation from '../component/CurrentLocation';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/invoice_detail.css';


class InvDetail extends Component{
    render() {
        const   currLct =[{name:'发票管理',url:'invoice_message.html'},{name:'发票详情',url:''}],
            sourceRoot = `${(new UrlTool()).sourceRoot()}/invoice/info`;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix" >
                        <NavMenue  menue="3" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            <InvoiceDetail source={sourceRoot} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <InvDetail   />,
    document.getElementById('content')
);
