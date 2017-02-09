/**
 * Created by wathmal on 2/10/17.
 */

import React, {PropTypes} from 'react';
import MainEmitter from './../../../services/MainEmitter';
import style from './StatusIndicator.scss';

class StatusIndicator extends React.Component {

    constructor() {
        super();
        this.state = {
            isConnected: false
        }
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
    };
    
    componentDidMount(){
        
        MainEmitter.on('alive', (payload) => {
            // update the state value
            // payload should be either 0 or 1 for alive topic
            this.setState({isConnected: parseInt(payload)});
            console.log('alive: '+ payload);
        })
        
    }

    render() {

        const circleColor = this.state.isConnected ? "#4CAF50" : "#F44336";

        return (
            <div className="container">
                <div className={style.indicator}>

                    <div className={style.indicatorContainer}>
                        <div className={style.statusCircle} style={{backgroundColor: circleColor}} />
                        <div className={style.statusText}>
                            {
                                (this.state.isConnected) ? "connected": "disconnected"
                            }
                        </div>
                    </div>


                </div>
            </div>
        )
    }

}

export default StatusIndicator;