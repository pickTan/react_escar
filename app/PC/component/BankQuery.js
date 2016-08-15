/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import validateAndSubmit from '../js/validateAndSubmit';
/**
 * 查询银行行别列表
 */
class BankQuery extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
                bankList:[{bankName:'工商银行',bank:'GSYH'},{bankName:'农业银行',bank:'NYYH'},{bankName:'招商银行',bank:'ZSYH'}]
            }
        };
    }
    shouldComponentUpdate(){
        return false;
    }
    componentDidMount(){
        //this.queryBank();
    }
    //查询帐号
    queryBank(){
        validateAndSubmit({obj:this});
    }
    render() {
        const bankLst = this.state.resulte.bankList;
        let optionMap =  bankLst.map((itm)=>{
           return  <option value={itm.bankNo} defaultValue >{itm.bankName}</option>
         });
        return(
            <div className="bank_select public_errMsg">
                <span>转账银行：</span>
                <select name="bank" id="">
                    <option  defaultValue >选择银行</option>
                    {optionMap}
                </select>
            </div>
        );
    }
};
module.exports =  BankQuery;
