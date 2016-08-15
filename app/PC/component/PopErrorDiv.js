/**
 * Created by girl on 16/7/19.
 */
import React,{Component,PropTypes} from 'react';
/**
 * input类型弹框的报错层
 * obj 父层this 的
 * msg 提示信息
 *
 */
class PopErrorDiv extends Component {
    constructor(){
        super();
        this.state = {
            PopErrorCtl : false //* PopErrorCtl  控制器 false 关闭 true 呈现
        }
    }
    componentWillReceiveProps(nextProps){
        typeof(nextProps.msg) == 'undefined' || this.setState({PopErrorCtl:true})
    }
    propsAndState(){
        const props = this.props,
              msg =  props.msg,
              obj = props.obj,
              sta = this.state,
              PopErrorCtl = sta.PopErrorCtl;
        return {msg:msg,obj:obj,PopErrorCtl:PopErrorCtl}
    }

    cls(){
    this.setState({PopErrorCtl:false});
    }
    render(){
        const   propsAndState = this.propsAndState(),
                msg = `${propsAndState.msg},请重试!`,
                PopErrorCtl = propsAndState.PopErrorCtl;
        return PopErrorCtl
            ?(<div className="error_hint" >
                {msg}
                <em></em>
                <em className="error_cls" onClick={this.cls.bind(this)}></em>
            </div>)
            :(PopErrorCtl)
    }

}

module.exports = PopErrorDiv;
