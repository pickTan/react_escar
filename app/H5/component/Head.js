/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import '../../tool/lib/Cookie';
import UrlTool from '../../tool/lib/UrlTool';
/**
 * 页面公共尾部
 */
class Head extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
    }

    shouldComponentUpdate(){
        return false;
    }

    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }

    loginOut(){
        $.clearCookie();
        this.goto({url:'login.html'});
    }

    render() {
        const loginFlag = $.getCookie('role'),
              flag= (loginFlag == 'undefined' || loginFlag == null || loginFlag == '') ? 'head_Menu public_hide': 'head_Menu',
              ursName = $.cookie('ursName');
        return (
            <div className="head">
                <div className="public_main">
                    <ul className="head_logo">
                        <li></li>
                        <li className="clearFix">企业用车管理平台</li>
                    </ul>
                    <ul className={flag}>
                        <li className="public_btn head_btn public_pnt" onClick={this.goto.bind(this,{url:'useCar_index.html'})} >发起用车</li>
                        <li className="public_btn head_btn public_pnt" onClick={this.goto.bind(this,{url:'recharge_index.html'})}>充值</li>
                        <li className="head_ursMenu clearFix">
                            <em className='head_ursLogo'></em>
                            <span id="headUrsName">{ursName}<em className="head_downMenu"></em></span>
                            <div className="head_downMain">
                                <ul>
                                    <li onClick={this.goto.bind(this,{url:'user_index.html'})} >个人中心</li>
                                    <li onClick={this.loginOut.bind(this)}>退出</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

module.exports =  Head;
