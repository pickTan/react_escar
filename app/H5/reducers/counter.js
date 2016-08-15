/**
 * Created by girl on 16/8/1.
 */
import {INCREMENT_COUNTER,DECREMENT_COUNTER} from'../constants/ActionTypes';

//reducer其实也是个方法而已,参数是state和action,返回值是新的state
export default function counter(state = {count:0} , action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            state.count+=1;
            return state ;
        case DECREMENT_COUNTER:
            state.count-=1;
            return state ;
        default:
            return state;
    }
}
