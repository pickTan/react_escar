/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import  '../../tool/lib/BoxTool';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from  '../js/validateAndSubmit';
import  './../css/pop.css';
/**
 * 提示弹窗组建
 * source : 接口名
 * obj this (state.Pop:open,close),;
 * userPop:启用Pop作为控制器 默认false 设置为true
 * paramLst {msg:[msg],note:[note],img:[img],btnArr:[{btnName:'',btnUrl:'',btnClass:''}]} btnUrl当有值时,就不会请求后台,而直接跳转;当btnUrl为undenfind时,就会请求后台
 *
 * params:{}\[]\string 参数名
 * succMsg : 有请求成功后二次弹框的提示语句
 */
class Pop extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }

    componentDidMount() {
        $.layer("#pop");
    }

    btnClick(url=false){
        const moreParams =this.props.params;
        url ? window.location.href=url
            : validateAndSubmit({
            obj:this,
            moreParams:moreParams,
            validates:[]
        });
    }

    loginCookie(){
        $.cookie('role',this.state.resulte.role);
        $.cookie('ursName',$('[name="cellphone"]').val());
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool(),
              role = this.state.resulte.role;
        typeof(role) =='undefined' || this.loginCookie();
        urlToll.goToUrl({url:url,obj:obj});
    }
     close(){
        const fatherThis = this.props.obj,
              userPop = this.props.userPop === true ;

         userPop ?fatherThis.setState({Pop:'close'}) :fatherThis.setState({Pop:'close',resulte:{}});
    }
     render(){
         const prop = this.props;
         let   paramLst = prop.paramLst;
         paramLst.note=paramLst.note== 'undefined' ? '' : paramLst.note;
         paramLst = typeof this.state.resulte.status_code != 'undefined'
                    ? {'msg':this.state.resulte.msg,'note':'','img':'','btnArr':[{btnName:'好的',btnUrl:'',btnClass:''}],'source':'','params':''}
                    : paramLst;
         paramLst.img = paramLst.img=='' ? 'register_fail' :paramLst.img;
         const btnHtl = paramLst.btnArr.length== 1 ? <li className="clearfix add_staff_btn">
                                                <p className="public_btn public_otp public_pnt remit_prompt_btn" onClick={this.close.bind(this)}  >{paramLst.btnArr[0].btnName}</p>
                                            </li>
                                            :
                                            <li className="clearfix add_staff_btn">
                                                <p className="public_btn public_otp add_staff_cancel" onClick={this.close.bind(this)} >{paramLst.btnArr[0].btnName}</p>
                                                <p className="public_btn public_otp add_staff_sure"onClick={this.btnClick.bind(this,paramLst.btnArr[1].btnUrl)} >{paramLst.btnArr[1].btnName}</p>
                                            </li>,
               flg = validateAndSubmit.errorCode(this) && prop.source.indexOf('login')>-1;
         return flg ? this.goto({url:'corporation_account.html'}) :(
             <div>
                 <div className="register_prompt" id="pop">
                     <div className="public_prompt">
                         提示
                     </div>
                     <ul className="register_prompt_content">
                         <li className={paramLst.img}></li>
                         <li className="prompt_explain">{paramLst.msg}</li>
                         <span className="prompt_attr">{paramLst.note}</span>
                         {btnHtl}
                         </ul>
                 </div>
                 <div id="layer"></div>
             </div>
         );
     }
};
module.exports =  Pop;
