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
import $ from 'jquery';
import InvoiceMessage from '../component/InvoiceMessage';
import InvoiceHistory from '../component/InvoiceHistory';
import NavMenue from '../component/NavMenue';
import CurrentLocation from '../component/CurrentLocation';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/invoiice_message.css';
import '../css/invoice_history.css';


class InvoiceRcd extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            InvoiceFlag:'InvoiceMessage' //切换标志
        };
    }
    //切换
    toggle(obj){
        $('ul.invoice_tabs li.invoice_tab_current').removeClass('invoice_tab_current');
        obj == 'InvoiceMessage' ? $('ul.invoice_tabs li').eq(0).addClass('invoice_tab_current') : $('ul.invoice_tabs li').eq(1).addClass('invoice_tab_current');
        this.setState({InvoiceFlag:obj});
    }
    render() {
        const   currLct =[{name:'发票管理',url:''}],
                sta = this.state,
                InvoiceHtl = sta.InvoiceFlag == 'InvoiceMessage' ? <InvoiceMessage  /> : <InvoiceHistory  />;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="3" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            <ul className="invoice_tabs clearfix">
                                <li className="invoice_tab_current" onClick={this.toggle.bind(this,'InvoiceMessage')} >
                                    <label>待开发票</label>
                                    <em></em>
                                    <span></span>
                                </li>
                                <li onClick={this.toggle.bind(this,'InvoiceHistory')}  >
                                    <label>开票历史</label>
                                    <em></em>
                                </li>

                            </ul>
                            {InvoiceHtl}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <InvoiceRcd   />,
    document.getElementById('content')
);
