/**
 * Created by girl on 16/6/21.
 */
require('console-polyfill');
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';

import Footer from '../component/Footer';
import Head from '../component/Head';
import CurrentLocation from '../component/CurrentLocation';
import NavMenue from '../component/NavMenue';
import UserInput from '../component/UserInput';
import UrlTool from '../../tool/lib/UrlTool';
import $ from 'jquery';
import validateAndSubmit from '../js/validateAndSubmit';
import '../css/public.css';
import '../css/user_center.css';

class UseCar extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            alterName: 'close',//"close"为关闭
            resulte:{},
            queryFlag:false //为false 的时候 不更新 ,为true的时候更新
        };
    }
    componentDidMount() {
       this.query();
    }

    shouldComponentUpdate(nextProps,nextState){
        const queryFlag= nextState.queryFlag;
       if (queryFlag){this.setState({queryFlag:false});this.query()}
        return !queryFlag;
    }

    query(){
        validateAndSubmit({obj:this});
    }
        //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }

    showInput(inputName){
        this.setState({alterName:inputName});
    }
    mapping(){
        const sta = this.state,
              resulte = sta.resulte;
        let operType =1;
             switch (sta.alterName){
                 case 'userName':operType=1;break;
                 case 'password	':operType=7;break;
                 case 'name':operType=2;break;
                 case 'weixin':operType=3;break;
                 case 'qq':operType=4;break;
                 case 'telephone':operType=5;break;
                 case 'email':operType=6;break;

             }
        return {placeholder:resulte[sta.alterName],inputName:sta.alterName,params:{operType:operType}}
    }

    htmlInput(alterName){
       const personal = this.mapping(),
             sta = this.state,
             root = (new UrlTool()).sourceRoot(),
             editRoot = `${root}personal/edit`,
             resulte = sta.resulte;
             resulte[alterName] = alterName=='password' ? '******' :resulte[alterName];
       const inputHtl = this.state.alterName == alterName ?<UserInput source={editRoot}
                                                            obj={this}
                                                            placeholder={personal.placeholder}
                                                            inputName={personal.inputName}
                                                            params={personal.params}   />:
                                                    <label>
                                                        <span>{resulte[alterName]}</span>
                                                        <i onClick={this.showInput.bind(this,alterName)}>设置</i>
                                                    </label>;
       return  inputHtl;
    }

//<span>{personal.userName}</span><i onClick = {this.showInput.bind(this,'alertName')}>设置</i>
    render() {
        const   currLct =[{name:'个人中心',url:''}];
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            <div className="msg_box user_msg">
                                <div className="msg_boxH"><h3>员工信息</h3></div>
                                <div className="msg_boxM">
                                    <ul>
                                        <li className="user_ID"><em>个人账号：</em><span>{this.state.resulte.cellphone}</span><b>{this.state.resulte.role}</b></li>
                                        <li><em>用户名：</em>{this.htmlInput('userName')}</li>
                                        <li className="user_pasw"><em>用户密码：</em>{this.htmlInput('password')}</li>
                                        <li className="user_name"><em>姓名：</em>{this.htmlInput('name')}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="msg_box user_account">
                                <div className="msg_boxH"><h3>关联账号</h3></div>
                                <div className="msg_boxM">
                                    <ul>
                                        <li><em>微信：</em>{this.htmlInput('weixin')}</li>
                                        <li className="user_Q"><em>QQ：</em>{this.htmlInput('qq')}</li>
                                        <li><em>固话：</em>{this.htmlInput('telephone')}</li>
                                        <li><em>邮箱：</em>{this.htmlInput('email')}</li>
                                    </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
const sourceRoot = `${(new UrlTool()).sourceRoot()}/personal/info`;
ReactDOM.render(
    <UseCar  source ={sourceRoot}   />,
    document.getElementById('content')
);
