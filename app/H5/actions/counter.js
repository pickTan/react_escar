/**
 * Created by girl on 16/8/1.
 */
import * as types from '../constants/ActionTypes';
//导出加一的方法
export function increment() {
    return {
        type: types.INCREMENT_COUNTER
    }
}
//导出减一的方法
export function decrement() {
    return {
        type: types.DECREMENT_COUNTER
    }
}
//导出奇数加一的方法，该方法返回一个方法，
//包含dispatch和getState两个参数，dispatch用于执行action的方法，getState返回state
export function incrementIfOdd() {
    return (dispatch, getState) => {
        //获取state对象中的counter属性值
        const { count } = getState().counter;
        //偶数则返回
        if (count % 2 === 0) return;
        getState().counter.count+=1;
        //没有返回就执行加一
        dispatch(getState());
    }
}
//导出一个方法,包含一个默认参数delay,返回一个方法,一秒后加一
export function incrementAsync(delay = 1000) {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment())
        }, delay)
    }
}

//export function undo() {
//    return {
//        type: types.UNDO_COUNTER
//    }
//}
//
//export function redo() {
//    return {
//        type: types.REDO_COUNTER
//    }
//}
//这些方法都导出,在其他文件导入时候,使用import * as actions 就可以生成一个actions对象包含所有的export
