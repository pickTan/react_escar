/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import UrlTool from  '../../tool/lib/UrlTool';
import validateAndSubmit from '../js/validateAndSubmit';
import PopPrompt from './PopPrompt';
/**
 * table页面
 *
 * listName 返回的数组名
 * obj 外层的this 从obj里面拿 主要在外层定义 params 参数 tableControl(no:不查询,yes:查询)
 *employeeList:
 *chargeList:
 *orderList:
 *invoiceList:
 *invoiceHistoryList:
 */
class TableCpt extends Component {
    constructor() {  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            Pop:'close',
            resulte: {},
            popParams:{paramLst:{},source:undefined}
        };
    }

    componentDidMount() {
        const params = this.props.params;
        this.queryLst(params);
    }
    shouldComponentUpdate(nextProps,nextState){
       const nowParams  =  this.props.params,
             nextParams =  nextProps.params,
             nowRlt = this.state,
             nexRlt = nextState;
        (nextParams === nowParams) || this.queryLst(nextParams);
    return (nowRlt !== nexRlt);
    }

    queryLst(params) {
        validateAndSubmit({
            obj: this,
            moreParams: params
        })
    }

    chAll(){
        const flag =document.getElementById('checkAll').checked,
              length =$('input.checkId').length ;
        for(let i=0;i<length;i++ ){
            document.getElementsByClassName('checkId').item(i).checked = flag;
        }
        this.countChecked();
    }

    //跳转
    goto({url='',obj=''}={}) { //跳转进入某
        const urlToll = new UrlTool();
        urlToll.goToUrl({url: url, obj: obj});
    }

    /**
     * 接口与list的映射
     * @returns {{employeeList: ({ischex, indexNo, flowNo, dateTime, money, user, rechCardNo, rechType, toAccTiime, handle}|*), rechFlowLst: ({indexNo, flowNo, dateTime, money, user, rechCardNo, rechType, toAccTiime, handle}|{indexNo: string, flowNo: string, dateTime: string, money: string, user: string, rechCardNo: string, rechType: string, toAccTiime: string, handle: string})}}
     */
    lstMap(lstName) {
        return this[lstName]();
    }


    /**
     * 充值记录页面table的表头
     * @returns {{indexNo: string, flowNo: string, dateTime: string, money: string, user: string, rechCardNo: string, rechType: string, toAccTiime: string, handle: string}}
     */
    chargeList() {
        return {
            indexNo: '编号',
            sn: '充值流水号',
            createTime: '充值时间',
            money: '充值金额',
            customerName: '充值人员',
            userPhone: '充值账号',
            channel: '充值方式',
            status: '充值状态',
            receiveTime: '到账时间',
            handle: '操作'
        }
    }

    /**
     * 是否是员工
     */
    employeeList() {
        return {
            ischex: <input id="checkAll" onClick={this.chAll.bind(this)} type="checkbox"   />,
            indexNo: '编号',
            role: '权限',
            name: '员工姓名',
            cellphone: '手机号',
            credit: '月限制金额(元)',
            money: '累计消费金额',
            handle: '操作'
        }
    }

    /**
     * 订单列表
     * @returns {{indexNo: string, sn: string, createTime: string, cellphone: string, employeeName: string, serviceType: string, orderStatus: string, carType: string, hours: string, addrFrom: string, addrTo: string, channel: string, estimatePrice: string, realPrice: string, realPayValue: string, payStatus: string, dValue: string, remark: string, handle: string}}
     */
    orderList() {
        return {
            indexNo: '编号',
            sn: '订单号',
            expectedTime: '预约时间',
            cellphone: '订车账号',
            carType: '服务车型',
            orderStatus: '用车状态',
            realPayValue: '支付金额',
            payStatus: '支付状态',
            handle: '操作'
        }
    }

    /**
     * 发票管理
     * @returns {{ischex: XML, indexNo: string, sn: string, receiveTime: string, money: string, customerName: string, channel: string}}
     */
    invoiceList() {
        return {
            ischex: <input id="checkAll" type="checkbox" onClick={this.chAll.bind(this)} type="checkbox"  />,
            indexNo: '编号',
            sn: '充值流水号',
            receiveTime: '到账时间',
            money: '充值金额',
            customerName: '充值人员',
            channel: '充值方式'
        }
    }

    /**
     * 开票历史
     * @returns {{indexNo: string, invoiceNo: string, billingTime: string, amount: string, invType: string, invoiceStatus: string, expStatus: string, expSn: string, handle: string}}
     */
    invoiceHistoryList(){
       return {
            indexNo: '编号',
            invoiceNo: '发票号',
            billingTime: '申请开通时间',
            amount: '发票金额',
            invType: '发票种类',
            invoiceStatus: '开票状态',
            expStatus: '快递状态',
            expSn: '快递单号',
            handle: '操作'
        };
    }
    /**
     * 样式名mapping
     * @param i
     * @returns {string}
     */
    ddClassLst(i) {
        let clsName = ['table_one', 'table_num', 'table_recTime', 'table_money', 'table_per', 'table_ID', 'table_way', 'table_state', 'table_seveTime', 'table_action'];
        return clsName[i];
    }

    goToPage(page = 1) {
        const obj = this.props.obj;
        let params = obj.state.params,
            pageNow = page;
        (pageNow == 'goToPage') ? this.JumpPage(params) : params.pageNo=pageNow;
        params.pageNo && this.queryLst(params);
    }

    JumpPage(params){
        const pageTotal = $("#pageTotal").text(),
              flag = validateAndSubmit({
                  obj:this,
                  isCheck:true,
                  validates:[{name:'choicePage', rules:[{rule:`0more${pageTotal}`,errorMsg:`页数必须小于${pageTotal}`},{rule:'isNumber',errorMsg:'页码必须为数字'}]}]
              });
        params.pageNo = flag ?  parseInt(flag.choicePage) : flag ;
    }
    differences(lst,itm){
        let url = null;
        switch (lst){
            case 'employeeList' :
                  url = `staff_detail.html?id=${itm.id}`;
                itm.credit = itm.credit == -1 ? '无限制' : itm.credit;
                switch (itm.credit){
                    case -1 : itm.role ='无限制'; break;
                    default : break;
                }
                switch (itm.role){
                    case 'E001' : itm.role ='管理员'; break;
                    case 'E002' : itm.role ='普通员工'; break;
                }
                itm.handle = <label className="public_pnt" onClick={this.goto.bind(this,{url:url})}>查看</label>;
                break;
            case 'invoiceList' :
                switch (parseInt(itm.channel)){
                    case 1:itm.channel = '线下充值'; break;
                    case 2:itm.channel = '银联'; break;
                    case 3:itm.channel = '微信支付'; break;
                    case 4:itm.channel = '支付宝'; break;
                    case 100:itm.channel = '其他'; break;
                }
                  url = `recharge_detail.html?id=${itm.id}`;
                itm.sn = <label className="public_pnt" onClick={this.goto.bind(this,{url:url})}>{itm.sn}</label>;
                break;
            case 'invoiceHistoryList' :
                  url = `invoice_detail.html?id=${itm.id}`;
                itm.invType= itm.invType == 1 ? '个人' : '企业';
                itm.invoiceStatus= itm.invoiceStatus == 0 ? '处理中' : '已开票';
                itm.expStatus= itm.expStatus == 0 ? '未发出' : (itm.expStatus == 1 ? '已发出': '已接收' );
                itm.handle = <label className="public_pnt" onClick={this.goto.bind(this,{url:url})}>查看</label>;
                break;
            case 'chargeList' :
                switch (itm.status){
                    case 1 :
                    case 2 :
                    case 3 :
                    case 4 :
                    case 5 : itm.status= '处理中'; break;
                    case 6 : itm.status= '成功'; break;
                    case 7 : itm.status= '失败'; break;
                }
                switch (itm.channel){
                    case 1 :itm.channel='线下充值'; break;
                    case 2 :itm.channel='银联'; break;
                    case 3 :itm.channel='微信支付'; break;
                    case 4 :itm.channel='支付宝'; break;
                    case 100 : itm.channel='其他';break;
                }
                  url = `recharge_detail.html?id=${itm.id}`;
                itm.handle = <label className="public_pnt" onClick={this.goto.bind(this,{url:url})}>查看</label>;
                break;
            case 'orderList' :
                url = `order_detail.html?id=${itm.id}`;
              const paramLst = {msg:'是否重新提交订单?',img:'',btnArr:[{btnName:'取消'},{btnName:'好的'}]},
                    source =`${(new UrlTool()).sourceRoot()}order/resubmit`,
                    params = {id:itm.id},
                    popParams  ={paramLst:paramLst,source:source,params:params};
                switch (itm.orderStatus){
                    case -1 :
                        itm.orderStatus='未服务';
                        itm.handle = <span>
                                        <label className="public_pnt" onClick={this.openPop.bind(this,popParams)}>重提</label>
                                            &nbsp;&nbsp;
                                        <label className="public_pnt" onClick={this.goto.bind(this,{url:url})}>查看</label>
                                    </span>;
                        break;
                    case 1 :
                    case 2 :
                        itm.orderStatus='未服务';
                        itm.handle = <label className="public_pnt" onClick={this.goto.bind(this,{url:url})}>查看</label>;
                        break;
                    case 3 :
                    case 4 :
                    case 5 :
                    case 6 :
                    case 7 :
                        itm.orderStatus= '服务中';
                        itm.handle = <label className="public_pnt" onClick={this.goto.bind(this,{url:url})}>查看</label>;
                        break;
                    case 8 :
                    case 9 :
                        itm.orderStatus= '已服务';
                        itm.handle = <label className="public_pnt" onClick={this.goto.bind(this,{url:url})}>查看</label>;
                        break;
                }
                //1:线下充值,2:银联,3:微信支付,4:支付宝,100:其他
                switch (itm.serviceType){
                    case 1 :itm.serviceType='预约用车'; break;
                    case 2 :itm.serviceType='随叫随到'; break;
                    case 3 :itm.serviceType='接机'; break;
                    case 4 :itm.serviceType='送机'; break;
                    case 5 : itm.serviceType='接高铁';break;
                    case 6 : itm.serviceType='送高铁';break;
                    case 7 : itm.serviceType='日租';break;
                    case 8 : itm.serviceType='半日租';break;
                }
                switch (itm.carType){
                    case 1 :itm.carType='经济型'; break;
                    case 2 :itm.carType='舒适型'; break;
                    case 3 :itm.carType='商务型'; break;
                    case 4 :itm.carType='豪华型'; break;
                    case 5 : itm.carType='大众型';break;
                    case 6 : itm.carType='送高铁';break;
                    case 7 : itm.carType='日租';break;
                    case 8 : itm.carType='半日租';break;
                }
                switch (itm.channel){
                    case 1 :itm.channel='电话'; break;
                    case 2 :itm.channel='QQ'; break;
                    case 3 :itm.channel='微信'; break;
                }
                switch (itm.payStatus){
                    case 1 :itm.payStatus='已付款'; break;
                    case -1:
                    case 4 :itm.payStatus='待付款'; break;
                }
                break;

        }

    }
    openPop(popParams={}){
        this.setState({popParams:popParams,Pop:'open'});
    }

    countChecked(){
       const count = $('input[type="checkbox"].checkId:checked').length;
        document.getElementById('count').innerHTML = count;
    }
    render() {
        const sta = this.state.resulte,
            prop = this.props,
            lstName = prop.listName,
            pageNo = sta.pageNo,       //当前页的页数
            pageIndex = pageNo % 3 == 0 ? 3 : pageNo % 3,  //当前页的位置
            pageHml = [],              //页码的组建
            total = sta.total,
            pageSize = sta.pageSize,
            pageTotal = Math.ceil(total / pageSize),
            employeeList = sta[lstName],
            headLst = this.lstMap(lstName),
            ddHeadLst = [], //头部的html代码
            startPage = 1 - pageIndex + pageNo,
            endPage = pageTotal <= startPage + 3 ? pageTotal + 1 : startPage + 3,
            tableClass = `record_table ${lstName}`,
            state = this.state,
            userPop = true,
            popHtl = state.Pop != 'close' ? <PopPrompt
                                                obj={this}
                                                paramLst={state.popParams.paramLst}
                                                source={state.popParams.source}
                                                params={state.popParams.params}
                                                userPop={userPop}
                                            />
                                          :  '';
        //组合
        for (let i = startPage; i < endPage; i++) {

            (i == startPage) && (pageNo == 1
                ? pageHml.unshift(<li className="page_btn page_last page_noPage">上一页</li>)
                : pageHml.unshift(<li className="page_btn page_last " onClick={this.goToPage.bind(this,pageNo-1)}>上一页</li>)
            );

            i == pageNo
                ? pageHml.push(<li className="page_btn page_cue">{i}</li>)
                : pageHml.push(<li className="page_btn" onClick={this.goToPage.bind(this,i)}>{i}</li>);

         (i == (endPage - 1)) && (pageNo >= pageTotal
                 ? pageHml.push(<li className="page_btn page_next page_noPage">下一页</li>)
                 : pageHml.push(<li className="page_btn page_next" onClick={this.goToPage.bind(this,pageNo+1)}>下一页</li>)
             );
        }
        const flag = typeof(sta.msg) =='undefined',
              lstHml = flag
                  ?<div className="table_loading"></div>
                  : validateAndSubmit.errorCode(this)
                      ?employeeList.length<1 ? <div className="table_error">暂无数据</div> :employeeList.map((itm, i)=> {
                            let ddLst = [], //主题部分的html代码
                                j = 0;
                            this.differences(lstName,itm); //表格差异化处理
                            for (let key in headLst) {
                                if (i == 0) {
                                    ddHeadLst.push(<dt className={this.ddClassLst(j)}>{headLst[key]}</dt>);
                                }
                                //做差异化处理 如果为ischex:<input chexbox > ;indexNo :编号  handle:相对应的操作
                                itm[key] = key == 'indexNo' ? i + 1 : itm[key];
                                itm[key] = key == 'ischex' ? <input name="checkId" className="checkId" value={itm.id} onClick={this.countChecked.bind(this)}   type="checkbox"/> : itm[key];
                                ddLst.push(<dd className={this.ddClassLst(j)}>{itm[key]}</dd>);
                                j++;
                            }
                            return(<dl className="clearFix record_tableM">
                                        {ddLst}
                                    </dl>)
                        })
                      :<div className="table_error">{sta.msg},请重新刷新!</div>,
              tableHml = typeof(employeeList) !='undefined'
                         && employeeList.length > 0 ? (<div>
                                            <div className={tableClass}>
                                                <dl className="clearFix record_tableH">
                                                    {ddHeadLst}
                                                </dl>
                                                {lstHml}
                                            </div>
                                            <div className="table_page clearFix">
                                                <ul className="clearFix public_errMsg">
                                                    <li className="pag_all">共<span >{total}</span>项</li>
                                                    <li>共<span id="pageTotal">{pageTotal}</span>页</li>
                                                    {pageHml}
                                                    <li><span>到第</span><input type="text" id="goToPage" name="choicePage" className="page_inp"/><span>页</span></li>
                                                    <li className="page_btn page_sure" onClick={this.goToPage.bind(this,'goToPage')}>确定</li>
                                                </ul>
                                            </div>
                                            {popHtl}
                                        </div>)
                                       :lstHml;
            validateAndSubmit.errorCode(this);  //检查是否超时
        return (
            <div style={{textAlign:'center'}}>
                {tableHml}
            </div>
        );
    }
}
module.exports = TableCpt;
