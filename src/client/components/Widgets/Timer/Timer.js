/**
 * Created by wathmal on 2/16/17.
 */

import React, {PropTypes} from 'react';
import Knob from 'react-canvas-knob';
import style from './Timer.scss';
import MainEmitter from '../../../services/MainEmitter';
import MQTTService from './../../../services/MQTTService';
import RM from './../../../services/ResourceManager';

class Timer extends React.Component {

    constructor() {
        super();

        this.handleChange= this.handleChange.bind(this);
        this.handleStart= this.handleStart.bind(this);
        this.handleStop= this.handleStop.bind(this);
        this.handleTextInput= this.handleTextInput.bind(this);
        this.state={
            started: false,
            target: 60,
            value: 0,
            inputTarget: 60
        }
    }

    static propTypes = {
        // mqtt topic is received with user_id/topic
        mqttTopic: React.PropTypes.string.isRequired,
        color: React.PropTypes.string
    };

    handleChange(newValue){
        // toggle state
        // console.log(newValue);

        // check if a new value
/*        if(newValue != this.state.value) {
            this.setState({value: newValue});

        }*/
        console.log(newValue);

    }

    handleStart(e){
        e.preventDefault();


        MQTTService.getClient().publish(RM.getUsername() + "/" + this.props.mqttTopic, JSON.stringify({value: this.state.inputTarget, state: 'on'}), (err)=> {
            if (err) {
                console.log(err)
            }
            else {
                console.log('action published');
                this.setState({started: true});
            }
        });

    }

    handleStop(){
        MQTTService.getClient().publish(RM.getUsername() + "/" + this.props.mqttTopic, JSON.stringify({value: this.state.inputTarget, state: 'off'}), (err)=> {
            if (err) {
                console.log(err)
            }
            else {
                console.log('action published');
                this.setState({started: false});
            }
        });
    }

    handleTextInput(event){
        this.setState({inputTarget: event.target.value});
    }

/*    shouldComponentUpdate(nextProps, nextState){
        console.log('target: ' +nextState.target);
        console.log('next value: ' +nextState.value);
        console.log('old value: ' +this.state.value);
        if(nextState.value !== this.state.value){
            this.setState({started: true});
        }

        return true;

    }*/


    componentDidMount(){

        // add "_pub"
        MainEmitter.on(this.props.mqttTopic+'_pub', (payload) => {
            // update the state value
            // payload should be in type {value: int}
            if(payload.current) {
                this.setState({value: payload.current});

                if(payload.current == payload.target){
                    this.setState({started: false});
                }
                else{
                    this.setState({started: true});

                }
            }
            else {
                this.setState({value: 0});
            }

            // set target
            if(this.state.target != payload.target){
                this.setState({target: payload.target});

            }

        })
    }

    secondsToMinutes(seconds){
        const mins= Math.floor(seconds/60);
        return mins+':'+  ("0"+(seconds - mins* 60)).slice(-2);
    }

    render() {

        return (
            <div style={{height: 200, textAlign: 'center', padding: 10}}>
                <div className={style.timer} >
                    <div style={{height: 100}}>
                        {
                            (!this.state.started) ?
                                <div>
                                    <p><b>set the timer in minutes</b></p>
                                    <input className={style.timeInput} type="number" value={this.state.inputTarget} onChange={this.handleTextInput} />
                                </div>
                                :
                                <div>
                                    <div className={style.timerText}>{this.secondsToMinutes(this.state.target - this.state.value)}</div>
                                    <button className="btn btn-danger btn-sm" onClick={this.handleStop}>OFF</button>
                                </div>

                        }
                    </div>


                    {
                        (!this.state.started) ?
                            <div className={style.buttonContainer}>
                                <a href="#" className="effect4" onClick={this.handleStart}>
                                    <i className="label">start</i>
                                </a>
                            </div>
                            :
                            <div style={{padding: 15}}>
                                <Knob
                                    value={this.state.value}
                                    width={80}
                                    bgColor="#E0E0E0"
                                    readOnly={true}
                                    min={0}
                                    max={this.state.target}
                                    onChange={this.handleChange}
                                    fgColor={this.props.color}

                                />
                            </div>
                    }

                    



                </div>
            </div>
        )
    }

}

export default Timer;