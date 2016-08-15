/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import Post from '../../source/lib/Post';
import UrlTool from '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
import StaffAlterDetail from '../component/StaffAlterDetail';
/**
 * 充值
 */
class StaffDetail extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state ={
            id:(new UrlTool()).getValue('id'),
            alterType:'no', //yes为修改,no为不修改
            resulte : {}
        };
    }
    componentDidMount(){
        validateAndSubmit({obj:this,moreParams:{'id':this.state.id}});
    }
    //切换
    toggleLogin(){
       this.setState({alterType:'yes'});
    }
    diffDeal(rlt){
        rlt.credit = rlt.credit =='-1' ? '无限制': `￥${rlt.credit}`;
        rlt.remailCredit = rlt.remailCredit =='-1' ? '无限制': `￥${rlt.remailCredit}`;
        rlt.role = rlt.role=='E001' ?'管理员' : '普通员工';
        rlt.money = (rlt.money ==''|| rlt.money ==null)?'0' : `￥${rlt.money}`;
    }
    render() {
        const   sourceRoot = `${(new UrlTool()).sourceRoot()}employee/edit`,
                sta =this.state,
                rlt =sta.resulte;
                sta.alterType == 'no'?  this.diffDeal(rlt):'';
        return (sta.alterType == 'no' ?
            (
            <div className="staff_information_ss">
                <div className="staff_information_heads">
                    员工信息
                </div>
                <div className="staff_int_content">
                    <div className="clearfix" style={{overflow:'hidden'}}>
                        <ul>
                            <li>
                                <span>员工姓名：</span>
                               <label>{rlt.name}</label>
                                <em></em>
                                <span className="staff_master">{rlt.role}</span>
                            </li>
                            <li>
                                <span>员工编号：</span>
                                <label>{rlt.id}</label>
                            </li>
                            <li>
                                <span>月限制额度：</span>
                                <label>
                                    <b>{rlt.credit}</b>
                                </label>
                            </li>
                            <li><span>累计消费金额：</span>
                                <label><b>{rlt.money}</b></label>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>手机号：</span>
                                <label>{rlt.cellphone}</label>
                            </li>
                            <li>
                                <span>创建时间：</span>
                                <label>{rlt.createTime}</label>
                            </li>
                            <li>
                                <span>本月剩余额度：</span>
                                <label><b>{rlt.remailCredit}</b></label>
                            </li>
                            <li>
                                <span>备注：</span>
                               <label>{rlt.remark}</label>
                            </li>
                        </ul>
                    </div>
                    <p className="public_btn public_otp revise_int public_pnt" onClick={this.toggleLogin.bind(this)}>修改信息</p>
                </div>
            </div>
        ) : (
                <div>
                    <StaffAlterDetail source={sourceRoot}  obj={this} />
                </div>
            )
        );
    }
};
module.exports =  StaffDetail;
