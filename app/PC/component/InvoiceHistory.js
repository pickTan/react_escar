/**
 * Created by girl on 16/6/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validate from '../../validate/validate';
import CurrentLocation from '../component/CurrentLocation';
import TableCpt from '../component/TableCpt';
/**
 * 账户管理页面
 */
class InvoiceHistory extends Component{
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
                {name:'expStatus'},
                {name:'invoiceNo'},
                {name:'expSn'}
            ],
            {'pageNo':1, 'pageSize':10}
        ).success;
        this.setState({params:params});
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    render() {
        const   sourceRoot = `${(new UrlTool()).sourceRoot()}invoice/history_list`;
        return (
            <div>
                <div className="invoice_right">
                    <span>快递状态：</span>　
                    <select name="expStatus" >
                        <option value="">全部</option>
                        <option value="0">未发出</option>
                        <option value="1">已发出</option>
                        <option value="2">已接收</option>
                    </select>　
                    <label> 发票号：</label>
                    <input type="text" name="invoiceNo" />　
                    <label>快递单号：</label>
                    <input type="text" name="expSn" />　　
                    <em></em>　
                    <p className="public_btn public_otp" onClick={this.search.bind(this)} >搜索</p>
                </div>
                <TableCpt source={sourceRoot}  obj={this} listName="invoiceHistoryList"  params={this.state.params}  />
            </div>
        );
    }
};
module.exports =  InvoiceHistory;
