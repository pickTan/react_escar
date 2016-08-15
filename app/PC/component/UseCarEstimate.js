/**
 * Created by girl on 16/7/7.
 */
import React,{Component,PropTypes} from 'react';
import validateAndSubmit from './../js/validateAndSubmit';

class UseCarEstimate extends Component{
    constructor(){
        super();
        this.state={
            resulte : {
                price:{
                estimatePriceArray:[]
                }
            }
        }
    }
    componentDidMount(){
        validateAndSubmit({
            obj: this,
            moreParams: this.props.params
        })
    }

    theStateDeal(){
        const sta = this.state,
              prop =this.props,
            rlt = sta.resulte.price,
            params = prop.params,
            carTypeId = params.carTypeId;
        validateAndSubmit.errorCode(this) && rlt.estimatePriceArray.map((item)=>{
             if(item.carTypeId == carTypeId){rlt.money = item.estimatePrice }
        });
        return validateAndSubmit.errorCode(this)? (
            <li className="inf_tit">
                <input type="hidden" name="estimateFlow" value={rlt.estimateFlow} />
                <input type="hidden" name="orderPrice" value={rlt.money} />
                <h3>
                    <label>预估费用</label>
                    <span>{rlt.money}</span>
                    <label>元</label>
                </h3>
                <em>
                    <label>车费预估</label>
                    <span>{rlt.money}</span>
                    <label>元，基础服务</label>
                    <span>0</span>
                    <label>元</label>
                </em>
            </li>
        ):(< label>1</label>);
    }
    render(){
        const rlts = this.theStateDeal();
        return (
              <label>
                    {rlts}
              </label>
        )
    }
}

module.exports = UseCarEstimate;
