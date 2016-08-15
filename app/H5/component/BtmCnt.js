/**
 * Created by girl on 16/7/28.
 */
import React,{Component,PropTypes} from 'react';

/**
 *
 */
class BtmCnt extends Component {


    shouldComponentUpdate(nexProps,nexStates){
      return  this.props.btnFlag !== nexProps.btnFlag;
    }
    statesAndProps(){
        const props = this.props,
              className = props.className,
              onClick = props.onClick,
              btnName = props.btnName,
              loadName = `${props.loadName}...`,
              btnFlag = props.btnFlag;
        return {className:className,onClick:onClick,btnName:btnName,loadName:loadName,btnFlag:btnFlag};
    }
    submit(){
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
