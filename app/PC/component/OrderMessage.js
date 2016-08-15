/**
 * Created by asdfghj on 2016/6/27.
 */
import React,{Component,ProTypes} from 'react';
import ReactDom from 'React-dom';
import validateAndSubmit from '../js/validateAndSubmit';
import UrlTool from '../../tool/lib/UrlTool';
import validate from '../../validate/validate';
import CurrentLocation from '../component/CurrentLocation';
import TableCpt from '../component/TableCpt';

class OrderMessage extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            params:{
                'pageNo':1,
                'pageSize':10
            }
        };
    }
    //搜索
    search(){
        const params = validate([
                {name:'querySn',paraName:'sn'},
                {name:'keywordsName',paraName:'keywords'}
            ],
            {'pageNo':1,'pageSize':10}
        ).success;
        this.setState({params:params});
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    render() {
        const   currLct =[{name:'订单记录',url:''}],
            sourceRoot = `${(new UrlTool()).sourceRoot()}order/list`;
        return (
            <div className="public_content">
                <CurrentLocation currLct={currLct}  />
                <div className="order_right">
                    <span>订车员工姓名/手机号：</span>
                    <input type="text" name="keywordsName"/>
                    <span>订单号：</span>
                    <input type="text" name="querySn" />
                    <em></em>
                    <p className="public_btn public_otp" onClick={this.search.bind(this)} >搜索</p>
                </div>
                <TableCpt source={sourceRoot}  obj={this} listName="orderList" params={this.state.params}  />
            </div>
        );
    }
};
module.exports =  OrderMessage;

