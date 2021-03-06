/**
 * Created by lakshan on 12/31/16.
 */

import React, {PropTypes} from 'react';
import Input from 'react-toolbox/lib/input';
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import {Table} from 'react-toolbox/lib/table';
import {Dialog} from 'react-toolbox/lib/dialog';
import {Link} from 'react-toolbox/lib/link'

import Header from './../Header/Header';
import AuthService from './../../services/AuthService';
import RM from './../../services/ResourceManager';
import style from './Profile.scss';


class Profile extends React.Component {

    constructor() {
        super();

        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.showForm = this.showForm.bind(this);
        this.state = {
            name: "",
            username: "",
            old_pwd: '',
            pwd: '',
            conf_pwd: '',
            error: '',
            miss_match_pwd: '',
            blank_user: '',
            blank_name: '',
            blank_old_pass: '',
            blank_pass: '',
            btnTxt: 'edit profile',
            visible: false,
            visible2: false,
            btn_enabled: false,
            check_box:false,
            widgets: RM.getWidgets()
        }

    }

    componentDidMount(){
        AuthService.checkIfLoggedIn().then(r =>{
            console.log("user logged in ");
            this.setState({name: RM.getName(), username: RM.getUsername()});

        }, e=>{
            // not logged in or token not verified
            console.log("not logged in ");
            AuthService.logout(false);
        });
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
        this.setState({btn_enabled: true});
    };

    onClickUpdate() {
        this.clearFields();
        if (this.state.name == '') {
            this.setState({blank_name: "name cannot be null"});
            return;
        } else if (this.state.username == '') {
            this.setState({blank_user: "username cannot be null"});
            return;
        }
        if (this.state.visible2) {
            if (this.state.old_pwd == '') {
                this.setState({blank_old_pass: "enter the existing password"});
                return;
            } else if (this.state.pwd == '') {
                this.setState({blank_pass: "password cannot be null"});
                return;
            } else if (this.state.pwd != this.state.conf_pwd) {
                this.setState({miss_match_pwd: "passwords mismatch. please re enter"});
                this.state.pwd = '';
                this.state.conf_pwd = '';
                return;
            }
        }

        // verify inputs
        AuthService.updateProfile(RM.getUsername(), this.state.name, this.state.username, this.state.old_pwd, this.state.pwd).then(res => {
            console.log(res);
            this.setState({error: ''});
            this.setState({miss_match_pwd: ''});

            // redirect on success
            window.location = '/profile';
        }, err=> {
            console.log('here  ' + err.error);
            if (err.error == "ER_DUP_ENTRY") {
                this.setState({blank_user: 'username already exists'});
                return;
            }
            this.setState({error: "something went wrong. pls try again"});
        })
    }

    clearFields() {
        console.log("clearing fields");
        this.setState({error: ''});
        this.setState({miss_match_pwd: ''});
        this.setState({blank_user: ''});
        this.setState({blank_name: ''});
        this.setState({blank_pass: ''});
        this.setState({blank_old_pass: ''});
    }

    showForm() {
        if (this.state.visible == true) {
            this.setState({visible: false});
            this.setState({visible2: true});
        } else {
            this.setState({visible: true});
            this.setState({visible2: false});
        }
    }

    render() {

        const table_model = {
            title: {type: String},
            type: {type: String},
            topic: {type: String}
        };

        return (
            <div>
                <Header title="profile"/>

                <div className="container">
                    <div className="row" style={{paddingTop: 40}}>
                        <div className="col-md-4 col-md-offset-4 col-xs-12 form-group">
                            {/*<div>
                             <img src="http://wireme.projects.mrt.ac.lk/images/wireme_logo.png" alt=""
                             className="img-responsive"
                             style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                             </div>*/}

                            <div className="form-group-lg">
                                <section >
                                    <Input type='text' error={this.state.error+this.state.error+this.state.blank_name}
                                           label='name'
                                           value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
                                    <Input type='text' error={this.state.error+this.state.blank_user} label='username'
                                           value={this.state.username} onChange={this.handleChange.bind(this, 'username')}/>

                                    <div className="text-center">
                                        <Button onClick={this.showForm} label="change password" disabled={this.state.visible} raised />

                                    </div>

                                    <div hidden={!this.state.visible}>
                                        <Input disabled={!this.state.visible} type='password' error={this.state.error+this.state.blank_pass}
                                               label='old password'
                                               value={this.state.old_pwd} onChange={this.handleChange.bind(this, 'old_pwd')}/>
                                        <Input disabled={!this.state.visible} type='password'
                                               error={this.state.miss_match_pwd+this.state.error+this.state.blank_pass}
                                               label='new password'
                                               value={this.state.pwd} onChange={this.handleChange.bind(this, 'pwd')}/>
                                        <Input disabled={!this.state.visible} type='password' error={this.state.miss_match_pwd+this.state.error}
                                               label='confirm new password'
                                               value={this.state.conf_pwd} onChange={this.handleChange.bind(this, 'conf_pwd')}/>
                                    </div>
                                </section>
                                <div className="text-center">
                                    <br/>
                                    <Button icon="update" label='update' raised
                                            onClick={this.onClickUpdate}
                                            style={{backgroundColor: '#0d7c82', color:'#ffffff'}}/>
                                </div>
                            </div>

                        </div>
                        {/*<div className="col-md-4">
                         </div>
                         <div className="col-md-12 text-center">
                         </div>*/}
                    </div>


                    <div className="row" style={{paddingTop: 20}}>
                        <div className="col-md-6 col-md-offset-3">


                            <h3 className="text-uppercase text-center" style={{color:'#757575'}} >user widget details</h3>



                            <div className="well well-lg">

                                <Table className={style.table}
                                       model={table_model}
                                       source={this.state.widgets}
                                       selectable={this.state.check_box}
                                />

                            </div>



                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Profile;