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
import LoginContent from '../component/Login';
import Carousel from '../component/Carousel';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/login.css';
class Login extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }

    render() {
        const sourceRoot = `${(new UrlTool()).sourceRoot()}login`;
        return (
            <div>
                <Head />
                <div className="login_main">
                    <div style={{position:'absolute',zIndex:'10',width:'100%'}}>
                        <div className="public_main">
                            <LoginContent source={sourceRoot} />
                            <Carousel />
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        );
    }
};
ReactDOM.render(
    <Login   />,
    document.getElementById('content')
);
