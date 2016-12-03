/**
 * Created by wathmal on 11/30/16.
 */

import React, {PropTypes} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import {IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import Link from 'react-toolbox/lib/link';


import WidgetBuilder from './../WidgetBuilder/WidgetBuilder';
import MainEmitter from './../../services/MainEmitter';
import MQTTService from './../../services/MQTTService';
import RM from './../../services/ResourceManager';
import AuthService from './../../services/AuthService';

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            widgets: []
        }
    }
    
    static propTypes = {
        // mqttTopic: React.PropTypes.string.isRequired
    };

    componentDidMount(){
        // MainEmitter.emit('test');

        // assuming this receives a list of user widgest as follows
        /*
        * [{name: "my temperature", topic: "temp1", type: "gauge"}]
        * */

        const userDashboard= [
            {
                name: "study room temperature",
                topic: "study1",
                type: "gauge"
            },
            {
                name: "outdoor temp",
                topic: "out1",
                type: "line"
            },
            {
                name: "living room light",
                topic: "lbulb",
                type: "knob"
            },
            {
                name: "corridor bulb",
                topic: "cbulb",
                type: "switch"
            }
        ];

        const user={
            username: "wathmal",
            name: "sasitha wathmal",
            widgets: userDashboard
        };

        // TODO: this will done inside RM, after login
        RM.setUser(user);
        this.setState({widgets: userDashboard});

        /*
        * after receiving user widget details
        * 1. render components
        * 2. subscribe to MQTT topics
        * 3. in MQTT receive function, switch and emit received payloads tru MainEmitter by mqttTopic
        * 4. in each widget listen to mqttTopic tru MainEmitter, and do as required.
        * */

        let client= MQTTService.getClient();
        client.on('connect', ()=>{
            console.log('mqtt connected over WS');
            let topicArray= [];
            for (let n in userDashboard){
                topicArray.push(RM.getUsername()+'/'+ userDashboard[n].topic);
            }

            // subscribe to all topics
            client.subscribe(topicArray, (err, granted)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(granted);
                }
            })
        });

        client.on('message', (topic, message)=>{
            let mqttTopic= topic.substring(RM.getUsername().length+1);

            MainEmitter.emit(mqttTopic, JSON.parse(message.toString()));
            // console.log(mqttTopic);
            // console.log(JSON.parse(message.toString()));
        })
    }

    render(){
        return(
            <div>
                <AppBar title="wireme / dashboard" >
                    <Navigation type="horizontal">


                     <IconMenu icon='more' position='topRight' menuRipple style={{marginRight: '-1.25rem'}}>
                         <MenuItem value='logout' onClick={AuthService.logout} icon='exit_to_app' caption='logout' />
                     </IconMenu>




                    </Navigation>
                </AppBar>

                <WidgetBuilder widgets={this.state.widgets} />
            </div>
        )
    }
}

export default Dashboard;