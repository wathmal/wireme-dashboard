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
                <div className="text-center">
                    <h2>Additional Features</h2>
                    <p>What is more with the WirmeMe IoT Hub</p>

                    <div className="row">
                        <h4 style={{padding: 15}}>Save and Load Projects</h4>
                        <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/load_project.png" alt="overview image"
                             className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10, width:600, height:'auto'}}/>
                    </div>
                    <div className="row">
                        <h4 style={{padding: 15}}>Language Support</h4>
                        <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/sinhala.png" alt="overview image"
                             className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10, width:600, height:'auto'}}/>
                    </div>
                    <div className="row">
                        <h4 style={{padding: 15}}>Customize your dashboard with your prefer colors.</h4>
                        <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/dashboard.png" alt="overview image"
                             className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10, width:600, height:'auto'}}/>
                    </div>
                </div>
                <div className="row">
                    <h4 style={{padding: 15}}>Example Projects</h4>
                    <ul style={{padding: 15}}>
                        <li> <a>Cross programming application with temperature Sensor and Buzzer</a></li>
                        <li><a>Multiple widgets to monitor and control</a></li>
                    </ul>
                </div>
            </div>


        )
    }

}

export default Second;