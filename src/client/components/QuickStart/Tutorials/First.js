/**
 * Created by wathmal on 1/4/17.
 */

import React, {PropTypes} from 'react';
import {Button} from 'react-toolbox/lib/button';
import { Card, CardText, CardActions, CardMedia, CardTitle } from 'react-toolbox/lib/card';

class First extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
    };

    render() {

        return (
            <div className="text-center">
                <div style={{padding: 20}}><h2>Getting Started</h2></div>
                <h5>Think Drag and Drop. No Coding</h5>

                <div className="row " style={{padding: 20}}>
                    <div className="col-md-6">
                        <h4 style={{padding: 15}}>Download WireMe IoT Hub for Windows</h4>
                        <Button icon="cloud_download" label='download'
                                onclick={()=>{window.open('https://goo.gl/ASRPec')}} raised
                                style={{borderRadius: 20,backgroundColor: '#0d7c82', color:'#ffffff'}}/>
                    </div>
                    <div className="col-md-6">
                        <h4 style={{padding: 15}}>Installation Guide</h4>
                        <p>Extract the downloaded zip file. Then run the WireMe.exe from your extracted location and
                            allow
                            networking in your firewall if prompted.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <h4 style={{padding: 15}}>Get to know the IoT Hub</h4>
                    <p>Main components of the IoT Hub</p>
                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/overview.png" alt="overview image"
                         className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10, width:600, height:'auto'}}/>
                </div>

                <div className="row">
                    <h4 style={{padding: 20}}>Start Your First Program</h4>
                </div>


                <p style={{paddingTop: 10}}>Let's Make a Gadget to Monitor Home Temperature</p>
                <div className="row">
                    <div className="col-md-4">
                        <Card style={{height: '412px'}} >
                            <CardTitle title="Step 1"
                                       subtitle="Configure WiFi setup"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/wifi.PNG" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card style={{height: '412px'}} >
                            <CardTitle  title="Step 2"
                                       subtitle="Add forever block from control"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/forever.PNG" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card style={{height: '412px'}}>
                            <CardTitle title="Step 3"
                                       subtitle="Add send to dashboard block and read temperature block"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/sendtemp.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto'}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                </div>

                <div className="row" style={{paddingTop:20}}>
                    <div className="col-md-4">
                        <Card style={{height: '300px'}} >
                            <CardTitle title="Step 4"
                                       subtitle="Add new sprites"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/add_new.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card style={{height: '300px'}} >
                            <CardTitle  title="Step 5"
                                        subtitle="Select a sprite"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/pick_sprite.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card style={{height: '300px'}}>
                            <CardTitle title="Step 6"
                                       subtitle="Configure the widget"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/configure.PNG" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                </div>

                <p style={{paddingTop: 20}}>You can download this simple example project from <a>here.</a></p>
                <div className="row">
                    <h4 style={{padding: 15}}>Let's Activate WireMe Nemesis</h4>
                    <p>Main components of the IoT Hub</p>
                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/upload.png" alt="code upload image"
                         className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10, width:600, height:'auto'}}/>
                </div>

                <p style={{paddingTop: 20}}>Note: make sure to select correct serial port from the menu.
                    [Screenshot]
                    <br/>
                    Be patient while uploading finished.
                    [scrn]
                </p>

                <div className="row">
                    <h4 style={{padding: 15}}>Make Your Gadget Live</h4>
                </div>

                <div className="row" style={{paddingTop:20}}>
                    <div className="col-md-4">
                        <Card style={{height: '300px'}} >
                            <CardTitle title="Step 1"
                                       subtitle="Connect the WireMe Nemesis to external power supply"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/nemesis.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card style={{height: '300px'}} >
                            <CardTitle  title="Step 2"
                                        subtitle="Connect the gadgets according to color labels"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/nemesis.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card style={{height: '300px'}}>
                            <CardTitle title="Step 3"
                                       subtitle="Turn on the WireMe Nemesis"/>
                            <CardText>
                                <div>
                                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/nemesis.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                                </div>
                            </CardText>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <h4 style={{padding: 15}}>Easy Access With The Online Dashboard </h4>
                    <p>You can login to your own personalized dashboard form <a>here</a></p>
                    <img src="http://wireme.projects.mrt.ac.lk/images/tutorial/dashboard.png" alt="code upload image"
                         className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10, width:600, height:'auto'}}/>
                </div>
            </div>

            )
    }

}

export default First;