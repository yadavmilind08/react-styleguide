import React, { useEffect, useState } from 'react';
import * as moment from 'moment';

const Test = (props) => {
    const [value, setValue] = useState(moment(props.value).format('MM/DD/YYYY'));

    useEffect(() => {
        setValue(moment(props.value).format('MM/DD/YYYY'));
    }, [props.value]);


    return (
        <div>
            {value}
        </div>
    )
}

export default Test;