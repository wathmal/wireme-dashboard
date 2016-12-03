/**
 * Created by wathmal on 12/1/16.
 */

import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button, IconButton} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';
import Avatar from 'react-toolbox/lib/avatar';
import RM from './../../../services/ResourceManager';

import Gauge from './../../Widgets/Gauge/Gauge';
import LineGraph from './../../Widgets/LineGraph/LineGraph'
import ToggleSwitch from './../../Widgets/ToggleSwitch/ToggleSwitch';
import RollerDial from './../../Widgets/RollerDial/RollerDial';


class WidgetCard extends React.Component {

    static propTypes = {
        // mqttTopic: React.PropTypes.string.isRequired
        title: React.PropTypes.string,
        mqttTopic: React.PropTypes.string.isRequired,
        type: React.PropTypes.string

    };
    render(){
        // choose corresponding widget
        let Widget;
        switch (this.props.type){
            case "gauge":
                Widget = <Gauge mqttTopic={this.props.mqttTopic}/>;
                break;
            case "line":
                Widget = <LineGraph mqttTopic={this.props.mqttTopic} />;
                break;
            case "switch":
                Widget = <ToggleSwitch mqttTopic={this.props.mqttTopic} />;
                break;
            case "knob":
                Widget = <RollerDial mqttTopic={this.props.mqttTopic} />;
                break;

        }

        return(
            <Card style={{width: '100%'}}>
                <CardTitle
                    title={this.props.title}
                    subtitle={RM.getUsername()+"/" +this.props.mqttTopic}
                />
                <CardText>
                    {Widget}
                </CardText>
            </Card>
        );
    }
}

export default WidgetCard;