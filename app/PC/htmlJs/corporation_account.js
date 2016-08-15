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
import Account from '../component/Account';
import NavMenue from '../component/NavMenue';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/corporation_account.css';

class CorAcct extends Component{
    render() {
        const sourceRoot = `${(new UrlTool()).sourceRoot()}account/portal`;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="0" />
                        <Account source={sourceRoot}  />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <CorAcct   />,
    document.getElementById('content')
);
