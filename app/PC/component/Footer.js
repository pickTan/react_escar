/**
 * Created by girl on 16/5/26.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'React-dom';
/**
 * 页面公共尾部
 */
class Footer extends Component{
    shouldComponentUpdate(){
        return false;
    }
    render() {
        return (
            <div className="footer">
                <div className="footer_top">
                    <div className="public_main">
                        <ul className="footer_aboutUs">
                            <li className="public_pnt">关于我们</li>
                            <li className="public_pnt">星星打车</li>
                            <li className="public_pnt">媒体报道</li>
                            <li className="public_pnt">渠道合作</li>
                            <li className="public_pnt">友情链接</li>
                        </ul>
                        <ul className="footer_info">
                            <li>招募电话：020-38467352</li>
                            <li>企业邮箱：711marketing@ihavecar.com</li>
                            <li>业务联系：020-38467352</li>
                            <li>公司地址：天河五山路</li>
                        </ul>
                        <p className="footer_phone">
                            <em className="footer_phoneLogo"></em>
                            <label>联系热线：</label>
                            <span>400-8900-999</span>
                        </p>
                        <p className="footer_code">
                            <em className="footer_wbCode"></em>
                            <em className="footer_wxCode"></em>
                        </p>
                    </div>
                </div>
                <div className="footer_btm">
                    <p className="public_main">
                        <small ><label>广州七一一电子信息科技有限公司 All Rights Reserved.粤ICP备13069717号</label> <span className="footer_btmRt">粤公网安备 44010602000927号 网站统计</span></small>
                    </p>
                </div>
            </div>
        );
    }
};

module.exports =  Footer;
