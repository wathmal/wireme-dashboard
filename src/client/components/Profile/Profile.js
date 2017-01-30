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

const table_model = {
    title: {type: String},
    type: {type: String},
    topic: {type: String}
};

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.showForm = this.showForm.bind(this);
        this.state = {
            name: RM.getName(),
            username: RM.getUsername(),
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
            visible: true,
            visible2: false,
            btn_enabled: false,
            check_box:false,
            widgets: RM.getWidgets()
        }

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

        return (
            <div>
                <Header title="profile"/>

                <div className="col-md-10 col-md-offset-1 col-xs-12" style={{paddingTop: 20}}>
                    <div>
                        <img src="http://wireme.projects.mrt.ac.lk/images/wireme_logo.png" alt=""
                             className="img-responsive"
                             style={{marginLeft: 'auto', marginRight:'auto', padding: 10}}/>
                    </div>
                    <section >
                        <Input type='text' error={this.state.error+this.state.error+this.state.blank_name}
                               label='name'
                               value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
                        <Input type='text' error={this.state.error+this.state.blank_user} label='username'
                               value={this.state.username} onChange={this.handleChange.bind(this, 'username')}/>
                        <label style={{fontSize:'12px', color:'#757575'}} >user widget details</label>
                        <Table
                            model={table_model}
                            source={this.state.widgets}
                            selectable={this.state.check_box}
                        />
                        <div style={{width:'130px'}}>
                            <Link active={this.state.visible} onClick={this.showForm} label="change password" style={{ fontSize:'14px' , textDecoration: 'none' }} />
                        </div>

                    </section>
                    <section hidden={this.state.visible}>
                        <Input type='password' error={this.state.error+this.state.blank_pass}
                               label='old password'
                               value={this.state.old_pwd} onChange={this.handleChange.bind(this, 'old_pwd')}/>
                        <Input type='password'
                               error={this.state.miss_match_pwd+this.state.error+this.state.blank_pass}
                               label='new password'
                               value={this.state.pwd} onChange={this.handleChange.bind(this, 'pwd')}/>
                        <Input type='password' error={this.state.miss_match_pwd+this.state.error}
                               label='confirm new password'
                               value={this.state.conf_pwd} onChange={this.handleChange.bind(this, 'conf_pwd')}/>
                    </section>
                    <div  style={{marginLeft: '40%', paddingTop: 20}}>
                        <Button icon="update" label='update' raised primary
                                onClick={this.onClickUpdate}/>
                    </div>

                </div>
            </div>

        );
    }
}

export default Profile;
