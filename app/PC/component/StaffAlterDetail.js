/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import UrlTool from '../../tool/lib/UrlTool';
import validateAndSubmit from  '../js/validateAndSubmit';
/**
 * 充值
 * staffNo 员工编号
 */
class StaffDetail extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state ={
            id:(new UrlTool()).getValue('id'),
            resulte : {
                status_code:''
            }
        };
    }

    alterStaff(){
        validateAndSubmit({
            obj:this,
            moreParams:{'id':this.state.id},
            validates:  [
                {'name':'name', 'rules': [{'rule':'isEmpty', 'errorMsg':'姓名不能为空'}]},
                {'name':'role' },
                {'name':'cellphone', 'rules': [{'rule':'isEmpty', 'errorMsg':'手机号不能为空'}]},
                {'name':'credit', 'rules': [{'rule':'isEmpty', 'errorMsg':'月额度不能为空'}]}
            ]

        });
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    //切换
    //toggleLogin(obj){
    //    $('.recharge_way ul li.way_onlineT').removeClass('way_onlineT');
    //    obj == 'RechargeOnline' ? $('.way_online').addClass('way_onlineT') : $('.way_transfer').addClass('way_onlineT');
    //    this.setState({payType:obj});
    //}
    render() {
        const fatherThis = this.props.obj,
              rst = fatherThis.state.resulte;

        return validateAndSubmit.errorCode(this)?(this.goto({url:'staff_index.html'})):(
            <div className="staff_information">
                <div className="staff_information_head">
                    员工信息
                </div>
                <ul className="staff_information_cont">
                    <li className="public_errMsg">
                        <span>员工姓名：</span>
                        <input type="text" name="name" placeholder={rst.name} />
                        <span>手机号：</span>
                        <input type="text" name="cellphone" placeholder={rst.cellphone} />
                    </li>
                    <li className="public_errMsg">
                        <span>月限制金额：</span>
                        <input type="text" name="credit" placeholder={rst.credit} />
                        <label>元</label>
                        <span> 员工编号：</span>
                        <label >{this.state.id}</label>
                    </li>
                    <li className="public_errMsg">
                        <span>等级管理：</span>
                        <select name="role">
                            <option value="E001">管理员</option>
                            <option value="E002">普通员工</option>
                        </select>
                    </li>
                    <li className="public_errMsg">
                        <span>备注：</span>
                        <input type="text" className="staff_int_remark" />
                    </li>
                    <li>
                        <p className="public_btn public_pnt public_otp staff_revise" onClick={this.alterStaff.bind(this)} >确认修改</p>
                    </li>
                </ul>
            </div>
        );
    }
};
module.exports =  StaffDetail;
