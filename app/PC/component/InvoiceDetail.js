/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import Ajax from '../../source/ajax';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from  '../js/validateAndSubmit';
import CurrentLocation from '../component/CurrentLocation';
import TableCpt from '../component/TableCpt';
import PopInput from '../component/PopInput';
/**
 * 账户管理页面
 */
class Staff extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            id : (new UrlTool()).getValue('id'),
            resulte: {
                payOnlineList: []
            },
            popControl:'close' //弹框的控制(当为'succ'为请求成功,当为'close'时表示关闭,[String],为具体一个弹框)
        };
    }

    componentDidMount(){
        const id = this.state.id,
              moreParams ={'id':id};
        validateAndSubmit({
            obj:this,
            moreParams:moreParams,
            validates:[]
        });
    }

    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    //弹框
    bounced(popName){
        this.setState({popControl:popName});
    }
    //返回差异化处理
    rltDeal(rslt){
        let rlt =rslt;
        rlt.invType= rlt.invType == 1 ? '个人' : '企业';
        rlt.invoiceStatus= rlt.invoiceStatus == 0 ? '处理中' : '已开票';
        rlt.expStatus= rlt.expStatus == 0 ? '未发出' : (rlt.expStatus == 1 ? '已发出': '已接收' );
        return rlt;
    }
    render() {
        const source = (new UrlTool()).sourceRoot(),
              rootSource= `${source}invoice/dissent`,
              sta = this.state,
              rslt = this.rltDeal(sta.resulte),
              mesLst=[],
              bouncedHtl = sta.popControl == 'close' ? '' : <PopInput obj={this} type={sta.popControl} source={rootSource} params={mesLst}  />,
              lstHtl = !Array.isArray(rslt.payOnlineList) ? [] : rslt.payOnlineList.map((itm,i)=>{
                  return (
                      <li>
                          <span>{i+1}</span>
                          <span>{itm.sn}</span>
                          <span>{itm.receiveTime}</span>
                          <span>{itm.money}</span>
                          <span>{itm.customerName}</span>
                      </li>
                  )
              });
        //<span className="public_pnt" onClick={this.bounced.bind(this,'invObjPop')}>发起异议</span>
        return (
            <div>
                <div className="invoice_substance">
                    <div className="invoice_sub_head">
                        <label>发票内容</label>
                       </div>
                    <div className="invoice_sub_content">
                        <ul>
                            <li>
                                <span>发票号：</span>
                                <label>{rslt.invoiceNo}</label>
                            </li>
                            <li>
                                <span>发票抬头：</span>
                                <label>{rslt.title}</label>
                            </li>
                            <li>
                                <span>发票金额：</span>
                                <label>{rslt.money}</label>
                            </li>
                            <li>
                                <span>备注：</span>
                                <label>{rslt.invoiceRemark}</label>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>开票日期：</span>
                                <label>{rslt.billingTime}</label>
                            </li>
                            <li>
                                <span>发票种类：</span>
                                <label>{rslt.invType}</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="rec_message">
                    <li><label>充值信息(共</label><label>{}</label><label>笔)</label></li>
                    <li className="rec_title">
                        <span>编号</span>
                        <span>充值流水号</span>
                        <span>充值时间</span>
                        <span>充值金额</span>
                        <span>充值人员</span>
                    </li>
                    {lstHtl}
                </ul>

                <div className="invoice_substance">
                    <div className="invoice_sub_head">
                        申请信息
                    </div>
                    <div className="invoice_sub_content">
                        <ul>
                            <li>
                                <span>发票状态：</span>
                                <label>{rslt.invoiceStatus}</label>
                            </li>
                            <li>
                                <span>申请人：</span>
                                <label>{rslt.proposer}</label>
                            </li>
                            <li>
                                <span>开票金额：</span>
                                <label>{rslt.money}</label>
                            </li>
                            <li>
                                <span>电话：</span>
                                <label>{rslt.phone}</label>
                            </li>
                            <li>
                                <span>收件地址：</span>
                                <label>{rslt.addr}</label>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>申请日期：</span>
                                <label>{rslt.createTime}</label>
                            </li>
                            <li>
                                <span>充值总金额：</span>
                                <label>{rslt.money}</label>
                            </li>
                            <li>
                                <span>收件人：</span>
                                <label>{rslt.contactor}</label>
                            </li>
                            <li><span>所在地区：</span>
                                <label>{rslt.province+rslt.city+rslt.country}</label>
                            </li>
                            <li>
                                <span>急用：</span>
                                <label>{rslt.applyRemark}</label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="invoice_substance">
                    <div className="invoice_sub_head">
                        快递信息
                    </div>
                    <div className="invoice_sub_content">
                        <ul>
                            <li>
                                <span>开票人：</span>
                                <label>{rslt.billingMan}</label>
                            </li>
                            <li>
                                <span>快递状态：</span>
                                <label>{rslt.expStatus}</label>
                            </li>
                            <li>
                                <span>快递公司：</span>
                                <label>{rslt.expComName}</label>
                            </li>
                            <li>
                                <span>收件人：</span>
                                <label>{rslt.contactor}</label>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>开票日期：</span>
                                <label>{rslt.billingTime}</label>
                            </li>
                            <li>
                                <span>快递日期：</span>
                                <label>{rslt.expTime}</label>
                            </li>
                            <li>
                                <span>快递号：</span>
                                <label>{rslt.expSn}</label>
                            </li>
                            <li>
                                <span>备注：</span>
                                <label>{rslt.expRemark}</label>
                            </li>
                        </ul>
                    </div>
                </div>
                {bouncedHtl}
            </div>
        );
    }
};
module.exports =  Staff;
