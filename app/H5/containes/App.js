/**
 * Created by girl on 16/8/1.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Counter from '../component/Counter';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state){
    return {
        count : '1'//mapping对应reducers中index中的counter
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);
