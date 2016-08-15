/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import validateAndSubmit from './../js/validateAndSubmit';
/**
 * 企业资料
 */
class CorpMsg extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }
    componentDidMount(){
        validateAndSubmit({obj:this});
    }


    render(){
        const  sta = this.state,
               resulte=sta.resulte,
               authStatus= resulte.authStatus== '1' ? <b></b> : '';
        return(
            <div>
                <div className="msg_box">
                    <div className="msg_boxH"><h3>基本信息</h3></div>
                    <div className="msg_boxM">
                        <ul>
                            <li className="corp_ID">
                                <em>企业全称：</em>
                                <span>{resulte.name}</span>
                                {authStatus}
                            </li>
                            <li>
                                <em>注册时间：</em>
                                <span>{resulte.registerTime}</span>
                            </li>
                            <li>
                                <em>企业编号：</em>
                                <span>{resulte.enterpriseNo}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};
module.exports =  CorpMsg;
