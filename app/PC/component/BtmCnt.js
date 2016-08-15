/**
 * Created by girl on 16/7/28.
 */
import React,{Component,PropTypes} from 'react';

/**
 *
 */
class BtmCnt extends Component {
    constructor(){
        super();
        this.state={
            btnFlag:true
        }
    }
    componentWillReceiveProps(nexProps){
        (nexProps.random !== this.props.random) && this.setState({btnFlag:true});
    }

    statesAndProps(){
        const props = this.props,
              sta = this.state,
              className = props.className,
              onClick = props.onClick,
              btnName = props.btnName,
              loadName = `${props.loadName}...`,
              btnFlag = sta.btnFlag;
        return {className:className,onClick:onClick,btnName:btnName,loadName:loadName,btnFlag:btnFlag};
    }
    submit(){
        this.setState({btnFlag:false});
        const statesAndProps = this.statesAndProps();
        statesAndProps.onClick();
    }
    render(){
        const statesAndProps = this.statesAndProps();
        return statesAndProps.btnFlag ?(<p className={statesAndProps.className}  onClick={this.submit.bind(this)}>
            {statesAndProps.btnName}
        </p>) : (<p style={{'backgroundColor':'#CBCBCB','borderColor': '#DDDDDD'}} className={statesAndProps.className}>
            {statesAndProps.loadName}
        </p>)
    }
}
module.exports = BtmCnt;
