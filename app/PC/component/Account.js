/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import $ from 'jquery';
import Ajax from '../../source/ajax';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
import CurrentLocation from './CurrentLocation';
/**
 * 账户管理页面
 */
class Account extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
                fund:{},
                emp:{},
                order:{}
            }
        };
    }

    componentDidMount(){
        const  params = {};
        validateAndSubmit({
            obj:this,
            moreParams:params
        })
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    render() {
        const   currLct =[{name:'企业账户管理',url:''}],
                sta = this.state.resulte,
                facil = '[授信企业]';
        return (
            <div className="" >
            <div className="public_content">
                <div className="account_content">
                    <CurrentLocation currLct={currLct} />
                    <div className="account_bank">
                        {sta.enterpriseName} <span>{facil}</span>
                    </div>
                    <ul className="message_line clearfix">
                        <li className="account_staff">
                            <div className="bank_message">
                                <span>{sta.totalCount}</span><br /><br />
                                <label>企业人员</label>
                            </div>
                            <em></em>
                        </li>
                        <li className="account_remain">
                            <div className="usable_remain">
                                <span>￥{sta.remainDeposit}</span><br /><br />
                                <label>&nbsp;&nbsp;账户可用余额</label>
                            </div>
                            <em></em>
                        </li>
                        <li className="account_total">
                            <div className="remain_money">
                                <span>￥{sta.useCarMoney}</span><br /><br />
                                <label>本月用车累计金额(元)</label>
                            </div>
                            <em></em>
                        </li>
                    </ul>
                    <div className="account_appoint clearfix">
                        <em className="account_accapt"></em>
                        <ul className="appoint_line">
                            <li className="appoint_phone">
                                <p>电话预约用车</p>
                                <span>400-3333-9999</span>
                                <em></em>
                            </li>
                            <li>
                                <p className="public_btn public_otp public_online public_pnt" onClick={this.goto.bind(this,{url:'useCar_index.html'})} ><em></em> 在线发起用车</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        );
    }
};
module.exports =  Account;
