/**
 * Created by lakshan on 12/5/16.
 */

import React, {PropTypes} from 'react';
import Input from 'react-toolbox/lib/input';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

import Header from './../Header/Header';
import AuthService from './../../services/AuthService';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.onClickRegister = this.onClickRegister.bind(this);
        this.clearFields = this.clearFields.bind(this)
        this.state = {
            name: '',
            username: '',
            pwd: '',
            conf_pwd: '',
            error: '',
            miss_match_pwd: '',
            blank_user: '',
            blank_name: '',
            blank_pass: ''
        }

    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    onClickRegister() {
        console.log('register');
        this.clearFields();
        if(this.state.name == ''){
            this.setState({blank_name: "name cannot be null"});
            return;
        }else if(this.state.username == ''){
            this.setState({blank_user: "username cannot be null"});
            return;
        }else if(this.state.pwd == ''){
            this.setState({blank_pass: "password cannot be null"});
            return;
        }else if(this.state.pwd != this.state.conf_pwd){
            this.setState({miss_match_pwd: "passwords mismatch. please re enter"});
            this.state.pwd= '';
            this.state.conf_pwd= '';
            return;
        }
        // verify inputs
        AuthService.register(this.state.name, this.state.username, this.state.pwd).then(res => {
            console.log(res);
            this.setState({error: ''});
            this.setState({miss_match_pwd: ''});

            // redirect on success
            window.location = '/login';
        }, err=> {
            console.log('here  '+err.error);
            if(err.error=="ER_DUP_ENTRY"){
                this.setState({blank_user: 'username already exists'});
                return;
            }
            this.setState({error: "something went wrong. pls try again"});
        })
    }

    clearFields(){
        console.log("clearing fields");
        this.setState({error: ''});
        this.setState({miss_match_pwd: ''});
        this.setState({blank_user: ''});
        this.setState({blank_name: ''});
        this.setState({blank_pass: ''});
    }

    render() {
        return (
            <div>
                <Header title="register" />

                <div className="col-md-4 col-md-offset-4 col-xs-12" style={{paddingTop: 20}}>

                    <Card style={{width: '100%'}}>
                        <CardText>
                            <div>
                                <img src="images/wireme-text-logo-black.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10, width: '50%'}}/>
                            </div>
                            <br/>
                            <section>
                                <Input type='text' error={this.state.error+this.state.blank_name} label='name'
                                       value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
                                <Input type='text' error={this.state.error+this.state.blank_user} label='username'
                                       value={this.state.username} onChange={this.handleChange.bind(this, 'username')}/>
                                <Input type='password' error={this.state.miss_match_pwd+this.state.error+this.state.blank_pass} label='password'
                                       value={this.state.pwd} onChange={this.handleChange.bind(this, 'pwd')}/>
                                <Input type='password' error={this.state.miss_match_pwd+this.state.error} label='confirm password'
                                       value={this.state.conf_pwd} onChange={this.handleChange.bind(this, 'conf_pwd')}/>
                            </section>
                        </CardText>
                        <CardActions style={{marginLeft: 'auto', marginRight:'auto'}}>
                            <Button icon="lock_open" label='register' raised onClick={this.onClickRegister} style={{backgroundColor: '#0d7c82', color:'#ffffff'}}/>
                        </CardActions>
                        <CardText style={{marginLeft: 'auto', marginRight:'auto', textTransform:'uppercase'}}>already have an account? <a href='login'><b>log in</b></a></CardText>
                    </Card>

                </div>
            </div>

        );
    }
}

export default Register;
