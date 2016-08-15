/**
 * Created by girl on 16/6/23.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import UrlTool from  '../../tool/lib/UrlTool';
import PlanceCpt from  './PlanceCpt';
/**
 * 百度地图搜索
 * rmk:名称
 * idName:同一个存在多个组件设置id标识
 * type:为 1 只显示热门城市
 */
let l_local;
class PlaceSearch extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            str : false,  //百度查询的数据 为 false时表示隐藏 为true正在查询
            pageStr:''
        }
    }

    //调用百度搜索
    search(){
        let temp = {};
        const obj = this,
              value = obj.G('suggestId').value,
              myKeys = [value],
              city=obj.G('city').value,
              local = new BMap.LocalSearch(city,{
            onSearchComplete : function(r){
                const pageNum = r.getNumPages(),
                      cPage = r.getPageIndex(),
                      cPNum = r.getCurrentNumPois();
                  let str = [],
                      pageStr = [];
                obj.G('Lng').value ='';
                obj.G('Lat').value ='';
                if(cPNum > 0){
                    temp.mk = [];
                    for(let i=0;i<cPNum;i++){
                       const  pInfo = r.getPoi(i),
                              mk = new BMap.Marker(pInfo.point),
                              lb = new BMap.Label(pInfo.title,{offset:new BMap.Size(10,-20)}),
                              point = pInfo.point;
                        mk.setLabel(lb);
                        str.push(<li  onClick={obj.getAddress.bind(obj,pInfo)} ><span>{pInfo.title}</span><br /> <span>地址:{pInfo.address}</span></li>);
                        temp.mk.push(pInfo.point);
                    }
                    if(pageNum > 1){
                        const propPage = cPage-1;
                        let htl = cPage =='0' ? obj.page({flag:false}) : obj.page({page:propPage,flag:true});
                        pageStr.push(htl);
                        const nexPage = cPage+1;
                        htl= cPage ==pageNum ? obj.page({flag:false}) : obj.page({page:nexPage,name:'下一页',flag:true});
                        pageStr.push(htl);
                    }

                }
                else{
                    str = <ul className="result"><li>查不到数据</li></ul>;
                }
                obj.setState({str:str,pageStr:pageStr});
            }
        });
        local.search(myKeys);
        l_local =local;
    }
    //翻页功能
    page({page=null,name='上一页',flag=true}){
        return  flag ? <span  onClick={l_local.gotoPage.bind(this,page)} >{name}</span> : <span >{name}</span>;
    }
    //获取id
    G(id) {
    const idName = this.props.idName,
          newId =idName+id;
    return document.getElementById(newId);
    }

    getAddress({title,point,address}){
        this.G('suggestId').value=title;
        this.G('Addr').value=title;
        this.G('DetailAddr').value=address;
        this.G('Lat').value=point.lat;
        this.G('Lng').value=point.lng;
        this.setState({str:false});
    }

    render() {
        const   sta = this.state,
                props = this.props,
                rmk = props.rmk,
                type = props.type,
                cityName = props.cityName,
                rootSource =`${(new UrlTool()).sourceRoot()}order/avaCitys`,
                idName = this.props.idName,
                cityId = `${idName}city`,
                suggestId = `${idName}suggestId`,
                lng = `${idName}Lng`,
                lat = `${idName}Lat`,
                detailAddr = `${idName}DetailAddr`,
                addr = `${idName}Addr`,
                searchResultPanel = `${idName}searchResultPanel`,
                str = sta.str ? <div id={searchResultPanel} className="public_resultBaidu">
                        <ul className="result">
                            {sta.str}
                        </ul>
                        <div className="pageList">
                            {sta.pageStr}
                        </div>
                    </div> : '';
        const fatherThis = this.props.obj,
               fun= fatherThis.updateState;
        return (
            <li className="public_errMsg" errMsg="">
                <span>{rmk}</span>
                <PlanceCpt cityId={cityId} source={rootSource} type={type} name={cityName} obj={props.obj}   />
                <input type="text" id={suggestId}  className="inf_inp inf_loca inf_locaT" onKeyUp={this.search.bind(this)}/>
                <input type="hidden" id={lng} name={lng}  />
                <input type="hidden" id={lat} name={lat}  />
                <input type="hidden" id={detailAddr} name={detailAddr}  />
                <input type="hidden" id={addr} name={addr} onChange={fun.bind(this,['isSCarType','isStimate'])}  />
                {str}
           </li>
        );
    }
};

module.exports =  PlaceSearch;
