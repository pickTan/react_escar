/**
 * Created by girl on 16/6/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validate from '../../validate/validate';
import CurrentLocation from '../component/CurrentLocation';
import DatePicker from '../component/DatePicker';
import TableCpt from '../component/TableCpt';
/**
 * 账户管理页面
 */
class ChargeRecord extends Component{
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
            {name:'begin'},
            {name:'status'},
            {paraName:'sn',name:'querySn'},
            {name:'end'}
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
        const   currLct =[{name:'充值记录',url:''}],
                sourceRoot = `${(new UrlTool()).sourceRoot()}pay/charge_notes`;
        return (
            <div className="public_content">
                <CurrentLocation currLct={currLct}  />
                <div className="search_box">
                    <ul className="clearFix">
                        <li>
                            <span style={{ display: 'inline-block',float: 'left',lineHeight: '30px'}}>充值时间：</span>
                            <DatePicker rmk="" type="2" name='begin' obj={this} />
                            <label style={{ display: 'inline-block',float: 'left',lineHeight: '30px',padding:'0 5px'}}>到</label>
                            <DatePicker rmk="" type="2" name='end' obj={this} />
                        </li>
                        <li><span>充值状态：</span>
                            <select name="status" style={{width:'60px',height:'28px',border:'1px solid #dedede'}} >
                                <option value="">全部</option>
                                <option value="5">处理中</option>
                                <option value="6">成功</option>
                                <option value="7">失败</option>
                            </select>
                        </li>
                        <li>
                            <span>充值流水号：</span><input type="text" name="querySn" className="recharge_inp record_num"/>
                        </li>
                        <li className="search_btn"><span className="public_btn recharge_search" onClick={this.search.bind(this)}>搜索</span></li>
                    </ul>
                </div>
                <TableCpt source={sourceRoot}  obj={this} listName="chargeList" params={this.state.params}  />
            </div>
        );
    }
};
module.exports =  ChargeRecord;
