/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import validateAndSubmit from './../js/validateAndSubmit';
import PopInput from './PopInput';
import UrlTool from '../../tool/lib/UrlTool';
/**
 * 企业资料
 */
class ChargeDetail extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            id : (new UrlTool()).getValue('id'),
            resulte:{
            },
            popControl:'close' //弹框的控制(当为'succ'为请求成功,当为'close'时表示关闭,[String],为具体一个弹框)
        };
    }
    componentDidMount(){
        validateAndSubmit({obj:this,moreParams:{'id':this.state.id}});
    }

    //弹框
    bounced(popName){
        this.setState({popControl:popName});
    }

    /**
     * 差异化处理
     * @param result
     * @returns {*}
     */
    resultDeal(result){
        let resulte = result;
        switch (resulte.status){
                case 1 :
                case 2 :
                case 3 :
                case 4 :
                case 5 : resulte.status= '处理中'; break;
                case 6 : resulte.status= '成功'; break;
                case 7 : resulte.status= '失败'; break;
        }
        //1:线下充值,2:银联,3:微信支付,4:支付宝,100:其他
        switch (resulte.channel){
            case 1 :resulte.channel='线下充值'; break;
            case 2 :resulte.channel='银联'; break;
            case 3 :resulte.channel='微信支付'; break;
            case 4 :resulte.channel='支付宝'; break;
            case 100 : resulte.channel='其他';break;
        }
       return  resulte;
    }
    //<li className="complain" onClick={this.bounced.bind(this,'rechargeObjPop')} >发起异议</li>
    render(){
        const  sta = this.state,
            resulte=  this.resultDeal(sta.resulte),
            popName = sta.popControl,
            sourceRoot = `${(new UrlTool()).sourceRoot()}pay/dissent`,
            mesLst =[], //流水号
            bouncedHtl = popName == 'close' ? '' : <PopInput obj={this} type={popName} source={sourceRoot} params={mesLst}  />;
            return(
                <div>
                    <div className="detail_box">
                        <div className="detail_boxTop">
                            <ul className="clearFix">
                                <li>充值信息</li>

                            </ul>
                        </div>
                        <div className="detail_bottom">
                            <ul className="clearFix">
                                <li className="detail_bottomL">
                                    <ul>
                                        <li className="detail_num"><em>充值流水号：</em><span>{resulte.sn}</span></li>
                                        <li><em>充值员工：</em><span>{resulte.customerName}</span></li>
                                        <li><em>充值金额：</em><span>{resulte.money}</span></li>
                                        <li><em>充值状态：</em><span>{resulte.status}</span></li>
                                    </ul>
                                </li>
                                <li className="detail_bottomR">
                                    <ul>
                                        <li><em>充值时间：</em><span>{resulte.createTime}</span></li>
                                        <li><em>充值账号：</em><span>{resulte.userPhone}</span></li>
                                        <li><em>充值方式：</em><span>{resulte.channel}</span></li>
                                        <li><em>到账时间：</em><span>{resulte.receiveTime}</span></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                        {bouncedHtl}
                </div>
        );
    }
};
module.exports =  ChargeDetail;
