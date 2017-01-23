/**
 * Created by wathmal on 1/4/17.
 */

import React, {PropTypes} from 'react';

class Overview extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
    };



    render() {

        return (
            <div>
                <h1>Overview</h1>
                <p>The aim of this project to build a complete IoT development platform with the Visual Programming.
                    The IoT development platform provides an intuitive development approach which enables users to
                    control the modules.</p>
            </div>
        )
    }

}

export default Overview;