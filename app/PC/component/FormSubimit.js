/**
 * Created by Administrator on 2016/7/7 0007.
 */
import React,{Component,PropTypes} from 'react';
import validateAndSubmit from   './../js/validateAndSubmit';
/**
 * formPrams {} 外部输入form表单请求参数
 * initPrams {} 内部查询请求参数 非必输
 * formId str 必输 提交id
 * action str 必输 请求路径
 * method str 非必输 默认post 请求方式
 * source 数据源 查询
 */
class FormSubimit extends Component{
    constructor(){
        super();
        this.state={
            resulte : {}
        }
    }

    componentDidMount(){
        const props = this.props,
              initPrams =  props.initPrams  == undefined ? {} : props.initPrams;
        validateAndSubmit({obj:this,moreParams:initPrams})
    }

    render(){
        const prop =this.props,
               sta =this.state,
               rlt =sta.resulte,
               formPrams = prop.formPrams == undefined ? rlt.fromData : prop.formPrams,
               id = prop.formId,
               action = prop.action == undefined  ? (rlt.actionUrl == undefined ? null : rlt.actionUrl) : prop.action,
               method = prop.method == undefined ? 'post' : prop.method;
        let  inputHtl =[];
        for(let key in formPrams){
            inputHtl.push(<input type="hidden" name={key} id={key} value={formPrams[key]}/>);
        }
        return(
            <form id ={id}  action={action} method={method} target="_blank">
                {inputHtl}
            </form>
        )
    }
}

module.exports =  FormSubimit;