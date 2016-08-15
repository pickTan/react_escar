/**
 * Created by girl on 16/8/1.
 */
import { combineReducers } from 'redux';
import counter from './counter';
import login from './login';
import {INCREMENT_COUNTER, DECREMENT_COUNTER,UNDO_COUNTER, REDO_COUNTER} from '../constants/ActionTypes'
import undoable, { includeAction } from 'redux-undo';  //可以做退回上一部以及退回下一步的操作

const rootReducer = combineReducers({
    counter:undoable(counter,{debug: true}),
//    :undoable(counter
//        , {
//    filter: includeAction([INCREMENT_COUNTER, DECREMENT_COUNTER]),
//    limit: 10,
//    debug: true,
//    undoType: UNDO_COUNTER,
//    redoType: REDO_COUNTER
//}
//    ),
    login:undoable(login,{debug: true})
});

export default rootReducer;
