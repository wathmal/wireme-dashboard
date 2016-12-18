/**
 * Created by wathmal on 12/1/16.
 */

import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button, IconButton} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';
import Avatar from 'react-toolbox/lib/avatar';
import RM from './../../../services/ResourceManager';
import { CirclePicker } from 'react-color';

import Gauge from './../../Widgets/Gauge/Gauge';
import LineGraph from './../../Widgets/LineGraph/LineGraph'
import ToggleSwitch from './../../Widgets/ToggleSwitch/ToggleSwitch';
import RollerDial from './../../Widgets/RollerDial/RollerDial';


class WidgetCard extends React.Component {

    constructor(){
        super();
        this.handleColorPickerButton= this.handleColorPickerButton.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleColorChange= this.handleColorChange.bind(this);

        this.state= {
            displayColorPicker: false,
            color: '#FFC107'
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

    handleColorChange(color){
        this.setState({ color: color.hex });
        RM.setColorForWidget(this.props.mqttTopic, color.hex);
    }

    render(){
        // styles for color picker
        const popover = {
            position: 'absolute',
            zIndex: '2',
            paddingLeft: 40
        };
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        };


        // choose corresponding widget
        let Widget;
        // generate props for the widget
        let props = {
            mqttTopic: this.props.mqttTopic,
            color: (RM.getColorForWidget(this.props.mqttTopic))? RM.getColorForWidget(this.props.mqttTopic): this.state.color
        };
        switch (this.props.type){
            case "gauge":
                Widget = <Gauge {...props} />;
                break;
            case "line":
                Widget = <LineGraph {...props} />;
                break;
            case "switch":
                Widget = <ToggleSwitch {...props} />;
                break;
            case "knob":
                Widget = <RollerDial {...props} />;
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
                    <IconButton icon='color_lens' onClick={this.handleColorPickerButton} style={{color: '#BDBDBD'}} />
                    { this.state.displayColorPicker ?
                        <div style={ popover }>
                            <div style={ cover } onClick={ this.handleClose }/>
                            <CirclePicker onChange={this.handleColorChange} circleSize="16" colors={["#F44336", "#E91E63", "#9C27B0", "#2196F3", "#009688", "#FFC107", "#795548"]} />
                        </div>
                        : null
                    }
                </CardActions>
            </Card>
        );
    }
}

export default WidgetCard;