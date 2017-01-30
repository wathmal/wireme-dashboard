/**
 * Created by wathmal on 1/4/17.
 */

import React, {PropTypes} from 'react';
import { Card, CardText, CardActions, CardMedia, CardTitle } from 'react-toolbox/lib/card';

class Overview extends React.Component {

    constructor() {
        super();
        this.state = {
            slider1: true,
            slider2:false
        }
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
    };



    render() {

        return (
            <div>
                <div className="w3-content w3-display-container">
                    <img  src="images/slider/banner_2.png" alt="overview image"
                         className="mySlides img-responsive" style={{marginLeft: 'auto', marginRight:'auto', height:'300px'}}/>
                    <img  src="images/slider/banner_1.png" alt="overview image"
                         className="mySlides img-responsive" style={{marginLeft: 'auto', marginRight:'auto', height:'300px'}}/>
                </div>

                <div className="text-center" >
                    <h3>Welcome to the WireMe homepage</h3>
                    <p style={{padding: 10}}>WireMe introduce you the WireMe IoT Hub and the WireMe Nemesis as our first set of products</p>


                    <div className="row">
                        <div className="col-md-4 col-md-offset-1">
                            <div>
                                <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/#" alt=""
                                     className="img-responsive"
                                     style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                            </div>
                            <h4>WireMeIoT Hub</h4>
                            <p>Interactive visual programming tool to control your gadgets</p>
                        </div>
                        <div className="col-md-4 col-md-offset-1">
                            <div>
                                <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/#" alt=""
                                     className="img-responsive"
                                     style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                            </div>
                            <h4>WireMe Nemesis</h4>
                            <p>Centralized controlling unit to control your gadgets</p>
                        </div>
                    </div>
                </div>


            </div>
        )
    }

}

export default Overview;