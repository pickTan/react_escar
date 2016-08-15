/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import validateAndSubmit from './../js/validateAndSubmit';
import PopPrompt from './PopPrompt';
import UrlTool from '../../tool/lib/UrlTool';
/**
 * 企业资料
 */
class OrderDetail extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            id : (new UrlTool()).getValue('id'),
            resulte:{
            },
            Pop : 'close'
        };
    }
    componentDidMount(){
        }
    cancel(){
        validateAndSubmit({obj:this,moreParams:{'id':this.state.id}});

    }
    /**
     * 提示弹窗组建
     * msg : 提示语句
     * note :小字注释
     * img : 图片名称
     * btnArr : 按钮名称 数组[{btnName:'',btnUrl:'',btnClass:''},]
     * source : 接口名
     * obj this (state.Pop:open,close);
     * params:{}\[]\string 参数名
     */
    //弹框的访问接口
    popMsg(resulte){
        let source = (new UrlTool()).sourceRoot();
        const cancelTry =  this.state.resulte.status_code =='300',
              succPopParams = {'msg':'您的用车订单已成功取消，欢迎再次使用企业用车平台','note':'','img':'','btnArr':[{btnName:'好的',btnUrl:'',btnClass:''}],'source':'','params':''},
              errorPopParams = {'msg':resulte.msg,'note':'','img':'','btnArr':[{btnName:'好的',btnUrl:'',btnClass:''}],'params':''};
        return  cancelTry? {'msg':resulte.msg,'note':'','img':'','btnArr':[{btnName:'等待接驾'},{btnName:'确认取消'}],'source':`${source}order/cancelConfirmed`,'params':{id:this.state.id}}
            :   (validateAndSubmit.errorCode(this) ? succPopParams : errorPopParams);
       }

    render(){
        const  sta = this.state,
               resulte= sta.resulte,
               popParams= this.popMsg(resulte),
               paramLst = {msg:popParams.msg,note:popParams.note,img:popParams.img,btnArr:popParams.btnArr},
               //popHtl = sta.Pop == 'close' ? ''
               //    :
            popHtl = typeof(resulte.status_code) == 'undefined'
                          ? '': <PopPrompt obj={this} paramLst={paramLst}   source={popParams.source} params={popParams.params} />  ;
        return(
            <label className="public_pnt">
               <label onClick={this.cancel.bind(this)} >取消用车</label>
                {popHtl}
            </label>
        );
    }
};
module.exports =  OrderDetail;
