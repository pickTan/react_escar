/**
 * Created by girl on 16/5/19.
 */
require('console-polyfill');
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
import ConfirmLetterContent from '../component/usercarConfirmLetter';
import UrlTool from '../../tool/lib/UrlTool';
import '../css/public.css';
import '../css/usercar_confirm_letter.css';
class ConfirmLetter extends Component{
    constructor(){  //最先运行;可做缓存机制.对比版本好,如果版本号改变 重新加载
        super();
        this.state = {
            resulte:{
            }
        };
    }

    render() {
        const sourceRoot = `${(new UrlTool()).sourceRoot()}clc/v`;
        return (
            <div>
                <ConfirmLetterContent source={sourceRoot} />
            </div>
        );
    }
};
ReactDOM.render(
    <ConfirmLetter />,
    document.getElementById('content')
);
