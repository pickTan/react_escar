/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import Ajax from '../../source/ajax';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
import CurrentLocation from '../component/CurrentLocation';
import FormSubimit from '../component/FormSubimit';
import PopPrompt from './PopPrompt' ;
/**
 * 充值支付组件
 */
class RechargePay extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
        };
    }

    back(){
        this.props.childReact.setState({payType:'Recharge'});
    }
    //切换
    toggleLogin(obj){
        const  index=obj-1;
        $('[name="bankType"].pay_check').removeClass('pay_check');
        $('[name="bankType"]').eq(index).addClass('pay_check');
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    openNewPage(){
        //提交表单
        document.all.bankUnion.submit();
        //打开弹窗
        const paramLst ={msg:'支付遇到问题？' ,note:'',img:'',btnArr:[{btnName:'支付遇到问题？'}]},
            popHtl = <PopPrompt paramLst={paramLst}  obj={this} />;
        return (
            {popHtl}
        )
    }
    render() {

        const money = this.props.money,
            unionMoney = money * 100,    //生产环境要乘100，因为银联的单位是分，这里是元
            //unionMoney = money,        //仅限测试用
            sourceRoot = `${(new UrlTool()).sourceRoot()}pay/online/union_frontFrom`;
        return(
            <div>
                <div className="pay_money">
                    <em>充值金额：</em>&nbsp;<span>{money}</span>&nbsp;<em>元</em>
                    <div className="pay_back" onClick={this.back.bind(this)} >返回</div>
                </div>
                <div className="recharge_box">
                    <p className="pay_w">选择支付方式：</p>
                    <div className="pay_way">
                        <ul className="clearFix">
                            <li style={{display:'none'}} className="pay_check" name="bankType" value="1" onClick={this.toggleLogin.bind(this,1)}></li>
                            <li value="2"  name="bankType" onClick={this.toggleLogin.bind(this,2)} ></li>
                        </ul>
                    </div>
                    <span className="public_btn pay_next" onClick={this.openNewPage.bind(this)} >下一步</span>
                </div>
                <FormSubimit  initPrams={{money:unionMoney}} formId='bankUnion' source={sourceRoot}   />
            </div>
        );
    }
};
module.exports =  RechargePay;
