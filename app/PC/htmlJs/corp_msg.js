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
import CorpMsg from '../component/CorpMsg';
import NavMenue from '../component/NavMenue';
import CurrentLocation from '../component/CurrentLocation';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/corp_msg.css';


class CorMsg extends Component{
    render() {
        const   currLct =[{name:'企业资料',url:''}],
                sourceRoot = `${(new UrlTool()).sourceRoot()}enterprise/info`;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix">
                        <NavMenue  menue="4" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            <CorpMsg source={sourceRoot}  />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <CorMsg   />,
    document.getElementById('content')
);
