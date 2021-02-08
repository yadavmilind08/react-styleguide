import React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';

const Counter = observer(class Counter extends Component {
    // count = 0;

    render() {
        return (
            <div>
                Counter:{this.props.store.count}<br />
                <button onClick={this.handleInc}>+</button>
                <button onClick={this.handleDec}>-</button>
            </div>
        )
    }

    handleInc = () => {
        // this.count++;
        this.props.store.increment();
    }

    handleDec = () => {
        // this.count--;
        this.props.store.decrement();
    }
})

// decorate(Counter, {
//     count: observable
// })

export default Counter;