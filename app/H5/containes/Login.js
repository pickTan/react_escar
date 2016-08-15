/**
 * Created by girl on 16/8/5.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../component/Login';
import * as loginActions from '../actions/login';


function mapStateToProps (state) {

    return {
        login:state.login
    }
}

function mapDispatchToProps (dispatch) {

    return bindActionCreators(loginActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
