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
import RegisterContent from '../component/Register';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/register.css';

class Register extends Component{
    render() {
        const sourceRoot = `${(new UrlTool()).sourceRoot()}register`;
        return (
            <div>
                <Head />
                <div className="registerBanner ">
                    <div className="public_main">
                        <div className="register_images"></div>
                    </div>
                </div>
                <RegisterContent source={sourceRoot}  />
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <Register   />,
    document.getElementById('content')
);
