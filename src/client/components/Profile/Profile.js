/**
 * Created by lakshan on 12/31/16.
 */

import React, {PropTypes} from 'react';
import Input from 'react-toolbox/lib/input';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

import Header from './../Header/Header';
import AuthService from './../../services/AuthService';
import RM from './../../services/ResourceManager';


class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.showForm=this.showForm.bind(this);
        this.state = {
            name: RM.getName(),
            username: RM.getUsername(),
            old_pwd:'',
            pwd: '',
            conf_pwd: '',
            error: '',
            miss_match_pwd: '',
            blank_user: '',
            blank_name: '',
            blank_pass: '',
            btnTxt:'edit profile',
            visible:true,
            visible2:false
        }

    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    onClickUpdate() {
        this.clearFields();
        if(this.state.name == ''){
            this.setState({blank_name: "name cannot be null"});
            return;
        }else if(this.state.username == ''){
            this.setState({blank_user: "username cannot be null"});
            return;
        }else if(this.state.old_pwd == ''){
            this.setState({blank_pass: "password cannot be null"});
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
        AuthService.updateProfile(RM.getUsername(),this.state.name, this.state.username,this.state.old_pwd, this.state.pwd).then(res => {
            console.log(res);
            this.setState({error: ''});
            this.setState({miss_match_pwd: ''});

            // redirect on success
            window.location = '/profile';
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

    showForm(){
        if(this.state.visible==true){
            this.setState({visible:false});
            this.setState({visible2:true});
            this.setState({btnTxt:'undo'});
        }else{
            this.setState({visible:true});
            this.setState({visible2:false});
            this.setState({btnTxt:'edit profile'});
        }
    }

    render() {
        return (
            <div>
                <Header title="wireme / profile" />

                <div className="col-md-10 col-md-offset-1 col-xs-12" style={{paddingTop: 20}}>

                    <Card style={{width: '100%'}}>
                        <CardText>
                            <div>
                                <img src="http://wireme.projects.mrt.ac.lk/images/wireme_logo.png" alt=""
                                     className="img-responsive"
                                     style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                            </div>
                            <section hidden={this.state.visible2}>
                                <h6>{RM.getName()}</h6>
                                <h7 style={{color:"#696d72"}}>{RM.getUsername()}</h7>
                            </section>
                            <section hidden={this.state.visible}>
                                <Input type='text' error={this.state.error+this.state.error+this.state.blank_name} label='name'
                                       value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
                                <Input type='text' error={this.state.error+this.state.blank_user} label='username'
                                       value={this.state.username} onChange={this.handleChange.bind(this, 'username')}/>
                                <Input type='password' error={this.state.error+this.state.blank_pass} label='old password'
                                       value={this.state.old_pwd} onChange={this.handleChange.bind(this, 'old_pwd')}/>
                                <Input type='password' error={this.state.miss_match_pwd+this.state.error+this.state.blank_pass} label='new password'
                                       value={this.state.pwd} onChange={this.handleChange.bind(this, 'pwd')}/>
                                <Input type='password' error={this.state.miss_match_pwd+this.state.error} label='confirm new password'
                                       value={this.state.conf_pwd} onChange={this.handleChange.bind(this, 'conf_pwd')}/>
                            </section>
                        </CardText>
                        <CardActions style={{marginLeft: 'auto', marginRight:'auto'}}>
                            <Button  icon="account_box" label={this.state.btnTxt}  raised  onClick={this.showForm}/>
                            <Button disabled={this.state.visible} icon="update" label='update' raised primary onClick={this.onClickUpdate}/>
                        </CardActions>
                    </Card>

                </div>
            </div>

        );
    }
}

export default Profile;
