/**
 * Created by wathmal on 2/2/17.
 */

import React, {PropTypes} from 'react';
import style from './Landing.scss';
import {Button} from 'react-toolbox/lib/button';
import RM from './../../services/ResourceManager';

import Slider from 'react-slick';
import SliderStyle from 'slick-carousel'

const linkButton= {color: 'white',textDecoration: 'none'};

class Landing extends React.Component {

    constructor() {
        super();
        this.sendMessage= this.sendMessage.bind(this);

        this.state = {
            email: '',
            name: '',
            message: ''
        }
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
//<img className="img-responsive" src="images/landing/vptool-macbook.png" alt=""/>
    };

    handleChange = (name, e) => {
        let temp={};
        temp[name]= e.target.value;
        this.setState(temp);
    };

    componentDidMount(){

    }
    
    sendMessage(){
        $.ajax({
            method: 'POST',
            url: '/api/sendemail',
            data: JSON.stringify(this.state),
            dataType: 'json',
            contentType: "application/json",
            success: (data) => {
                alert('thank you for contacting us. a member from our team will replay u shortly.')
            },
            error: (xhr, status, err) => {
                alert('oopz, we have some error.')
            }
        });
    }

    render() {

        return (
            <div >
                <div className={style.landingSection}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="img-responsive" style={{width: 100, padding: 10}} src="/images/wireme-text-logo.png" alt=""/>
                            </div>
                            <div className="col-md-6 hidden-sm hidden-xs">
                                <ul className={style.landingNav}>
                                    {(RM.getUsername()) ?
                                        <li><Button href='/dashboard' flat style={linkButton}>dashboard</Button></li>
                                        :
                                        <li><Button href='/register' flat style={linkButton}>register</Button></li>

                                    }
                                    <li><Button href='/quickstart' flat style={linkButton}>quick start</Button></li>
                                    {(RM.getUsername()) ?
                                        <li><Button href='/profile' icon='person' flat style={linkButton}>{RM.getUsername()}</Button></li>
                                        :
                                        <li><Button href='/login' flat style={linkButton}>login</Button></li>

                                    }
                                </ul>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">

                                <div className={style.textSlider}>
                                    <h1 className={style.heading}>A ridiculously easy IOT platform</h1>
                                    <h4 className={style.subtext}><code>&#60; with zero coding &#62;</code></h4>
                                </div>

                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-12" style={{padding: 20}}>
                                <Button href='/dashboard' raised style={{textDecoration:'none'}}>go to dashboard</Button>
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6 col-md-offset-3" style={{paddingTop: 10}}>
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/-T88A6U8xs0" frameBorder="0" allowFullScreen />
                                </div>

                            </div>

                        </div>
                    </div>


                </div>

                <div className={style.featuresSection}>
                    <div className="container">
                        <h3 className={style.subHeading}>FEATURES</h3>

                        <div style={{paddingTop: 20}}>
                            <div className="row">
                                <div className="col-md-4">
                                    <h4 className="font-norwester text-center">IOT HUB</h4>
                                    <img className="img-responsive" src="images/landing/vptool-mac.png" alt=""/>
                                    <br/>
                                    <div><code>scratch</code> based interactive visual programming tool</div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="font-norwester text-center">NEMESIS</h4>
                                    <img className="img-responsive" src="images/landing/nemesis.jpg" alt=""/>
                                    <br/>
                                    <div>easily deployable gadget kit with a centralized control unit</div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="font-norwester text-center">DASHBOARD</h4>
                                    <img className="img-responsive" src="images/landing/dashboard-mac.png" alt=""/>
                                    <br/>
                                    <div>web based dashboard to control it from anywhere</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={style.contactUs}>
                    <div className="container">
                        <h3 className={style.subHeading}>GET IN TOUCH</h3>

                        <div className="row" style={{paddingTop: 50}}>

                                <div className="col-md-6">
                                    <form>
                                        <div className="form-group">
                                            <input className="form-control input-lg" name="name" type="text" placeholder="name" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control input-lg" name="email" type="text" placeholder="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control input-lg" name="message" rows="3" placeholder="your message" value={this.state.message} onChange={this.handleChange.bind(this, 'message')} />

                                        </div>
                                        <div style={{textAlign: 'center'}}>

                                            <Button raised onClick={this.sendMessage}>send a message</Button>
                                        </div>

                                    </form>

                                </div>

                                <div className="col-md-6 text-center" style={{paddingTop: 40}}>
                                    <div>
                                        <a href="#" className={style.link} style={{backgroundColor: '#3B5998', color: 'white'}} target="_parent"><span className="fa fa-facebook" /></a>
                                        <a href="#" className={style.link} style={{backgroundColor: '#00ACEE', color: 'white'}} target="_parent"><span className="fa fa-twitter" /></a>
                                        <a href="#" className={style.link} style={{backgroundColor: '#b31217', color: 'white'}} target="_parent"><span className="fa fa-youtube" /></a>
                                    </div>
                                </div>

                        </div>
                    </div>


                </div>
            </div>
        )
    }

}

export default Landing;