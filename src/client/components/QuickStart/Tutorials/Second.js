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
                <h1>Add a new component</h1>

            </div>
        )
    }

}

export default Second;