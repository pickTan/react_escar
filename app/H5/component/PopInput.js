/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import $ from 'jquery';
import '../../tool/lib/FileTool';
import  '../../tool/lib/BoxTool';
import  InputTool from '../../tool/lib/InputTool';
import  UrlTool from '../../tool/lib/UrlTool';
import validateAndSubmit from  '../js/validateAndSubmit';
import GetOtp from  './GetOtp';
import PopErrorDiv from './PopErrorDiv';
import Provinces from './Provinces';
import BtmCnt from './BtmCnt';
import  './../css/pop.css';

/**
 * 增加员工 的弹窗组建
 * obj this (state.popControl:弹框控制器 当为'succ'为请求成功,当为'close'时表示关闭);
 * type string (invObjPop:发票异常弹框,addStaHtl:增加用户的弹窗,
 *              combinelvc:合并发票,lotSetPop:批量设置额度,resetPsd:重置交易密码
 *              ,rechargeObjPop:充值发起异议;orderObjPop:充值发起异议,errorPop错误提示
 *              ,lotImportStaff 批量上传员工)
 * params [param1,param2] 从上到下,从左到右 顺序展示该数据
 *
 */
class PopInput extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }
    shouldComponentUpdate(nextProp,nextState){
        const rlt= nextState.resulte,
              flag = rlt.status_code =='000';
        if(flag){
            nextProp.obj.setState({popControl:'close'});
        }
        return !flag;

    }

    componentDidMount() {
        $.layer("#popAdd");
    }

    errorPop(){
        const sta =this.state,
              rsl = sta.resulte,
              msg = rsl.msg,
              note = rsl.status_code,
              imgClass = note=='000' ? 'register_success' :'register_fail';
        return(
            <div className="register_prompt" id="pop">
                <div className="public_prompt">
                    提示
                </div>
                <ul className="register_prompt_content">
                    <li className={imgClass}></li>
                    <li className="prompt_explain">{msg}</li>
                    <span className="prompt_attr">{note}</span>
                    <li className="clearfix add_staff_btn">
                        <p className="public_btn public_otp public_pnt remit_prompt_btn" onClick={this.cls.bind(this)}  >好的</p>
                    </li>
                </ul>
            </div>
        )
    }

    //单项选择框
    addChoiceChexBox({name='',index = 0}){
        InputTool.choiceChexBox({name:name,index:index});
    }
    //复值
    keUpValue({$id1='creditValue',$id2='creditKey'}){
        const  value = document.getElementById($id1).value;
        document.getElementById($id2).value = value;
    }
    //增加用户的弹窗
    addStaHtl(htl){
        return (
            <div className="add_pop_staff" id="popAdd">
                {htl}
                <div className="add_staff_head">
                    添加员工
                </div>
                <ul className="add_staff_content">
                    <li className="public_errMsg">
                        <span>员工姓名：</span>
                        <input type="text" placeholder="李四" name="name" />
                    </li>
                    <li>
                        <span>权限管理：</span>
                        <input type="checkbox" name="role" value="E001" defaultChecked className="choice" onClick={this.addChoiceChexBox.bind(this,{name:'role',index:0})} />
                        <label>普通员工</label>
                        <input type="checkbox" name="role" value="E002" onClick={this.addChoiceChexBox.bind(this,{name:'role',index:1})} />
                        <label>企业管理员</label>
                    </li>
                    <li className="public_errMsg" >
                        <span>手机号：</span>
                        <input type="text" placeholder="请输入11纯数字手机号" name="cellphone" />
                    </li>
                    <li className="public_errMsg">
                        <span>月限制金额：</span>
                        <input type="checkbox" className="choice" name="credit" defaultChecked  value='-1' onClick={this.addChoiceChexBox.bind(this,{name:'credit',index:0})}  />
                        <label>不限</label>
                        <input type="checkbox" name="credit" id="creditKey" value="" onClick={this.addChoiceChexBox.bind(this,{name:'credit',index:1})}   />
                        <label>限制</label>
                        <input type="text" className="limit_money" id="creditValue" onKeyUp={this.keUpValue.bind(this)} />
                        <label>元</label>
                    </li>
                    <li className="clearfix add_staff_btn">
                        <p className="public_btn public_pnt public_otp add_staff_cancel" onClick={this.cls.bind(this)}>取消</p>
                        <BtmCnt className="public_btn public_pnt public_otp add_staff_sure" onClick={this.btnClick.bind(this)} btnName="确定" loadName="提交中" random={Math.random()} />
                    </li>
                </ul>
            </div>
        )
    }

    import(){
        const flg =  validateAndSubmit({obj:this,isCheck:true,validates:[{name:'file',rules:[{rule:'isXlsx',errorMsg:'请上传xlsx或者excel'}]}]})
        const  obj =this;
        flg &&  $.ajaxFileUpload({
            url:"/escar/employee/import",
            secureuri:false,
            fileElementId:'Member_headimg',                        //文件选择框的id属性
            dataType: 'json',
            date:'',
            success: function (data) {
                obj.setState({resulte:data});
            }
        });
    }

    //批量上传文件
    lotImportStaff(htl){
        return(
            <div className="order_objection" id="popAdd">
                {htl}
                <div className="objection" style={{ backgroundColor: '#f7f7f7'}}>
                    批量上传
                </div>
                <ul className="objection_content re_object">
                    <li className="objection_explain public_errMsg">
                        <input type="file" id="Member_headimg" name="file" />
                    </li>
                    <li className="clearfix add_staff_btn">
                        <p className="public_btn public_pnt public_otp objection_cancel" onClick={this.cls.bind(this)}  >取消</p>
                        <p className="public_btn public_pnt public_otp objection_sure" onClick={this.import.bind(this)} >确定提交</p>
                    </li>
                </ul>
            </div>
        )
    }
    //充值异议弹框
    rechargeObjPop(htl){
        const fatherThis = this.props.obj,
              fatherSlt = fatherThis.state.resulte;
        return (
            <div className="order_objection" id="popAdd">
                {htl}
                <div className="objection" style={{ backgroundColor: '#f7f7f7'}}>
                    充值异议
                </div>
                <ul className="objection_content re_object">
                    <input type="hidden" name="id" value={fatherSlt.id} />
                    <li className="objection_explain">
                        <label>充值流水号：</label>
                        <label name='reason'>{fatherSlt.sn}</label>
                        <br />
                        <span>发票开具后如有异议，可申请复核</span>
                    </li>
                    <li>
                        <input type="checkbox" name="reason" className="choice" defaultChecked value="充值金额不对"  onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:0})} />　
                         <label>充值金额不对</label>
                    </li>
                    <li>
                        <input type="checkbox" name="reason" value="银行转账迟迟不到账"  onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:1})} />
                        <label>银行转账迟迟不到账</label>
                    </li>
                    <li className="re_fail">
                        <input type="checkbox" name="reason" value="企业用车平台显示充值失败 ，第三方支付平台显示已划款"  onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:2})} />　
                        <label>企业用车平台显示充值失败 ，第三方支付平台显示已划款</label>
                    </li>
                    <li className="clearfix add_staff_btn">
                        <p className="public_btn public_pnt public_otp objection_cancel" onClick={this.cls.bind(this)}  >取消</p>
                        <p className="public_btn public_pnt public_otp objection_sure" onClick={this.btnClick.bind(this)} >确定提交</p>
                    </li>
                </ul>
            </div>
        )
    }
    //充值异议弹框
    orderObjPop(htl){
        const fatherThis = this.props.obj,
            fatherSlt = fatherThis.state.resulte;
        return (
            <div className="order_objection" id="popAdd">
                {htl}
                <div className="objection">
                    发起异议
                </div>
                <ul className="objection_content">
                    <input type="hidden"  name="id" value={fatherSlt.id} />
                    <li className="objection_explain">
                       <label>发起异议后，客服将重新核实您的订单收费信息，并尽快向你反馈结果</label>
                    </li>
                    <li>
                        <input type="checkbox" name="reason" className="choice" defaultChecked value="取消订单扣款申请退还" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:0})} />
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;取消订单扣款申请退还</label>
                    </li>

                    <li>
                        <input type="checkbox" name="reason" value="路径不满意" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:1})} />
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;路径不满意</label></li>
                    <li>
                        <input type="checkbox" name="reason" value="付现金给司机" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:2})} />
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;付现金给司机</label></li>
                    <li>
                        <input type="checkbox" name="reason" value="未匹配优惠券" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:3})} />
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;未匹配优惠券</label></li>
                    <li>
                        <input type="checkbox" name="reason" value="里程有误" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:4})} />
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;里程有误</label>
                    </li>
                    <li>
                        <input type="checkbox" name="reason" value="手机关机无法定位导致数据误差" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:5})} />
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;手机关机无法定位导致数据误差</label>
                    </li>
                    <li className="clearfix add_staff_btn">
                        <p className="public_btn public_pnt public_otp objection_cancel"  onClick={this.cls.bind(this)} >取消</p>
                        <p className="public_btn public_pnt public_otp objection_sure" onClick={this.btnClick.bind(this)} >确定提交</p>
                    </li>
                </ul>
            </div>
        )
    }
    //发票异常弹框
    invObjPop(htl){
        const fatherThis = this.props.obj,
            fatherSlt = fatherThis.state.resulte;
    return (
        <div className="order_objection" id="popAdd">
            {htl}
            <div className="objection">
                发票异议
            </div>
            <input type="hidden" value={fatherSlt.invoiceNo} name="invoiceNo" />
        <ul className="objection_content">
            <li className="objection_explain">
                <label>发票号：</label>
                <label>{fatherSlt.invoiceNo}</label>
                <br />
                <span>发票开具后如有异议，可申请复核</span>
            </li>
            <li><input type="checkbox" defaultChecked name="reason" className="choice" value="开票金额不对" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:0})}  />　开票金额不对</li>
            <li><input type="checkbox" name="reason" value="开票的服务类型不对" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:1})}  />　开票的服务类型不对</li>
            <li><input type="checkbox" name="reason" value="发票号不对" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:2})}  />　发票号不对</li>
            <li><input type="checkbox" name="reason" value="发票抬头不对" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:3})}  />　发票抬头不对</li>
            <li><input type="checkbox" name="reason" value="发票迟迟未能收到" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:4})}  />　发票迟迟未能收到</li>
            <li><input type="checkbox" name="reason" value="发票送错地址" onClick={this.addChoiceChexBox.bind(this,{name:'reason',index:5})}  />　发票送错地址</li>
            <li className="clearfix add_staff_btn">
                <p className="public_btn public_pnt public_otp objection_cancel" onClick={this.cls.bind(this)} >取消</p>
                <p className="public_btn public_pnt public_otp objection_sure" onClick={this.btnClick.bind(this)} >确定提交</p>
            </li>
        </ul>
    </div>
    );
    }
    //设置秘密密码
    resetPsd(htl){
        const sourceRoot = `${(new UrlTool()).sourceRoot()}verifyCode`;
            return (
            <div className="new_password" id="popAdd" >
                {htl}
                <div className="new_password_head">
                    重设密码
                </div>
                <ul className="new_password_content">
                    <li className="public_errMsg">
                        <span>手机号：</span>
                        <input type="text" name="newCellphone"  />
                    </li>
                    <li className="new_indent_code public_errMsg">
                        <span>验证码：</span>
                        <input type="text" name="resetVerifyCode" />
                        <GetOtp source={sourceRoot} msmType="RESET_PWD" cellPhone="newCellphone"  />
                    </li>
                    <li className="public_errMsg">
                        <span>重设密码：</span>
                        <input type="password" name="newPassword" id="newPassword" placeholder="录入6-12位数字与字母" />
                    </li>
                    <li className="public_errMsg">
                        <span>确认密码：</span>
                        <input type="password" name="resetPsw" placeholder="录入6-12位数字与字母" />
                    </li>
                    <li className="clearfix add_staff_btn">
                        <p className="public_btn public_pnt public_otp add_staff_cancel" onClick={this.cls.bind(this)} >取消</p>
                        <BtmCnt className="public_btn public_pnt public_otp add_staff_sure" onClick={this.btnClick.bind(this)} btnName="确定" loadName="提交中" random={Math.random()} />
                    </li>
                </ul>
                <input type="hidden" value="7" name="operType" />
            </div>
        )
    }
    //合并发票
    combinelvc(htl){
        const params = this.props.params ,
              msg1 = <li className="combine_invoice_content_h">
                          <label> 充值总金额:</label>
                          <span>{params[0]}</span>
                          <label>元，共</label><label>{params[1]}</label><label>笔</label>
                      </li> ,
              msg2 = <li>
                          <span>发票金额：&nbsp;&nbsp;</span>
                          <label >{params[0]}</label><label>元</label>
                      </li>;
        return (
            <div className="combine_invoice" id="popAdd">
                {htl}
                <div className="combine_invoice_head">
                    合并开票
                </div>
                <input type="hidden" name="ids" value={params[2] } />
                <input type="hidden" name="amount" value={params[0] } />
                <ul className="combine_invoice_content">
                    {msg1}
                    {msg2}
                    <li>
                        <span>发票种类：</span>
                        <select name="invType" >
                            <option value="01">客运服务费</option>
                        </select>
                    </li>
                    <li className="public_errMsg">
                        <span>收票人：</span>
                        <input type="text" name="contactor" />
                    </li>
                    <li className="public_errMsg">
                        <span>收票人电话：</span>
                        <input type="text" name="phone" />
                    </li>
                    <Provinces />
                    <li className="public_errMsg">
                        <span>收票地址：</span>
                        <input type="text" name="addr" />
                    </li>
                    <li className="public_errMsg">
                        <span>邮政编码：</span>
                        <input name="postCode" type="text" />
                    </li>
                    <li>
                        <span>备注：</span>
                        <input type="text" name="remark" />
                    </li>
                    <li className="invoice_remark">注：如需要延后开票日期，须备注说明时间</li>
                    <li className="clearfix add_staff_btn">
                        <p className="public_btn public_pnt public_otp add_staff_cancel" onClick={this.cls.bind(this)}>取消</p>
                        <BtmCnt className="public_btn public_pnt public_otp add_staff_sure" onClick={this.btnClick.bind(this)} btnName="确定" loadName="提交中" random={Math.random()} />
                    </li>
                </ul>
            </div>
        );
    }
    //批量设置月额度
    lotSetPop(htl){
        const prop = this.props,
              params = prop.params,
              msg = `已选中${params[0]}名员工，设置月限制金额之后，选定员工将统一修改`;
        return (<div className="lot_set" id="popAdd">
            {htl}
            <div className="lot_set_head">
                批量设置月限制金额
            </div>
            <ul className="lot_set_content">
                <li className="lot_set_content_h" >{msg}</li>
                <input type="hidden" name="ids"  value={params[1]} />
                <li className="public_errMsg">
                    <span>批量设置每月限制金额：</span>
                    <input type="checkbox" value="-1"  className="choice" defaultChecked name="credit"  onClick={this.addChoiceChexBox.bind(this,{name:'credit',index:0})}   />
                    <label>不限</label>
                    <input type="checkbox" name="credit" id="creditKey"  onClick={this.addChoiceChexBox.bind(this,{name:'credit',index:1})}  />
                    <label>限制</label>
                    <input type="text" id="creditValue"    onKeyUp={this.keUpValue.bind(this)} />
                    <label>元</label>
                    <input name="operType" type="hidden" value="4"  />
                </li>
                <li className="clearfix add_staff_btn">
                    <p className="public_btn public_pnt public_otp add_staff_cancel" onClick={this.cls.bind(this)}>取消</p>
                    <BtmCnt className="public_btn public_pnt public_otp add_staff_sure" onClick={this.btnClick.bind(this)} btnName="确定" loadName="提交中" random={Math.random()} />
                </li>
            </ul>
        </div>)
    }
    //点击提交
    btnClick(){
        const moreParams ={},
              prop = this.props,
              type = prop.type,
              validates  =this.validate(type);
        validateAndSubmit({
            obj:this,
            moreParams:moreParams,
            validates:validates
        });
    }
    //关闭弹窗
    cls(){
        const sta = this.props.obj;
        sta.setState({popControl:'close'});
    }
    validate(type){
        const validate = {
            invObjPop:[
                {'name':'invoiceNo'},
                {'name':'reason','checkClass':'choice'}
                ],
            addStaHtl:[
                {'name':'name', 'rules': [{'rule':'isEmpty', 'errorMsg':'姓名不能为空'}]},
                {'name':'role','checkClass':'choice', 'rules': [{'rule':'isEmpty', 'errorMsg':'用户名不能为空'}]},
                {'name':'cellphone', 'rules': [{'rule':'isEmpty', 'errorMsg':'用户名不能为空'}]},
                {'name':'credit','checkClass':'choice', 'rules': [{'rule':'isEmpty', 'errorMsg':'用户名不能为空'}]}
            ],
            combinelvc: [
                {'name':'ids'},
                {'name':'amount'},
                {'name':'invType'},
                {'name':'province'},
                {'name':'city'},
                {'name':'country'},
                {'name':'remark'},
                {'name':'contactor', 'rules': [{'rule':'isEmpty', 'errorMsg':'收件人不能为空'}]},
                {'name':'phone', 'rules': [{'rule':'isPhone', 'errorMsg':'必须为11位手机号'}]},
                {'name':'addr', 'rules': [{'rule':'isEmpty', 'errorMsg':'地址不能为空'}]},
                {'name':'postCode', 'rules': [{'rule':'isEmpty', 'errorMsg':'邮编不能为空'}]}
            ],
            lotSetPop:[
                {'name':'ids'},
                {'name':'operType'},
                {'name':'credit','checkClass':'choice', 'rules': [{'rule':'isEmpty', 'errorMsg':'金额不能为空'}]}
            ],
            resetPsd:[
                {'name':'newPassword','paraName':'password', 'rules': [{'rule':'isPassword', 'errorMsg':'密码必须为6-16位字母加数字'}]},
                {'name':'newCellphone','paraName':'cellphone', 'rules': [{'rule':'isPhone', 'errorMsg':'必须为11位纯数字手机号'}]},
                {'name':'resetVerifyCode','paraName':'verifyCode', 'rules': [{'rule':'isOtpNum', 'errorMsg':'必须为4位纯数字验证码'}]},
                {'name':'resetPsw','isParam':false,'rules': [{'rule':'contrast', 'errorMsg':'需与新密码保持一致',prepId:'newPassword'},{'rule':'isEmpty', 'errorMsg':'确认密码不能为空'}]}
            ],
            rechargeObjPop:[
                {'name':'id'},
                {'name':'reason','checkClass':'choice'}
            ],
            orderObjPop :[
                {'name':'id'},
                {'name':'reason','checkClass':'choice'}
            ]
        };
        return validate[type];
    }
    //html筛选器
    htl(type,htl=''){
        return this[type](htl);
    }



    render(){
        const prop = this.props,
              sta =this.state,
              rsl = sta.resulte,
              status = rsl.status_code =='000',
              errorDIv =  <PopErrorDiv msg={rsl.msg} />,
              type = status ? 'errorPop' : prop.type,//type (invObjPop:发票异常弹框,addStaHtl:增加用户的弹窗,combinelvc:合并发票)
              popHtl =this.htl(type,errorDIv);
        return (
            <div>
                {popHtl}
                <div id="layer"></div>
            </div>
        );
    }
};
module.exports =  PopInput;
