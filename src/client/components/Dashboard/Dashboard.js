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

        let client= MQTTService.getClient();

        AuthService.checkIfLoggedIn().then(r =>{

            // if logged in get user widgets
            AuthService.getUserWidgets().then(res=>{
                // set new state only if there are widgets
                if(res.data.length > 0) {
                    this.setState({widgets: res.data});

                    // generate MQTT subscriber array
                    let topicArray = [];
                    for (let n in this.state.widgets) {
                        topicArray.push(RM.getUsername() + '/' + this.state.widgets[n].topic);
                    }

                    // subscribe to all topics
                    client.subscribe(topicArray, (err, granted)=> {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('subscribed to MQTT topics');
                        }
                    });
                }
            }, err=>{

                //console.log(err);
            });


        }, e=>{
            // not logged in or token not verified
            AuthService.logout(false);
        });




        /*
        * after receiving user widget details
        * 1. render components
        * 2. subscribe to MQTT topics
        * 3. in MQTT receive function, switch and emit received payloads tru MainEmitter by mqttTopic
        * 4. in each widget listen to mqttTopic tru MainEmitter, and do as required.
        * */
        client.on('message', (topic, message)=>{
            let mqttTopic= topic.substring(RM.getUsername().length+1);

            MainEmitter.emit(mqttTopic, JSON.parse(message.toString()));
            // console.log(mqttTopic);
            // console.log(JSON.parse(message.toString()));
        })
    }

    render(){
        const linkStyle={
            color: '#FFF'
        };

        return(
            <div>
                <AppBar title="wireme / dashboard" >
                    <Navigation type="horizontal">

                        <Link href='profile' label={RM.getUsername()} icon='person' style={{ textDecoration: 'none', color: "white" }} />
                        <IconMenu icon='more' position='topRight' menuRipple style={{marginRight: '-1.25rem'}}>
                            <MenuItem value='logout' onClick={()=> AuthService.logout(true)} icon='exit_to_app' caption='logout' />
                        </IconMenu>




                    </Navigation>
                </AppBar>

                <WidgetBuilder widgets={this.state.widgets} />
            </div>
        )
    }
}

export default Dashboard;