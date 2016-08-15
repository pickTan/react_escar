/**
 * Created by Xing711 on 2016-07-12.
 */
import React,{Component,PropTypes} from 'react';
import $ from 'jquery';
import validateAndSubmit from '../js/validateAndSubmit';
/**
 * params : 提交的参数
 * inputType : 提交的数据类型 默认text
 * source : 数据源
 * inputName : 提交input的数据名
 * placeholder : 原数据
 * submitFlg : true 提交,fasle 不提交(默认值).放在父组件的this.submitFlg
 * obj : 父组建的this alterName 表示为一个标志:close 隐藏这个组建,'[string]'打开相应的组建
 */
class UserInput extends Component{
    constructor(){
        super();
        this.state = {
            resulte: {

            }
        };
    }

    shouldComponentUpdate(nextProps,nextState){
        const flg =  nextState.resulte.status_code =='000',
              fatherThis = this.props.obj;
        flg ? fatherThis.setState({alterName:'close',queryFlag:true}) : '';
        return !flg;
    }

    submit() {
        const  props = this.props,
               param = props.params,
               name =props.inputName,
               $name = `[name='${name}']`;
        param[name] = $($name).val();
        validateAndSubmit({
            obj: this,
            moreParams: param
        })
    }
    cancel(){
       const props =this.props,
             fatherThis = props.obj;
        fatherThis.setState({alterName:'close'})
    }
    render(){
            const props = this.props,
                  inputType = props.inputType == undefined ? 'text' :  props.inputType,
                  inputName = props.inputName ,
                  placeholder = props.placeholder;

        return(
            <label>
                <input type={inputType} name={inputName} placeholder={placeholder}  />
                <i onClick={this.submit.bind(this)} style={{width:'90px',marginRight:'10px',marginLeft:'5px'}}>确定</i>
                <i onClick={this.cancel.bind(this)} style={{width:'90px',background:'#ccc'}}>取消</i>
            </label>
        )
    }

}

module.exports = UserInput;

