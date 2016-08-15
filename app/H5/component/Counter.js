/**
 * Created by girl on 16/8/1.
 */
import React,{Component,PropTypes} from 'react';

class Counter extends Component {

    render(){
        const {increment,incrementIfOdd, incrementAsync, decrement, counter} = this.props,
              {count} = counter;
        return (
            <p>
                Clicked:{count} times
                {'   '}
                <button  onClick={increment}>+</button>
                {'   '}
                <button  onClick={decrement}>-</button>
                {'   '}
                <button  onClick={incrementIfOdd}>Increment if odd</button>
                {'   '}
                <button  onClick={() =>incrementAsync()}>Increment async</button>
            </p>
        )
    }
}

Component.PropTypes={
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    //undo: PropTypes.func.isRequired,
    //redo: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
};
export default Counter ;
