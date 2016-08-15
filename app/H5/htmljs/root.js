/**
 * Created by girl on 16/8/5.
 */
/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../containes/Root';
import { hashHistory } from 'react-router';
/*eslint-enable*/

ReactDOM.render(
    <Root history={hashHistory} />,
    document.getElementById('content')
);
