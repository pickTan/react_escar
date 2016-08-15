/**
 * Created by girl on 16/5/19.
 */
//require('es5-shim');
//require('es5-shim/es5-sham');
require('console-polyfill');
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';

import Footer from '../component/Footer';
import Head from '../component/Head';
import ChargeDetail from '../component/ChargeDetail';
import CurrentLocation from '../component/CurrentLocation';
import NavMenue from '../component/NavMenue';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/recharge_detail.css';


class ChargeDtl extends Component{
    render() {
        const   currLct =[{name:'充值记录',url:'recharge_record.html'},{name:'充值明细',url:''}],
                sourceRoot = `${(new UrlTool()).sourceRoot()}pay/charge_notesInfo`;
        return (
            <div>
                <Head />

                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="2" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            <ChargeDetail source={sourceRoot}  />
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
ReactDOM.render(
    <ChargeDtl   />,
    document.getElementById('content')
);
