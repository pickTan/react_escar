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
import ChargeRecord from '../component/ChargeRecord';
import NavMenue from '../component/NavMenue';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/recharge_record.css';


class ChargeRcd extends Component{
    render() {
        const sourceRoot = `${(new UrlTool()).sourceRoot()}charge_notes`;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="2" />
                        <ChargeRecord source={sourceRoot}  />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <ChargeRcd   />,
    document.getElementById('content')
);
