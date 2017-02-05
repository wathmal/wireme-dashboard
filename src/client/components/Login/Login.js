/**
 * Created by wathmal on 12/3/16.
 */

import React, {PropTypes} from 'react';
import Input from 'react-toolbox/lib/input';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import Header from './../Header/Header';

import AuthService from './../../services/AuthService';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.onClickLogin= this.onClickLogin.bind(this);
        this.state={
            username: '',
            pwd: '',
            error: ''
        }

    }
    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    onClickLogin(){
        console.log('login');
        // verify inputs
        AuthService.login(this.state.username, this.state.pwd).then(res =>{
            console.log(res);
            this.setState({error: ""});
            // redirect on success
            window.location = '/dashboard';
        }, err=>{
            console.log(err);
            this.setState({error: "something went wrong. pls try again"});
        })
    }

    render() {
        return (
            <div>
                <Header title="login" />

                <div className="col-md-4 col-md-offset-4 col-xs-12" style={{paddingTop: 20}}>

                    <Card style={{width: '100%'}}>
                        <CardText>
                            <div>
                                <img src="images/wireme-text-logo-black.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10, width: '50%'}}/>
                            </div>
                            <br/>
                            <section>
                                <Input type='text' error={this.state.error} label='username' icon='perm_identity' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} />
                                <Input type='password' error={this.state.error} label='password' icon='vpn_key' value={this.state.pwd} onChange={this.handleChange.bind(this, 'pwd')} />
                            </section>
                        </CardText>
                        <CardActions style={{marginLeft: 'auto', marginRight:'auto'}}>
                            <Button icon="lock_open" label='login' raised primary onClick={this.onClickLogin} />
                        </CardActions>
                        <CardText style={{marginLeft: 'auto', marginRight:'auto', textTransform: 'uppercase'}}>new to <b>wireme?</b> <a href='register'><b>register</b></a></CardText>
                    </Card>

                </div>
            </div>
        );
    }
}

export default Login;