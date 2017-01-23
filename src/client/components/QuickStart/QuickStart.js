/**
 * Created by wathmal on 1/4/17.
 */

import React, {PropTypes} from 'react';
import Header from './../Header/Header';
import Overview from './../QuickStart/Tutorials/Overview';
import First from './../QuickStart/Tutorials/First';
import Second from './../QuickStart/Tutorials/Second';
import Third from './../QuickStart/Tutorials/Third';
import {Navigation} from 'react-toolbox/lib/navigation';
import {Link} from 'react-toolbox/lib/link';


class QuickStart extends React.Component {

    constructor() {
        super();

        this.showForm = this.showForm.bind(this);
        this.showForm1 = this.showForm1.bind(this);
        this.showForm2 = this.showForm2.bind(this);
        this.showForm3 = this.showForm3.bind(this);
        this.state = {
            visible: false,
            visible1: true,
            visible2: true,
            visible3: true,
        }
    }
    showForm() {

        this.setState({visible: true, visible1: true, visible2: true, visible3: true});
        //switch (topic){
        //    case 0:
        //        console.log("here i am 0");
        //        this.setState({visible: false});
        //        break;
        //    case 1:
        //        console.log("here i am 1");
        //        this.setState({visible1: false});
        //        break;
        //    case 2:
        //        console.log("here i am 2");
        //        this.setState({visible2: false});
        //        break;
        //    case 3:
        //        console.log("here i am 3");
        //        this.setState({visible3: false});
        //        break;
        //}
    }

    showForm1(){
        this.setState({visible: true, visible1: false, visible2: true, visible3: true});
    }
    showForm2(){
        this.setState({visible: true, visible1: true, visible2: false, visible3: true});
    }
    showForm3(){
        this.setState({visible: true, visible1: true, visible2: true, visible3: false});
    }

    render() {

        return (
            <div>
                <Header title="quick start" />

                <div className="container" style={{paddingTop: 20, paddingBottom:10}}>

                    <img src="images/headers/quick_start.png" alt="wireme quick start" className="img-responsive"/>
                </div>
                <div className="col-md-2" >
                    <Navigation type='vertical'>
                        <Link onClick={this.showForm} label="Overview" style={{ fontSize:'14px' , textDecoration: 'none' }} />
                        <Link onClick={this.showForm1} label="Make Connection" style={{ fontSize:'14px' , textDecoration: 'none' }} />
                        <Link onClick={this.showForm2} label="Add a new Component" style={{ fontSize:'14px' , textDecoration: 'none' }} />
                        <Link onClick={this.showForm3} label="Own logic" style={{ fontSize:'14px' , textDecoration: 'none' }} />
                    </Navigation>
                </div>
                <div className="col-md-10" style={{paddingTop: 20}}>
                    <section hidden={this.state.visible}><Overview /></section>
                    <section hidden={this.state.visible1}><First /></section>
                    <section hidden={this.state.visible2}><Second /></section>
                    <section hidden={this.state.visible3}><Third /></section>
                </div>
            </div>
        )
    }

}

export default QuickStart;