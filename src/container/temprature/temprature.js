import React, { Component } from 'react';
import { observer } from 'mobx-react';

const Temprature = observer(class Temprature extends Component {
    handleChange = (event) => {
        this.props.temprature.unit = event.target.value;
    }

    render() {
        return (
            <div>
                {this.props.temprature.temprature}
                <input onChange={this.handleChange} />
            </div>
        )
    }
})

export default Temprature;