/**
 * Created by wathmal on 2/2/17.
 */

import React, {PropTypes} from 'react';
import style from './Landing.scss';
import {Button} from 'react-toolbox/lib/button';
import RM from './../../services/ResourceManager';
import { Card, CardText, CardActions, CardMedia, CardTitle} from 'react-toolbox/lib/card';
import {IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import AuthService from './../../services/AuthService';


class Landing extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        //title: React.PropTypes.string.isRequired
    };

    render() {

        return (
            <div >
                <div className={style.landingSection}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="img-responsive" style={{width: 100, padding: 10}} src="/images/wireme-text-logo.png" alt=""/>
                            </div>
                            <div className="col-md-6">
                                <ul className={style.landingNav}>

                                    {(RM.getUsername()) ?
                                        <li><Button href='/dashboard' flat style={{color: 'white',textDecoration: 'none'}}>dashboard</Button></li>
                                        :
                                        <li><Button href='/register' flat style={{color: 'white',textDecoration: 'none'}}>register</Button></li>

                                    }
                                    <li><Button href='/quickstart' flat style={{color: 'white',textDecoration: 'none'}}>quick start</Button></li>
                                    {(RM.getUsername()) ?
                                        <li><Button href='/profile' icon='person' flat style={{color: 'white',textDecoration: 'none'}}>{RM.getUsername()}</Button></li>
                                        :
                                        <li><Button href='/login' flat style={{color: 'white',textDecoration: 'none'}}>login</Button></li>

                                    }
                                    {(RM.getUser()) ?
                                        <li>
                                            <IconMenu icon='more' position='topRight' menuRipple style={{marginRight: '-1.25rem'}}>
                                                <MenuItem value='logout' onClick={()=> AuthService.logout(true)} icon='exit_to_app'
                                                          caption='logout'/>
                                            </IconMenu></li>
                                        : null
                                    }
                                </ul>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">

                                <div className={style.textSlider}>
                                    <h1 className={style.heading}>A ridiculously easy IOT platform</h1>
                                    <h4 className={style.subtext}><code>with zero coding</code></h4>
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
                                <img className="img-responsive" src="images/landing/vptool-macbook.png" alt=""/>
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
                                    <img className="img-responsive" src="images/landing/vptool-mac.png" alt="vp tool"/>
                                    <br/>
                                    <div><code>scratch</code> based interactive visual programming tool</div>
                                </div>
                                <div className="col-md-4">
                                    <img className="img-responsive" src="https://placehold.it/1366x862" alt="nemesis"/>
                                    <br/>
                                    <div>easily deployable gadget kit with a centralized control unit</div>
                                </div>
                                <div className="col-md-4">
                                    <img className="img-responsive" src="images/landing/dashboard-mac.png" alt="dashboard"/>
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
                                            <input className="form-control input-lg" name="name" type="text" placeholder="name" />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control input-lg" name="email" type="text" placeholder="email" />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control input-lg" name="message" rows="3" placeholder="your message" />

                                        </div>
                                        <div style={{textAlign: 'center'}}>

                                            <Button raised>send a message</Button>
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