/**
 * Created by wathmal on 12/2/16.
 */

import React, {PropTypes} from 'react';
import Knob from 'react-canvas-knob';
import MQTTService from './../../../services/MQTTService';
import RM from './../../../services/ResourceManager';

class RollerDial extends React.Component {
    constructor(props){
        super(props);

        this.handleChange= this.handleChange.bind(this);
        this.state={
            value: 25
        }

    }
    static propTypes = {
        // mqtt topic is received with user_id/topic
        mqttTopic: React.PropTypes.string.isRequired
    };

    handleChange(newValue){
        // toggle state
        this.setState({value: newValue});

        MQTTService.getClient().publish(RM.getUsername()+"/" +this.props.mqttTopic, JSON.stringify({value: newValue}), (err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log('action published');
            }
        })

    }

    componentDidMount(){


    }

    render(){
        return(
            <div style={{height: 200, textAlign: 'center', padding: 10}}>

                <Knob
                    value={this.state.value}
                    onChange={this.handleChange}
                    width={180}
                />

            </div>
        )
    }
}

export default RollerDial;