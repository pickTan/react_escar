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
import Staff from '../component/Staff';
import NavMenue from '../component/NavMenue';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/corporation_staff.css';


class CorStaff extends Component{
    render() {
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix" >
                        <NavMenue  menue="5" />
                        <Staff />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <CorStaff   />,
    document.getElementById('content')
);
