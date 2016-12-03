/**
 * Created by wathmal on 11/30/16.
 */

import React, {PropTypes} from 'react';
import C3Chart from 'react-c3js';
import MainEmitter from '../../../services/MainEmitter';


class Gauge extends React.Component{

    constructor(props){
        super(props);
        this.state={
            value: 0
        }

    }
    static propTypes = {
        // mqtt topic is received with user_id/topic
        mqttTopic: React.PropTypes.string.isRequired
    };

    componentDidMount(){

        MainEmitter.on(this.props.mqttTopic, (payload) => {
            // update the state value
            // payload should be in type {value: int}
            this.setState({value: payload.value})
        })
    }

    render(){
        return(
            <div>
                <C3Chart data={{ json: [this.state.value], type: 'gauge' }} size={{height: 200}} gauge={{min:0, max:50, label:{format: (value, ratio)=>{return value;}}}} />
            </div>
        )
    }
}

export default Gauge;