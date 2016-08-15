/**
 * Created by girl on 16/8/5.
 */
import * as types from '../constants/ActionTypes';
import $ from 'jquery';
import validateAndSubmit from '../js/validateAndSubmit';
//导出登录的方法
//所有的方法必须加 fun
export function loginFun() {
    return (dispatch, getState) => {
        const passText = $('[name="loginType"].choice').attr('value') == '2' ? '密码' : '验证码',
              autoLogin = $('[name="autoLogin"]:checked').val();
        validateAndSubmit({
            dispatch: dispatch,
            getState: getState,
            componentLst: ['login','loginTab'],
            loadFlg: 'btnFlag',
            moreParams: {autoLogin: autoLogin},
            validates: [
                {'name': 'loginName', 'rules': [{'rule': 'isEmpty', 'errorMsg': '用户名不能为空'}]},
                {'name': 'password', 'rules': [{'rule': 'isEmpty', 'errorMsg': `${passText}不能为空.`}]},
                {'name': 'loginType', 'checkClass': 'choice', 'rules': [{'rule': 'isEmpty', 'errorMsg': '密码不能为空'}]}
            ]
        });
    }
}
//导出弹框的方法
export function bouncedFun() {
    return {
        type: types.LOGINTAB_BOUNCED
    }
}
//这些方法都导出,在其他文件导入时候,使用import * as actions 就可以生成一个actions对象包含所有的export
