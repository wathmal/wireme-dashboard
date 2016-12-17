/**
 * Created by wathmal on 12/2/16.
 */

import React, {PropTypes} from 'react';
import C3Chart from 'react-c3js';
import MainEmitter from '../../../services/MainEmitter';


class LineGraph extends React.Component{

    constructor(props){
        super(props);
        this.state={
            value: [0,0,0,0,0,0,0,0,0,0]
        }

    }
    static propTypes = {
        // mqtt topic is received with user_id/topic
        mqttTopic: React.PropTypes.string.isRequired,
        color: React.PropTypes.string
    };

    componentDidMount(){

        MainEmitter.on(this.props.mqttTopic, (payload) => {
            // update the state value
            // payload should be in type {value: int}
            let arr= this.state.value;
            // remove first and push
            arr.shift();
            arr.push(payload.value);
            this.setState({value: arr})
        })
    }

    render(){
        return(
            <div>
                <C3Chart data={{ json: [this.state.value], type: 'line', colors: [this.props.color] }} size={{height: 200}} />
            </div>
        )
    }
}

export default LineGraph;