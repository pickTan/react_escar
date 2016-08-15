/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import $ from 'jquery';
import validateAndSubmit from '../js/validateAndSubmit';
import UrlTool from  '../../tool/lib/UrlTool';
import FileTool from  '../../tool/lib/FileTool';
import BankQuery from './BankQuery';
import BtmCnt from  './BtmCnt';
/**
 * 线下支付组件
 */
class RechargeTransfer extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }
    componentDidMount(){

    }

    showFile(){
        FileTool({fileObj:'Member_headimg',previewObj:'preview',localImg:'localImag',width:100,height:100});
    }
    submit(){
        const flag = validateAndSubmit({
            obj:this,
            isCheck:true,
            validates:[
                    {name:'money','rules':[{'rule':'isMoney', 'errorMsg':'必须输入金额'}]},
                    {name:'bank','rules':[{'rule':'isEmpty', 'errorMsg':'请选择银行'}]},
                    {name:'file',isParam:false,'rules':[{'rule':'isImg', 'errorMsg':'请上传jpg|png|JPG|PNG格式的图片'}]}]
            });
        flag && $.ajaxFileUpload({
                url:"/escar/pay/do_upload",
                secureuri:false,
                fileElementId:'Member_headimg',                        //文件选择框的id属性
                dataType: 'json',
                date:flag,
                success: function (data) {
                    obj.setState({resulte:data});
                }
            });
    }

    render(){
        const sourceRoot = `${(new UrlTool()).sourceRoot()}pay/paybank`;
        return(
            <div>
                <div className="recharge_bank">企业划款账号</div>
                <div className="bank">
                    <ul className="clearFix">
                        <li>
                            <div className="bank_name">中国工商银行</div>
                            <div className="bank_num">6228&nbsp;4800&nbsp;8817&nbsp;2036&nbsp;021</div>
                            <div className="bank_owner">广州七一一科技有限公司</div>
                        </li>
                        <li>
                            <div className="bank_name">中国农业银行</div>
                            <div className="bank_num">6228&nbsp;4800&nbsp;8817&nbsp;2036&nbsp;021</div>
                            <div className="bank_owner">广州七一一科技有限公司</div>
                        </li>
                        <li>
                            <div className="bank_name">中国招商银行</div>
                            <div className="bank_num">6228&nbsp;4800&nbsp;8817&nbsp;2036&nbsp;021</div>
                            <div className="bank_owner">广州七一一科技有限公司</div>
                        </li>
                    </ul>
                </div>
                <div className="bank_form">
                    <BankQuery source={sourceRoot} />
                    <div className="transfer_money public_errMsg">
                        <span>转账金额：</span>
                        <input type="text" name="money"   />
                            <span>元</span>
                    </div>
                    <div className="transfer_prove clearFix public_errMsg">
                        <span>转账凭证：</span>
                        <ul className="clearFix">
                            <li className="prove_add" id="localImag"><img id="preview" className='public_hide' />  </li>
                            <li className="prove_tip">
                                <p>上传银行划账凭证，电子截图或纸质拍照均可</p>
                                <p>注：图片为JPG格式，限10M以内</p> <br/>
                                <input type="file" id="Member_headimg" name="file"  onChange={this.showFile.bind(this)} />
                            </li>

                        </ul>
                    </div>
                </div>
                <BtmCnt className="public_btn transfer_sure" onClick={this.submit.bind(this)} btnName="确认提交" loadName="提交中" random={Math.random()} />
            </div>
        );
    }
};
module.exports =  RechargeTransfer;
