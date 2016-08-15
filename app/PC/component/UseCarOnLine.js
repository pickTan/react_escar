/**
 * Created by girl on 16/6/21.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import validateAndSubmit from '../js/validateAndSubmit';
import UrlTool from  '../../tool/lib/UrlTool';
import JsonTool from  '../../tool/lib/JsonTool';
import CarTypeLst from './CarTypeLst';
import DatePicker from './DatePicker';
import PlaceSearch from './PlaceSearch';
import UseCarEstimate from './UseCarEstimate';
import PopPrompt from './PopPrompt';
import BtmCnt from './BtmCnt';
/**
 * 线上用车页面
 */
class UseCarOnLine extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            isStimat : false,  //预估价格的控制器
            isCarType : false, //车型的控制器
            resulte:{
            }
        };
    }
    componentDidMount(){
        const remote_ip_info = {"ret":1,"start":-1,"end":-1,"country":"\u4e2d\u56fd","province":"\u5e7f\u4e1c","city":"\u5e7f\u5dde","district":"","isp":"","type":"","desc":""};
        const useIpGetCity = remote_ip_info;
        $('#startcity,#endcity').val(useIpGetCity.city);
        var citys = [{"baiduCode":131,"centerLat":39.894897,"centerLng":116.392021,"firstPy":"BJ","id":1,"isHot":1,"isOpen":1,"name":"北京"},{"baiduCode":158,"centerLat":28.197995,"centerLng":112.997968,"firstPy":"CS","id":14,"isHot":1,"isOpen":1,"name":"长沙"},{"baiduCode":201,"centerLat":23.661812,"centerLng":116.630076,"firstPy":"CZ","id":73,"isHot":0,"isOpen":0,"name":"潮州"},{"baiduCode":119,"centerLat":23.021812,"centerLng":113.751869,"firstPy":"DG","id":11,"isHot":1,"isOpen":1,"name":"东莞"},{"baiduCode":138,"centerLat":23.028576,"centerLng":113.130577,"firstPy":"FS","id":50,"isHot":0,"isOpen":1,"name":"佛山"},{"baiduCode":257,"centerLat":23.118783,"centerLng":113.353272,"firstPy":"GZ","id":3,"isHot":1,"isOpen":1,"name":"广州"},{"baiduCode":200,"centerLat":23.757251,"centerLng":114.713721,"firstPy":"HY","id":82,"isHot":0,"isOpen":0,"name":"河源"},{"baiduCode":301,"centerLat":23.118592,"centerLng":114.418994,"firstPy":"HZ","id":51,"isHot":1,"isOpen":1,"name":"惠州"},{"baiduCode":302,"centerLat":22.575117,"centerLng":113.078125,"firstPy":"JM","id":71,"isHot":0,"isOpen":0,"name":"江门"},{"baiduCode":259,"centerLat":23.547999,"centerLng":116.379501,"firstPy":"JY","id":74,"isHot":0,"isOpen":0,"name":"揭阳"},{"baiduCode":139,"centerLat":21.668226,"centerLng":110.931245,"firstPy":"MM","id":77,"isHot":0,"isOpen":0,"name":"茂名"},{"baiduCode":141,"centerLat":24.304571,"centerLng":116.126403,"firstPy":"MZ","id":81,"isHot":0,"isOpen":0,"name":"梅州"},{"baiduCode":197,"centerLat":23.688231,"centerLng":113.062619,"firstPy":"QY","id":54,"isHot":0,"isOpen":0,"name":"清远"},{"baiduCode":137,"centerLat":24.80296,"centerLng":113.594461,"firstPy":"SG","id":79,"isHot":0,"isOpen":0,"name":"韶关"},{"baiduCode":289,"centerLat":31.223271,"centerLng":121.488648,"firstPy":"SH","id":2,"isHot":1,"isOpen":1,"name":"上海"},{"baiduCode":303,"centerLat":23.36014,"centerLng":116.688467,"firstPy":"ST","id":53,"isHot":0,"isOpen":0,"name":"汕头"},{"baiduCode":339,"centerLat":22.778731,"centerLng":115.372924,"firstPy":"SW","id":75,"isHot":0,"isOpen":0,"name":"汕尾"},{"baiduCode":340,"centerLat":22.562868,"centerLng":113.987732,"firstPy":"SZ","id":4,"isHot":1,"isOpen":1,"name":"深圳"},{"baiduCode":258,"centerLat":22.937976,"centerLng":112.050946,"firstPy":"YF","id":80,"isHot":0,"isOpen":0,"name":"云浮"},{"baiduCode":199,"centerLat":21.871517,"centerLng":111.97701,"firstPy":"YJ","id":78,"isHot":0,"isOpen":0,"name":"阳江"},{"baiduCode":140,"centerLat":22.257694,"centerLng":113.563213,"firstPy":"ZH","id":18,"isHot":0,"isOpen":1,"name":"珠海"},{"baiduCode":198,"centerLat":21.257463,"centerLng":110.365067,"firstPy":"ZJ","id":76,"isHot":0,"isOpen":0,"name":"湛江"},{"baiduCode":338,"centerLat":23.078663,"centerLng":112.479653,"firstPy":"ZQ","id":72,"isHot":0,"isOpen":0,"name":"肇庆"},{"baiduCode":187,"centerLat":23.028576,"centerLng":113.130577,"firstPy":"ZS","id":52,"isHot":0,"isOpen":1,"name":"中山"}]
        citys.forEach((item)=>{
            (useIpGetCity.city == item.name) && ($('#cityId').val(item.id));
        })
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }
    submit(){
        validateAndSubmit({
            obj:this,
            moreParams:{'productTypeId':1},
            validates:
                [
                    {'name':'cityId'},
                    {'name':'estimateFlow'},
                    {'name':'carTypeId',checkClass:'carMol_T'},
                    {'name':'startAddr'},
                    {'name':'startDetailAddr'},
                    {'name':'endAddr'},
                    {'name':'endDetailAddr'},
                    {'name':'startLng','rules': [{'rule':'isEmpty', 'errorMsg':'开始地址不能为空'}]},
                    {'name':'startLat'},
                    {'name':'endLng','rules': [{'rule':'isEmpty', 'errorMsg':'终止地址不能为空'}]},
                    {'name':'endLat'},
                    {'name':'useCarTime','rules':[{'rule':'thanNow','errorMsg':'时间必须大于现在的时间'},{'rule':'isEmpty', 'errorMsg':'时间不能为空'}]},
                    {'name':'orderPrice'},
                    {'name':'psgName','rules': [{'rule':'isEmpty', 'errorMsg':'姓名不能为空'}]},
                    {'name':'psgPhone','rules': [{'rule':'isPhone', 'errorMsg':'请输入11位纯数字手机号'}]},
                    {'name':'des'}
                ]
        });
    }

    isStimate(){
        const flag = validateAndSubmit({
            obj:this,
            isCheck:true,
            moreParams:{productTypeId:'1'},
            validates:[
                {'name':'cityId'},
                {'name':'carTypeId',checkClass:'carMol_T'},
                {'name':'startAddr'},
                {'name':'startDetailAddr'},
                {'name':'endAddr'},
                {'name':'endDetailAddr'},
                {'name':'startLng','rules': [{'rule':'isEmpty', 'errorMsg':'开始地址不能为空'}]},
                {'name':'startLat'},
                {'name':'endLng','rules': [{'rule':'isEmpty', 'errorMsg':'终止地址不能为空'}]},
                {'name':'endLat'},
                {'name':'useCarTime','rules': [{'rule':'isEmpty', 'errorMsg':'时间必须大于现在的时间'},{'rule':'isEmpty', 'errorMsg':'时间不能为空'}]}
            ]});
        flag && $('.list_1').addClass('list_T');
        return flag? {isStimat:flag} :  flag;
    }

    isSCarType() {
        const flag = validateAndSubmit({
            obj:this,
            isCheck:true,
            moreParams:{productTypeId:'1'},
            validates:[
                {name: 'cityId', 'rules': [{'rule': 'isEmpty', 'errorMsg':'开始地址不能为空'}]},
                {'name':'useCarTime',paraName:'useCarDate','rules': [{'rule':'isEmpty', 'errorMsg':'时间必须大于现在的时间'},{'rule':'isEmpty', 'errorMsg':'时间不能为空'}]}
            ]});
        return flag? {isCarType:flag} :  flag;
    }

    addListT(){
        const flag = validateAndSubmit({
            obj:this,
            isCheck:true,
            moreParams:{productTypeId:'1'},
            validates:[
                {'name':'startLng','rules': [{'rule':'isEmpty', 'errorMsg':'开始地址不能为空'}]},
                {'name':'endLng','rules': [{'rule':'isEmpty', 'errorMsg':'终止地址不能为空'}]},
                {'name':'useCarTime','rules': [{'rule':'isEmpty', 'errorMsg':'时间必须大于现在的时间'},{'rule':'isEmpty', 'errorMsg':'时间不能为空'}]},
                {'name':'psgName','rules': [{'rule':'isEmpty', 'errorMsg':'姓名不能为空'}]},
                {'name':'psgPhone','rules': [{'rule':'isPhone', 'errorMsg':'请输入11位纯数字手机号'}]}
            ]});
        flag && $('.list_2,.list_3,.list_4,.list_5').addClass('list_T');
    }
        /**
         * 组建查询之前的检查
         *      多组合判断查询
         * isLst(检查的方法名)
         * updateState(['isSCarType','isStimate'])
         * updateState(['isSCarType'])
         * updateState(['isStimate'])
         */
        updateState(isLst = []){
            const obj = this;
            const jsonTool = new JsonTool();
            let setJson = {};
            isLst.forEach((item)=> {
                const flag = obj[item]();
                flag ? jsonTool.concat(setJson, flag) : '';
            });
            let jsonFlg = false;
            for (let key in setJson) {
                jsonFlg = key != undefined;
            }
            jsonFlg ? this.setState(setJson) : '';

        }
    render(){
        const source = (new UrlTool()).sourceRoot(),
              carTypeRoot = `${source}order/schema`,
              sourceEstimate = `${source}order/estimate`,
              sta = this.state,
              esstimateParams =   sta.isStimat,
              carTypeParams =   sta.isCarType,
              rst = sta.resulte,
              paramLst ={msg:rst.msg ,note:'',img:'',btnArr:[{btnName:'确认'}]},
              popHtl = rst.status_code != undefined   ?  <PopPrompt paramLst={paramLst}  obj={this} /> : '',
              carTypeHtl = carTypeParams ? <CarTypeLst source={carTypeRoot} params={carTypeParams} obj={this} /> : <input type="hidden" name="carTypeId" value="" />,
              flg = validateAndSubmit.errorCode(this),
              esstimateHtl = esstimateParams ? <UseCarEstimate source={sourceEstimate} params={esstimateParams} obj={this} /> :
                                            <li className="inf_tit">
                                                <h3>预估费用<span>0</span>元</h3>
                                                <em>车费预估<span>0</span>元，基础服务<span>0</span>元</em>
                                            </li>;
        return flg?( this.goto({url:'order_message.html'}) ):(
            <div className="usecar_main clearFix">
                <div className="usercar_l">
                    <ul>
                        <li className="list_1">1</li>
                        <li className="list_2">2</li>
                        <li className="list_3">3</li>
                        <li className="list_4">4</li>
                        <li className="list_5">√</li>
                    </ul>
                </div>
                <div className="usercar_r">
                    <ul className="usecar_inf">
                        <li className="inf_tit ">
                            <h3 className="cur">用车信息</h3>
                        </li>
                        <li className="public_errMsg" errMsg="" style={{height:'30px'}}>
                            <DatePicker rmk="用车时间：" type="1" name='useCarTime' obj={this} />
                        </li>
                        <PlaceSearch rmk="发车起点："  idName='start' type="1" cityName="cityId" obj={this} />
                        <PlaceSearch rmk="目的地点："  idName='end' obj={this}  />
                    </ul>
                    <ul className="contact_inf">
                        <li className="inf_tit"><h3 className="cur">联系信息</h3></li>
                        <li className="inf_name public_errMsg">
                            <span>姓名：</span>
                            <input type="text" name="psgName"  className="inf_inp inp_cont" placeholder="请输入联系人姓名" onFocus={this.updateState.bind(this,['isSCarType','isStimate'])}  />
                        </li>
                        <li className='public_errMsg'>
                            <span>手机号码：</span>
                            <input type="text" name="psgPhone"  className="inf_inp inp_cont" placeholder="请输入联系人手机号码" onFocus={this.updateState.bind(this,['isSCarType','isStimate'])} onBlur={this.addListT.bind(this)} />
                        </li>

                    </ul>
                    {carTypeHtl}
                    <ul className="pay_inf">
                        <li className="inf_tit"><h3>支付信息</h3></li>
                        <li>
                            <span>费用备注：</span>
                            <input type="text" name="des"  className="inf_inp inp_cont" />
                        </li>
                    </ul>
                    <ul className="usercar_price">
                        {esstimateHtl}
                    </ul>
                    <BtmCnt className="public_btn public_pnt" onClick={this.submit.bind(this)} btnName="开始叫车" loadName="提交中" random={Math.random()} />
                </div>
                {popHtl}
            </div>
        )
    };
};



module.exports =  UseCarOnLine;
