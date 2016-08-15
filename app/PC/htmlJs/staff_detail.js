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
import StaffDetail from '../component/StaffDetail';
import NavMenue from '../component/NavMenue';
import CurrentLocation from '../component/CurrentLocation';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/cor_staff_detail.css';
import '../css/cor_staff_detail_service.css';


class StaDetail extends Component{


    render() {
        const   currLct =[{name:'企业员工',url:''}],
            sourceRoot = `${(new UrlTool()).sourceRoot()}employee/info`;
        return (
            <div>
                <Head />
                <div className="account_message">
                    <div className="public_main clearfix" >
                        <NavMenue  menue="5" />
                        <div className="public_content">
                            <CurrentLocation  currLct={currLct} />
                            <StaffDetail source={sourceRoot} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <StaDetail   />,
    document.getElementById('content')
);
