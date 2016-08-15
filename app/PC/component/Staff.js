/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validate from  '../../validate/validate';
import CurrentLocation from './CurrentLocation';
import TableCpt from './TableCpt';
import PopInput from './PopInput';
/**
 * 账户管理页面
 */
class Staff extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            params:{            //列表查询条件
                'pageNo':1,
                'pageSize':10
                },
            mesLst : [],
            popControl:'close' //弹框的控制(当为'succ'为请求成功,当为'close'时表示关闭,[String],为具体一个弹框)
        };
    }

    componentDidMount(){
    }
    //跳转
    goto({url='',obj=''}={}){ //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url:url,obj:obj});
    }

    lotSet(popName){
        const $checked = $('[name="checkId"]:checked'),
              length =  $checked.length;
        let ids='';
        for(let i=0;i<length;i++){
            const val = $checked.eq(i).attr("value");
            ids += i==0 ? val: `,${val}`;
        }
        this.setState({popControl:popName,mesLst:[length,ids]});

    }
    //弹框
    bounced(popName){
        this.setState({popControl:popName});
    }
    //弹框的访问接口
    bouncedSource(popName){
        let source = (new UrlTool()).sourceRoot();
        const sourceMp= {
            'addStaHtl' : `${source}employee/add`,
            'lotSetPop' : `${source}employee/batchEdit`
        };
        return sourceMp[popName];
    }

    /**
     * 搜索
     */
    search(){
        const params = validate([
                {name:'queryRole',paraName:'role'},
                {name:'keywordsName',paraName:'keywords'}
            ],
            {'pageNo':1,'pageSize':10}
        ).success;
        this.setState({params:params});
    }
    render() {
          const   currLct =[{name:'企业员工',url:''}],
                  sourceRoot = `${(new UrlTool()).sourceRoot()}employee/list`,
                  sta = this.state,
                  popName = sta.popControl ,
                  mesLst =popName =='lotSetPop' ? sta.mesLst : [],
                  bouncedHtl = popName == 'close' ? '' : <PopInput obj={this} type={popName} source={this.bouncedSource(popName)} params={mesLst}  />;
          return (
            <div className="public_content">
                <CurrentLocation currLct={currLct}  />
                <div className="author_right">
                    <span>登录权限：</span>　
                    <select name="queryRole" >
                        <option value="">全部</option>
                        <option value="E001">管理员</option>
                        <option value="E002">普通员工</option>
                    </select>
                    <label>姓名/手机号</label>
                    <input type="text" id="keywords" name="keywordsName" placeholder="请输入姓名或者手机号"/>
                    <em></em>
                    <p className="public_btn public_otp" onClick={this.search.bind(this)}>搜索</p>
                </div>
                <div className="public_tab">
                    <ul className="staff_tab">
                        <li className="clearfix">
                            <label>选中</label>
                            <strong id="count">0</strong>
                            <label>项 ></label>
                            <div className="staff_clicks">
                                <p className="public_btn public_otp bulk_install public_pnt"  onClick={this.lotSet.bind(this,'lotSetPop')} >批量设置月限制金额</p>
                                <p className="public_btn public_otp add_staff public_pnt" onClick={this.bounced.bind(this,'addStaHtl')} >添加员工</p>
                                <p className="public_btn public_otp bulk_load public_pnt" onClick={this.bounced.bind(this,'lotImportStaff')} >批量导入</p>
                                <span className="download_mould public_pnt"><a style={{color:'#5476b5'}} href="/escar/employee/downTemplate">下载批量导入摸板 </a></span>
                            </div>
                        </li>
                    </ul>
                    <TableCpt source={sourceRoot}  obj={this} listName="employeeList"  params={this.state.params} />
                </div>
                {bouncedHtl}
            </div>
        );
    }
};
module.exports =  Staff;
