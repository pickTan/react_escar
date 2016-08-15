/**
 * Created by rong on 2016/7/8 0008.
 */
//equire('console-polyfill');
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import Footer from '../component/Footer';
import Head from '../component/Head';

import UrlTool from '../../tool/lib/UrlTool';

import '../css/public.css';
import '../css/recharage_success.css';
class UnionFrontRcvResponse extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }

    render() {
        const orderId = this.props.orderId,
            txnTime = this.props.txnTime,
            txnAmt = this.props.txnAmt,
            payResult = (this.state.respCode=='0' || this.state.respCode=='00') ?  "充值成功" : "--";
        return (
            <div>
                <Head />
            <div className="account_message">
                <div className="public_main clearfix">
                    <div className="public_nav">
                        <div className="nav_head">
                            <div className="public_personal">
                                <em></em>
                                <p>13788990000</p>
                                <p>企业管理员</p>
                            </div>
                        </div>
                        <div className="nav_content">
                            <ul>
                                <li className="clearfix"><em className="account_message"></em> <span>账户管理</span> <em className="arrow_right"></em></li>
                                <li className="clearfix"><em className="order_message"></em> <span>订单管理</span> <em className="arrow_right"></em></li>
                                <li className="clearfix"><em className="res_record"></em> <span>充值记录</span> <em className="arrow_right"></em></li>
                                <li className="clearfix"><em className="stamp_message"></em> <span>发票管理</span> <em className="arrow_right"></em></li>
                                <li className="clearfix"><em className="corporation_data"></em> <span>企业资料</span> <em className="arrow_right"></em></li>
                                <li className="clearfix"><em className="corporation_staff"></em> <span>企业员工</span> <em className="arrow_right"></em></li>

                            </ul>
                        </div>
                    </div>
                    <div className="public_content">
                        <p className="public_cur">当前：账户充值</p>
                        <div className="success_remark"><em></em> {payResult}!请不要关闭浏览器</div>
                        <div className="public_tab">
                            <ul className="success_tab">
                                <li className="clearfix success_title">
                                    <span>充值流水号</span>
                                    <span>充值时间</span>
                                    <span>充值金额</span>
                                    <span>交易结果</span>
                                    <span>充值方式</span>
                                </li>
                                <li className="clearfix">
                                    <span>{orderId}</span>
                                    <span>{txnTime}</span>
                                    <span>{txnAmt}</span>
                                    <span>{payResult}</span>
                                    <span>银联</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <UnionFrontRcvResponse />,
    document.getElementById('content')
);
