/**
 * Created by wathmal on 12/1/16.
 */

import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button, IconButton} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';
import Avatar from 'react-toolbox/lib/avatar';
import RM from './../../../services/ResourceManager';
import { TwitterPicker } from 'react-color';

import Gauge from './../../Widgets/Gauge/Gauge';
import LineGraph from './../../Widgets/LineGraph/LineGraph'
import ToggleSwitch from './../../Widgets/ToggleSwitch/ToggleSwitch';
import RollerDial from './../../Widgets/RollerDial/RollerDial';


class WidgetCard extends React.Component {

    constructor(){
        super();
        this.handleColorPickerButton= this.handleColorPickerButton.bind(this);
        this.handleClose= this.handleClose.bind(this);

        this.state= {
            displayColorPicker: false
        }
    }
    static propTypes = {
        // mqttTopic: React.PropTypes.string.isRequired
        title: React.PropTypes.string,
        mqttTopic: React.PropTypes.string.isRequired,
        type: React.PropTypes.string

    };

    handleColorPickerButton(){
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    handleClose(){
        this.setState({ displayColorPicker: false });
    }

    render(){
        // styles for color picker
        const popover = {
            position: 'absolute',
            zIndex: '2'
        };
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        };

        // icon button style
        const picker={
            marginRight: 0,
            marginLeft: 'auto'
        };

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
                <CardActions>
                    <IconButton icon='settings' onClick={this.handleColorPickerButton} accent/>
                    { this.state.displayColorPicker ?
                        <div style={ popover }>
                            <div style={ cover } onClick={ this.handleClose }/>
                            <TwitterPicker triangle="hide" />
                        </div>
                        : null
                    }
                </CardActions>
            </Card>
        );
    }
}

export default WidgetCard;