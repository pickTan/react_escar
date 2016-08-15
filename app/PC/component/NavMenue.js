/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import UrlTool from  '../../tool/lib/UrlTool';
import $ from  'jquery';
/**
 * 菜单页面
 * menue {0:账户管理,1:订单管理,2:充值记录,3:发票管理,4:企业资料,5:企业员工.}
 */
class NavMenue extends Component{

    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }

    componentDidMount(){
        const current =this.props.menue;
        $('.nav_content ul li').eq(current).addClass('account_current');
        $.cookie('role')  == 'E002' ? $('.nav_content ul li').not('.E001').addClass('public_hide'):'';
    }

    shouldComponentUpdate(){
        return false;
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    render() {
        const ursName = $.cookie('ursName'),
              role = $.cookie('role')   == 'E001' ? '企业管理员' : '企业员工';
        return (
            <div className="public_nav">
                <div className="nav_head">
                    <div className="public_personal">
                        <em onClick={this.goto.bind(this,{url:'user_index.html'})} ></em>
                        <p>{ursName}</p>
                        <p>{role}</p>
                    </div>
                </div>
                <div className="nav_content">
                    <ul>
                        <li className="clearfix E001" onClick={this.goto.bind(this,{url:'corporation_account.html'})} >
                            <em className="account_message" ></em>
                            <span>账户管理</span>
                            <em className="arrow_right"></em>
                        </li>
                        <li className="clearfix E001" onClick={this.goto.bind(this,{url:'order_message.html'})} >
                            <em className="order_message" ></em>
                            <span>订单管理</span>
                            <em className="arrow_right"></em>
                        </li>
                        <li className="clearfix" onClick={this.goto.bind(this,{url:'recharge_record.html'})} >
                            <em className="res_record" ></em>
                            <span>充值记录</span>
                            <em className="arrow_right"></em>
                        </li>
                        <li className="clearfix" onClick={this.goto.bind(this,{url:'invoice_message.html'})} >
                            <em className="stamp_message"></em>
                            <span>发票管理</span>
                            <em className="arrow_right"></em>
                        </li>
                        <li className="clearfix E001" onClick={this.goto.bind(this,{url:'corp_msg.html'})} >
                            <em className="corporation_data"></em>
                            <span>企业资料</span>
                            <em className="arrow_right"></em>
                        </li>
                        <li className="clearfix" onClick={this.goto.bind(this,{url:'staff_index.html'})} >
                            <em className="corporation_staff"></em>
                            <span>企业员工</span>
                            <em className="arrow_right"></em>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

module.exports =  NavMenue;
