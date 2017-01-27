/**
 * Created by wathmal on 1/4/17.
 */

import React, {PropTypes} from 'react';

class Second extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
    };



    render() {

        return (
            <div>
                <h1>Additional Features</h1>

                <h4>Save and Load Projects</h4>
                <h4>Language Support</h4>
                <h4>Example Projects</h4>
                <p>1. Cross programming application with temperature Sensor and Buzzer
<br/>
                    2. Multiple widgets to monitor and control
                </p>

            </div>
        )
    }

}

export default Second;