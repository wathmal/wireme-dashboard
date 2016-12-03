/**
 * Created by wathmal on 12/1/16.
 */
import React from 'react';
import style from './../../node_modules/react-toolbox/lib/commons.scss';

class App extends React.Component {

    /*
     * this page should have initial logic to generate widget dashboard after login
     * render WidgetBuilder
     * */

    // For debugging
    /*    componentDidMount() {
     this._interval = setInterval(() => {
     var value = Math.floor(Math.random() * 50) + 1;
     this.setState({gaugeData: value});
     console.log(value);
     this.forceUpdate();
     }, 100);
     }

     componentWillUnmount() {
     clearInterval(this._interval);
     }*/

    render() {
        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
}

export default App;