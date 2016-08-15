/**
 * Created by girl on 16/6/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validate from '../../validate/validate';
import CurrentLocation from '../component/CurrentLocation';
import PopInput from '../component/PopInput';
import TableCpt from '../component/TableCpt';
import DatePicker from '../component/DatePicker';
/**
 * 账户管理页面
 */
class InvoiceMessage extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            showLst:[],
            params:{
                'pageNo':1,
                'pageSize':10
            },
            popControl : 'close'
        };
    }
    //搜索
    search(){
        const params = validate([
                {name:'begin'},
                {name:'querySn',paraName:'sn'},
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
    //弹框
    bounced(popName){
        const $checked = $('[name="checkId"]:checked'),
            length =  $checked.length;
        let ids='',
            moneys =0;
        for(let i=0;i<length;i++){
            const val = $checked.eq(i).attr("value"),
                  money = $checked.eq(i).parent().nextAll('.table_per').text();
            ids += i==0 ? val: `,${val}`;
            moneys+= parseFloat(money);
        }
        this.setState({popControl:popName,showLst:[moneys,length,ids]});
    }

    render() {
        let  money=0,
             ids = '';
        const   sta = this.state,
                sourceRoot = `${(new UrlTool()).sourceRoot()}invoice/list`,
                liStyle ={ height: '38px', lineHeight: '38px', width:'908px',paddingLeft:'20px',background:' #f9f9f9',    border: '1px solid #e6e6e6',overflow: 'hidden',display: 'inline-block',borderBottom:'none'},
                popSource = `${(new UrlTool()).sourceRoot()}invoice/add`,
                $check =$('input.checkId:checked'),
                count = $check.size()-1,
                moneys = $check.isArray ? $check.forEach((item,i)=>{
                    const  $itm =$check.eq(i);
                    money+=$itm.nextAll('dd.table_per').text();
                    ids+=`,${$itm.attr('value')}`;
                }) : '',
                showLst = sta.showLst,
                combinelvcHtl = sta.popControl =='combinelvc' ?  <PopInput source={popSource} type={sta.popControl} params={showLst} obj={this} /> : '';
        return (
            <div>
                <div className="invoice_right">
                    <span style={{ display: 'inline-block',float: 'left',lineHeight: '30px'}}>到账时间：</span>
                    <DatePicker rmk="" type="2" name='begin' obj={this} />
                    <label style={{ display: 'inline-block',float: 'left',lineHeight: '30px',padding:'0 5px'}}>到</label>
                    <DatePicker rmk="" type="2" name='end' obj={this} />　　　　
                    <label> 充值流水号：</label>
                    <input type="text" name="querySn" />　　
                    <em></em>　
                    <p className="public_btn public_otp" onClick={this.search.bind(this)} >搜索</p>
                </div>
                <ul className="invoice_tab" style={{marginBottom:'-20px'}}>
                    <li style={liStyle} >
                        <label>选中</label>
                        <strong id="count">0</strong>
                        <label>项</label>
                        <p className="public_btn public_otp make_invoice" onClick={this.bounced.bind(this,'combinelvc')} >开具发票</p>
                    </li>
                </ul>
                <TableCpt source={sourceRoot}  obj={this} listName="invoiceList" params={this.state.params}   />
                {combinelvcHtl}
            </div>
        );
    }
};
module.exports =  InvoiceMessage;
