/**
 * Created by wathmal on 1/4/17.
 */

import React, {PropTypes} from 'react';
import Header from './../Header/Header';


class QuickStart extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
    };

    render() {

        return (
            <div>
                <Header title="quick start" />

                <div className="container" style={{paddingTop: 20}}>
                    <img src="images/headers/quick_start.png" alt="wireme quick start" className="img-responsive"/>


                </div>
            </div>
        )
    }

}

export default QuickStart;