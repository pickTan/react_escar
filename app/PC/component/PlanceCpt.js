/**
 * Created by girl on 16/7/6.
 */
import React,{Component,PropTypes} from 'react';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from  '../js/validateAndSubmit';
import $ from  'jquery';

/**
 * cityId : 城市id名称 name
 * type : 展示信息
 */
class PlanceCpt extends Component {
    constructor(){
        super();
        this.state={
            type: 1,
            resulte:{
                cities:[]
            }
        }
    };

    componentDidMount() {
        validateAndSubmit({obj: this});
    }

    cityList(){
        const sta = this.state,
              type = sta.type,
            rslt = sta.resulte,
            cities = rslt.cities,
            flag = validateAndSubmit.errorCode(this);
            //lst = (flag && type == 1) ? cities.map((item)=> {
            //    return item;
            //}): [];
        let cityLst = {};
        switch (type) {
            case 1 :
                cityLst = !flag ? [{name:'北京',id:'1'},{name:'上海',id:'2'} , {name:'广州',id:'3'}, {name:'深圳',id:'4'}] : cities;
                break;
            case 2 :
                cityLst = ['北京', '上海', '广州', '深圳'];
                break;
            case 3 :
                cityLst = ['北京', '上海', '广州', '深圳'];
                break;
            case 4 :
                cityLst = ['北京', '上海', '广州', '深圳'];
                break;
        }
        return cityLst;

    };

    choiceCityType(type){
        const props = this.props,
            cityId = props.cityId,
            $citiesUl =`#city${cityId} .city_list li.city_listT`,
            $citiesLi =`#city${cityId} .city_list`;
        $($citiesUl).removeClass('city_listT');
        $($citiesLi).eq(type).addClass('city_listT');
        this.setState({type:type+1});
    };

    choiceCity(i){
        const props = this.props,
            cityId = props.cityId,
            $citiesId =`#city${cityId}`,
            $cityId =`#${cityId}`,
            cityIdName = `#${props.name}`,
            cityName = $('ul.city_main li').eq(i).text(),
            cityIdValue = $('ul.city_main li').eq(i).attr('value');
        $($citiesId).addClass('public_hide');
        $($cityId).val(cityName);
        $(cityIdName).val(cityIdValue);
    }

    show(){
        const props = this.props,
            cityId = props.cityId,
            $citiesId =`#city${cityId}`;
            $($citiesId).removeClass('public_hide');
    }

    hide(){
        const props = this.props,
              cityId = props.cityId,
              $citiesId =`#city${cityId}`,
              $id =`#${cityId}`;
        $($citiesId).addClass('public_hide');
    }

    /**
     *
     * @returns {XML}
     */
    render() {
            const props = this.props,
                  cityId = props.cityId,
                  citiesId = `city${cityId}`,
                  cityLst = this.cityList(),
                  cityIdName = props.name,
                  cityHtl=cityLst.map((item,i)=>{
                    return  <li onClick={this.choiceCity.bind(this,i)}  value={item.id}  >{item.name}</li>
                    });
                  //cityLstHtl =props.type == 1 ?  (
                  //
                  //        <label>
                  //          <li onClick={this.choiceCityType.bind(this,2)} >FGHIJ</li>
                  //          <li onClick={this.choiceCityType.bind(this,3)} >KLMNO</li>
                  //          <li onClick={this.choiceCityType.bind(this,4)} >PQRST</li>
                  //          <li onClick={this.choiceCityType.bind(this,5)} >UVWXY</li>
                  //          <li onClick={this.choiceCityType.bind(this,6)} >Z</li>
                  //        </label>
                  //      ): '';
            return (
                <label>
                    <input name={cityIdName} id={cityIdName} type="hidden"  />
                    <input type="text"  id={cityId} className="inf_inp inf_sel inf_selBg" readOnly onMouseOver={this.show.bind(this)}  onMouseOut={this.hide.bind(this)} />
                    <div id={citiesId} className="cityStart_box public_hide" onMouseOver={this.show.bind(this)}  onMouseOut={this.hide.bind(this)} >
                        <b></b>
                        <ul className="city_list clearFix">
                            <li className="city_listT" onClick={this.choiceCityType.bind(this,0)} >热门城市</li>
                            <li >&nbsp;&nbsp;&nbsp;&nbsp;</li>
                            <li >&nbsp;&nbsp;&nbsp;&nbsp;</li>
                            <li >&nbsp;&nbsp;&nbsp;&nbsp;</li>
                            <li >&nbsp;&nbsp;&nbsp;&nbsp;</li>
                            <li >&nbsp;&nbsp;&nbsp;&nbsp;</li>
                            <li >&nbsp;</li>


                        </ul>
                        <ul  className="city_main clearFix">
                            {cityHtl}
                        </ul>
                        <input type="hidden" name={cityId} />
                    </div>
                </label>
            )
        }

}

module.exports = PlanceCpt;