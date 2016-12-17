/**
 * Created by wathmal on 12/2/16.
 */

import React, {PropTypes} from 'react';
import Switch from 'react-toolbox/lib/switch';
import MQTTService from './../../../services/MQTTService';
import RM from './../../../services/ResourceManager';
import style from './ToggleSwitch.scss';

class ToggleSwitch extends React.Component {
    constructor(props){
        super(props);

        this.handleChange= this.handleChange.bind(this);
        this.state={
            value: false
        }

    }
    static propTypes = {
        // mqtt topic is received with user_id/topic
        mqttTopic: React.PropTypes.string.isRequired,
        color: React.PropTypes.string
    };

    handleChange(event){
        // toggle state
        let newValue;
        if(this.state.value){
            this.setState({value: false});
            newValue = false;
        }
        else{
            this.setState({value: true});
            newValue = true;
        }

        // no use of MainEmitter
        // send button state via MQTT for the topic.

        // TODO: save username in local storage and use
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
            <div style={{height: 200, textAlign: 'center'}}>

                <div style={{paddingTop: 50}}>

                    <input type="checkbox" id="switch1" className={style.switch} checked={this.state.value} onChange={this.handleChange} />
                    <label htmlFor="switch1" style={{backgroundColor: this.props.color}} />
                </div>

            </div>
        )
    }
}

export default ToggleSwitch;