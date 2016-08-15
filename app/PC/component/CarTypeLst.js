/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from './../js/validateAndSubmit';
/**
 *车类型查询
 */
class CarTypeLst extends Component{
    constructor(){
        super();
        this.state = {
            resulte:{
                carTypes:[]
            }
        };
    }
    componentDidMount(){
        this.queryCarType();
    }
    queryCarType(){
        validateAndSubmit({obj:this,moreParams: this.props.params})
    }
    choice(i) {
        $(".carType.carMol_T").removeClass('carMol_T');
        $(".carType").eq(i).addClass('carMol_T');
        const  faThis = this.props.obj;
        faThis.updateState(['isStimate']);
    }
    render() {
        const carLst = this.state.resulte.carTypes;
        let lsc = validateAndSubmit.errorCode(this) ? carLst.map(
            (itm,i)=>{
               const classStyle = i == 0  ? `carMol_${i+1} carMol_T carType` : `carMol_${i} carType`;
                return (
                    <li className={classStyle} onClick={this.choice.bind(this,i)} name="carTypeId" value={itm.car_type_id}  >
                        <div className="carMol_name">{itm.car_name}</div>
                        <div className="carMol_price">{itm.day_starting_price}元起步&nbsp;{itm.day_journey_price}元/公里</div>
                    </li>
                )

            }):[];
        return (
            <ul className="carMol_inf clearFix">
                <li className="inf_tit"><h3 className="cur">车型信息</h3></li>
                {lsc}
            </ul>
        );
    }
};

module.exports =  CarTypeLst;
