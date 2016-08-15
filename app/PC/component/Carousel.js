/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import $ from 'jquery';
import '../../tool/lib/Flexslider';

/**
 * 页面banner
 */
class Carousel extends Component{
    constructor(){
        super();
    }
    shouldComponentUpdate(){
        return false;
    }
    componentDidMount(){
            $('.flex_slider').flexslider({
                directionNav: true,
                pauseOnAction: false,
                animation: "slide",
                pauseOnHover: true,
                animationSpeed:1000
            });
    }
    render() {
        return (
            <div className="flex_slider">
                <ul className="slides">
                    <li className="login_banner1 flex-active-slide"/>
                    <li className="login_banner2" />
                </ul>
            </div>
        );
    }
};

module.exports =  Carousel;
