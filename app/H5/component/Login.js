/**
 * Created by girl on 16/5/19.
 */
//require('es5-shim');
//require('es5-shim/es5-sham');
require('console-polyfill');
import React,{Component,PropTypes} from 'react';
import findFun from '../js/findFun'
import Footer from './Footer';
import Head from './Head';
import LoginTab from './LoginTab';
import Carousel from './Carousel';
import '../css/public.css';
import '../css/login.css';
class Login extends Component{

    shouldComponentUpdate(nextProps,nextStates){
      return  ! nextProps.login !== this.props.login;
    }
    render() {
        const {present} = this.props.login,
              {loginTab} = present,
               funs = findFun(this.props);
        return (
            <div>
                <Head />
                <div className="login_main">
                    <div style={{position:'absolute',zIndex:'10',width:'100%'}}>
                        <div className="public_main">
                            <LoginTab  loginTab={loginTab} funs={funs} />
                            <Carousel />
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        );
    }
}

export default Login ;
