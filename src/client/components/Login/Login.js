/**
 * Created by wathmal on 12/3/16.
 */

import React, {PropTypes} from 'react';
import Input from 'react-toolbox/lib/input';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

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
            window.location = '/';
        }, err=>{
            console.log(err);
            this.setState({error: "something went wrong. pls try again"});
        })
    }

    onClickRegister(){
        window.location = '/register';
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4 col-xs-12" style={{paddingTop: 20}}>

                <Card style={{width: '100%'}}>
                    <CardText>
                        <div>
                            <img src="http://wireme.projects.mrt.ac.lk/images/wireme_logo.png" alt="" className="img-responsive" style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                        </div>
                        <section>
                            <Input type='text' error={this.state.error} label='username' icon='perm_identity' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} />
                            <Input type='password' error={this.state.error} label='password' icon='vpn_key' value={this.state.pwd} onChange={this.handleChange.bind(this, 'pwd')} />
                        </section>
                    </CardText>
                    <CardActions style={{marginLeft: 'auto', marginRight:'auto'}}>
                        <Button icon="lock_open" label='login' raised primary onClick={this.onClickLogin} />
                        <Button label='register' raised primary onClick={this.onClickRegister} />
                    </CardActions>
                </Card>

            </div>
        );
    }
}

export default Login;