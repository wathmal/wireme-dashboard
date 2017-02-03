/**
 * Created by wathmal on 2/2/17.
 */

import React, {PropTypes} from 'react';
import style from './Landing.scss';
import {Button} from 'react-toolbox/lib/button';


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
                                <img className="img-responsive" style={{width: 100, padding: 10}} src="/images/wireme.png" alt=""/>
                            </div>
                            <div className="col-md-6">
                                <ul className={style.landingNav}>
                                    <li><Button href='/login' flat style={{color: 'white'}}>login</Button></li>
                                    <li><Button href='/register' flat style={{color: 'white'}}>register</Button></li>
                                    <li><Button href='/quickstart' flat style={{color: 'white'}}>quick start</Button></li>
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
                                <Button href='/dashboard' raised>go to dashboard</Button>
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6 col-md-offset-3" style={{paddingTop: 10}}>
                                <img className="img-responsive" src="images/tutorial/overview.png" alt=""/>
                            </div>

                        </div>
                    </div>


                </div>

                <div className={style.featuresSection}>
                    <div className="container">
                        <h3 style={{textAlign: 'center', textTransform: 'uppercase'}}>FEATURES</h3>


                        <div style={{paddingTop: 20}}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div><code>scratch</code> based interactive visual programming tool</div>
                                </div>
                                <div className="col-md-4">
                                    <div>easily deployable gadget kit with a centralized control unit</div>
                                </div>
                                <div className="col-md-4">
                                    <div>web based dashboard to control it from anywhere</div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className={style.contactUs}>
                    <div className="container">
                        <h3 style={{textAlign: 'center', textTransform: 'uppercase'}}>GET IN TOUCH</h3>

                    </div>

                </div>
            </div>
        )
    }

}

export default Landing;