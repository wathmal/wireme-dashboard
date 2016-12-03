/**
 * Created by wathmal on 11/30/16.
 */

import React, {PropTypes} from 'react';
import WidgetCard from './WidgetCard/WidgetCard';


class WidgetBuilder extends React.Component{

    constructor(props){
        super(props);
        /*this.state= {
            count: 3
        };*/

    }
    static propTypes = {
        widgets: React.PropTypes.array
    };

    render(){
        let Widgets= [];
        // console.log(this.props.widgets);
        if(this.props.widgets.length >0) {

            for (let c = 0; c < this.props.widgets.length; c++) {
                Widgets.push(<div className="col-md-4 col-xs-12" style={{marginBottom: '10px'}}>
                    <WidgetCard title={this.props.widgets[c].name} mqttTopic={this.props.widgets[c].topic} type={this.props.widgets[c].type}/>

                </div>)
            }
        }
        return(
            <div className="container" style={{paddingTop: 20}}>
                <div className="row">
                    {Widgets}
                </div>

            </div>
        )
    }
}

export default WidgetBuilder;