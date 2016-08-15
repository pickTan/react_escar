/**
 * Created by girl on 16/8/5.
 */
import {LOGINTAB_LOGIN,LOGINTAB_BOUNCED} from'../constants/ActionTypes';
import validateAndSubmit from './../js/validateAndSubmit';
import loginState from '../initState/login';

//reducer其实也是个方法而已,参数是state和action,返回值是新的state
export default function login(state =loginState  , action) {
    switch (action.type) {
        case LOGINTAB_BOUNCED:
            state.loginTab.bouncFlg = !state.loginTab.bouncFlg;
            return state ;
        default:
            const actionState = action.state;
            return !!actionState ? actionState : state;
    }
}
