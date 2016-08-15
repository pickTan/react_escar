/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import Post from '../../source/lib/Post';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
/**
 * 在线充值页面
 */
class RechargeOnline extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }
    componentDidMount(){
        this.queryBalance();
    }
    //查询余额
    queryBalance(){
        Post(this);
    }
    //下一页
    goToPay(){
     const flag = validateAndSubmit({
            obj:this,
            isCheck:true,
            moreParams:{payType:'RechargePay'},
            validates :[{
                        'name':'money',
                        'rules':
                            [{
                                    'rule':'isEmpty',
                                    'errorMsg':'金额不能为空 '
                                }
                                ,{
                                    'rule':'isMoney',
                                    'errorMsg':'请输入正确的金额'
                                }
                                ,{
                                    'rule':'300more1000000',
                                    'errorMsg':'请输入大于300的金额'
                                }]
                        }]
        });
        flag && this.props.childReact.setState(flag);
    }

    render() {
        const remainDeposit = this.state.resulte.remainDeposit;
        return(
            <div className="recharge_box">
                <div className="recharge_money public_errMsg">
                    <span>充值金额:</span>
                    <input type="text" name="money" />
                </div>
                <div className="recharge_tip">注：充值金额须300元或以上</div>
                <span className="public_btn recharge_sure" onClick={this.goToPay.bind(this)} >确认充值</span>
                <div className="account_money"><em>当前账户余额：</em>&nbsp;<span>{remainDeposit}</span>&nbsp;<em>元</em></div>
            </div>
        );
    }
};
module.exports =  RechargeOnline;
