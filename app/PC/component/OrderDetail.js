/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import validateAndSubmit from './../js/validateAndSubmit';
import PopInput from './PopInput';
import CancelBtn from './CancelBtn';
import UrlTool from '../../tool/lib/UrlTool';
/**
 * 企业资料
 */
class OrderDetail extends Component{
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
    //弹框的访问接口
    bouncedSource(popName){

        const sourceMp= {
            'addStaHtl' : `${source}employee/add`,
            'lotSetPop' : `${source}employee/batchEdit`
        };
        return sourceMp[popName];
    }
    /**
     * 差异化处理
     * @param result
     * @returns {*}
     */
    resultDeal(result){
        let resulte = result;
        switch (resulte.orderStatus){
            case -1 :
            case 1 :
            case 2 :resulte.orderStatus='未服务';break;
            case 3 :
            case 4 :
            case 5 :
            case 6 :
            case 7 : resulte.orderStatus= '服务中'; break;
            case 8 :
            case 9 : resulte.orderStatus= '已服务'; break;
        }
        //1:线下充值,2:银联,3:微信支付,4:支付宝,100:其他
        switch (resulte.serviceType){
            case 1 :resulte.serviceType='预约用车'; break;
            case 2 :resulte.serviceType='随叫随到'; break;
            case 3 :resulte.serviceType='接机'; break;
            case 4 :resulte.serviceType='送机'; break;
            case 5 : resulte.serviceType='接高铁';break;
            case 6 : resulte.serviceType='送高铁';break;
            case 7 : resulte.serviceType='日租';break;
            case 8 : resulte.serviceType='半日租';break;
        }
        switch (resulte.carType){
            case 1 :resulte.carType='经济型'; break;
            case 2 :resulte.carType='舒适型'; break;
            case 3 :resulte.carType='商务型'; break;
            case 4 :resulte.carType='豪华型'; break;
            case 5 : resulte.carType='大众型';break;
            case 6 : resulte.carType='送高铁';break;
            case 7 : resulte.carType='日租';break;
            case 8 : resulte.carType='半日租';break;
        }
        switch (parseInt(resulte.channel)){
            case 1 :resulte.channel='电话'; break;
            case 2 :resulte.channel='QQ'; break;
            case 3 :resulte.channel='微信'; break;
            case 4 :resulte.channel='在线'; break;
        }
        switch (resulte.payStatus){
            case 1 :resulte.payStatus='已付款'; break;
            case -1 : resulte.payStatus='';break;
            case 4 :resulte.payStatus='待付款'; break;
            case 2 :resulte.payStatus='待退款'; break;
            case 8 :resulte.payStatus='已退款'; break;
        }
        return  resulte;
    }
    render(){
        const   cancelSource = `${(new UrlTool()).sourceRoot()}order/cancelTry`,
                sta = this.state,
                resulte=  this.resultDeal(sta.resulte),
                popName = sta.popControl,
                cancelBtn=resulte.orderStatus=='未服务'?<CancelBtn source={cancelSource} /> :'',
                sourceRoot = `${(new UrlTool()).sourceRoot()}order/dissent`,
                mesLst =[], //流水号
                bouncedHtl = popName == 'close' ? '' : <PopInput obj={this} type={popName} source={sourceRoot} params={mesLst}  />;
        return(
            <div>
                <div className="order_new">
                    <div className="order_new_head">
                        <span>订单信息</span>
                        <div className="order_cancel">
                            {cancelBtn}
                            <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <label className="public_pnt" onClick={this.bounced.bind(this,'orderObjPop')}>发起异议</label>
                        </div>
                    </div>
                    <div className="order_new_content clearfix">
                        <ul>
                            <li>
                                <span>订单号：</span>
                                <label>{resulte.sn}</label>
                            </li>
                            <li>
                                <span>订单状态：</span>
                                <label>{resulte.orderStatus}</label>
                            </li>
                            <li>
                                <span>用车时间：</span>
                                <label>{resulte.expectedTime}</label>
                            </li>
                            <li>
                                <span>出发地址：</span>
                                <label>{resulte.addrFrom}</label>
                            </li>
                            <li>
                                <span>车型：</span>
                                <label>{resulte.carType}</label>
                            </li>
                            <li>
                                <span>订车员工：</span>
                                <label>{resulte.employeeName}</label>
                            </li>
                            <li>
                                <span>乘客姓名：</span>
                                <label>{resulte.psgName}</label>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>下单时间：</span>
                                <label>{resulte.createTime}</label>
                            </li>
                            <li>
                                <span>服务类型：</span>
                                <label>{resulte.serviceType}</label>
                            </li>
                            <li>
                                <span>终点地址：</span>
                                <label>{resulte.addrTo}</label>
                            </li>
                            <li>
                                <span>下单途径：</span>
                                <label>{resulte.channel}</label>
                            </li>
                            <li>
                                <span>订车账号：</span>
                                <label>{resulte.cellphone}</label>
                            </li>
                            <li><span>电话：</span>
                                <label>{resulte.psgCellphone}</label>
                            </li>
                            <li>
                                <span>备注：</span>
                                <label>{resulte.remark}</label>
                            </li>
                        </ul>
                    </div>

                    <div className="order_service">
                        <div className="order_service_head">
                            服务信息
                        </div>
                        <div className="order_new_content  clearfix">
                            <ul>
                                <li>
                                    <span>司机信息：</span>
                                    <label>{resulte.xxDriverName}</label>
                                </li>
                                <li>
                                    <span>订单金额：</span>
                                    <label>{resulte.realPrice}</label>
                                </li>
                                <li>
                                    <span>交易号：</span>
                                    <label>{resulte.sn}</label>
                                </li>
                                <li>
                                    <span>实际里程：</span>
                                    <label>{resulte.realKm}</label>
                                </li>
                                <li>
                                    <span>实际上车时间：</span>
                                    <label>{resulte.realUpDateTime}</label>
                                </li>

                            </ul>
                            <ul>
                                <li></li>
                                <li>
                                    <span>支付状态：</span>
                                    <label>{resulte.payStatus}</label>
                                </li>
                                <li>
                                    <span>支付金额：</span>
                                    <label>{resulte.realPayValue}</label>
                                </li>
                                <li>
                                    <span>实际用时：</span>
                                    <label>{resulte.realUseTime}</label>
                                </li>
                                <li>
                                    <span>实际下车时间：</span>
                                    <label>{resulte.realDownDateTime}</label>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                {bouncedHtl}
            </div>
        );
    }
};
module.exports =  OrderDetail;
