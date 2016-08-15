/**
 * Created by girl on 16/6/23.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from  'jquery';
import '../../tool/lib/Datetimepicker';
import '../css/bootstrap.min.css';
import '../css/bootstrap-datetimepicker.min.css';
import validateAndSubmit from '../js/validateAndSubmit';

/**
 * 日期选择
 * type : 1.日期+时间的选择  2.日期选择  3.时间选择
 * name : 值名称
 */
class DatePicker extends Component{

    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
    }
    componentDidMount(){
        $('.form_datetime').datetimepicker({
            //language:  'fr',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
        $('.form_date').datetimepicker({
            //language:  'fr',
            format:'yyyy-mm-dd',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });
        $('.form_time').datetimepicker({
            //language:  'fr',
            format:'hh:ii',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0
        });
    }

    render() {
        const props =this.props,
              type = props.type;

        let classes = 'input-group date col-md-5 ',
            idName = `dtp_input1${props.name}`,
            labelHml = '',
            spanHml1 = '';
        if (type == '2'){
            classes=`${classes}form_date`;
            idName='';
        }else if(type == '3'){
            classes=`${classes}form_time`;
        }else{
            classes=`${classes}form_datetime`;
            labelHml= <label htmlFor="dtp_input1" className="col-md-2 control-label">{props.rmk}</label>;
            spanHml1 = <span className="input-group-addon">
                            <span className="glyphicon glyphicon-remove"></span>
                        </span>;

        }
        //const fatherThis = props.obj,
        //      changeFun= fatherThis.updateState;

        return (
            <div className="form-group">
                {labelHml}
                <div className={classes}    data-link-field={idName}>
                    <input className="form-control" size="16" type="text" readOnly id={idName} name={props.name}  />
                    {spanHml1}
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-th"></span>
                        </span>
                </div>

            </div>
        );
    }
};

module.exports =  DatePicker;
