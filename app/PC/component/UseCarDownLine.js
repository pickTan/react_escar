/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
/**
 * 线下用车
 */
class UseCarDownLine extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }

    render(){
        return(
            <div>
                <div className="usecar_tip">您可通过以下方式发起用车需求</div>
                <div className="usecar_callBox">
                    <em></em>
                    <span>客服订车：&nbsp;400&nbsp;3333&nbsp;9999</span>
                </div>
            </div>
        );
    }
};
module.exports =  UseCarDownLine;
