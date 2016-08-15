/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
import '../css/pop.css'
/**
 * params :参数 {}
 * source 数据源
 * btnMsg : 按钮名称
 */
import PopPrompt from './PopPrompt' ;
class Booton extends   Component {
    constructor() {  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte: {}
        }
    }

    btnClick(){
        const params = this.props.params;
        validateAndSubmit({obj:this,moreParams:params});
    }
    render(){
        const  sta = this.state,
            rlt = sta.resulte,
            paramLst ={msg:rlt.msg ,note:'',img:'',btnArr:[{btnName:'确认'}]},
            btnMsg = this.props.btnMsg,
            popHtl = rlt.status_code != undefined   ?  <PopPrompt paramLst={paramLst}  obj={this} /> : '';
        return (
            <em>
                <button onClick={this.btnClick.bind(this)}>{btnMsg} </button>
                {popHtl}
            </em>
        )
    }

}
/**
 * 登录框组件
 */
class ConfirmLetter extends Component{
    constructor() {  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            params:(new UrlTool()).getUrlArgs(),
            resulte: {}
        }
    }
    componentDidMount(){
        const params = this.state.params;
        validateAndSubmit({obj:this,moreParams:params});
    }
    //弹框
    bounced(popName){
        this.setState({popControl:popName});
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }

    confirm(){
        let params = validate([
            {'name':'csOrderId','rules':[{'rule':'isEmpty','errorMsg':'订单号不能为空'}]}
        ]);
        alert(params.toString());

        let obj = this;
        Ajax.Get(obj,params);
    }

    render(){
        const reslute =  this.state.resulte ;
        const sourceConfirm = `${(new UrlTool()).sourceRoot()}clc/confirm`;
        const sourceCancel = `${(new UrlTool()).sourceRoot()}clc/cancel`;
        let sta = validateAndSubmit.errorCode(this);
        return sta?(
                <div className="wrap">
                    <h4 className="mdHead">
                        <span className="logo"></span>客户用车确认函
                    </h4>
                    <div className="content">
                        <ul className="clearfix">
                            <li>企业名称</li>
                            <li>{reslute.orderInfo.entName}</li>
                            <li>联络人</li>
                            <li>{reslute.orderInfo.psgName}</li>
                            <li>联系电话</li>
                            <li>{reslute.orderInfo.psgPhone}</li>
                            <li>服务类型</li>
                            <li>{reslute.orderInfo.productTypeId}</li>
                            <li>起点</li>
                            <li>{reslute.orderInfo.startDetailAddr}</li>
                            <li>终点</li>
                            <li>{reslute.orderInfo.endDetailAddr}</li>
                            <li>用车时间</li>
                            <li>{reslute.orderInfo.useCarTime}</li>
                            <li>预付费用</li>
                            <li>{reslute.orderInfo.orderPrice}</li>
                        </ul>
                        <ul className='remark clearfix'>
                            <li>备注</li>
                            <li>{reslute.orderInfo.des}{reslute.orderInfo.csOrderId}</li>
                        </ul>
                        <div className='btn'>
                          <Booton source={sourceConfirm} params={{csOrderId:reslute.orderInfo.csOrderId}}   btnMsg="确认" />
                          <a href="/recharge_index.html"><button >充值</button></a>
                          <Booton source={sourceCancel} params={{csOrderId:reslute.orderInfo.csOrderId}}   btnMsg="取消" />
                        </div>
                    </div>
                </div>

        ) : (
            <div>
                <div className="wrap">
                    <h4 className="mdHead">
                        <span className="logo"></span>{reslute.msg}
                    </h4>
                </div>
            </div>
        );
    }
};


module.exports =  ConfirmLetter;
