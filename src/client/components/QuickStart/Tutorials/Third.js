/**
 * Created by wathmal on 1/4/17.
 */

import React, {PropTypes} from 'react';

class Third extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
    };



    render() {

        return (
            <div>
                <h1>Custom logics</h1>
            </div>
        )
    }

}

export default Third;