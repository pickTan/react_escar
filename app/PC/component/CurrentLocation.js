/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
/**
 * 当前位置
 * currLct:[{name:,url:}]
 */
class CurrentLocation extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }

    render() {
        const lctLst = this.props.currLct,
              lenght = lctLst.length -1;
        let lsc = lctLst.map(
            (itm,i)=>{
                itm.name =i == 0 ? itm.name : `>  ${itm.name}`;
                return i == lenght ? <span  > {itm.name} </span> : <span className="public_pnt" onClick={this.goto.bind(this,{url:itm.url})}> {itm.name} </span>;
        });
        return (
            <p className="public_cur"><label>当前：</label>{lsc}</p>
        );
    }
};

module.exports =  CurrentLocation;
