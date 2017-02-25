/**
 * Created by wathmal on 1/3/17.
 */

import React, {PropTypes} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import {IconMenu, MenuItem} from 'react-toolbox/lib/menu';
import Link from 'react-toolbox/lib/link';
import {Button} from 'react-toolbox/lib/button';
import style from './Header.scss';


import RM from './../../services/ResourceManager';
import AuthService from './../../services/AuthService';

const linkButton = {color: 'white', textDecoration: 'none'};

class Header extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        title: React.PropTypes.string.isRequired
    };

    componentDidMount() {
        document.title = "wireme - " + this.props.title;

    }

    render() {

        return (
            <div style={{backgroundColor: '#0097A7'}}>
                <AppBar className={style.headerSection} leftIcon='home' title={this.props.title}
                        onLeftIconClick={()=>{window.location = '/';}}>
                    <Navigation type="horizontal">

                        <Button className="hidden-xs hidden-sm" href='/dashboard' flat style={linkButton}>dashboard</Button>
                        <Button className="hidden-xs hidden-sm" href='/quickstart' flat style={linkButton}>quick start</Button>

                        {(RM.getUser()) ?
                            <Button className="hidden-xs hidden-sm" href='/profile' icon='person' flat style={linkButton}>{RM.getUsername()}</Button>
                            :
                            <Button className="hidden-xs hidden-sm" href='/login' flat style={linkButton}>login</Button>
                        }

                        {(RM.getUser()) ?
                            <IconMenu icon='more' position='topRight' menuRipple style={{marginRight: '-1.25rem'}}>
                                <MenuItem value='logout' onClick={()=> AuthService.logout(true)} icon='exit_to_app'
                                          caption='logout'/>
                            </IconMenu>
                            : null
                        }
                    </Navigation>
                </AppBar>
            </div>
        )
    }

}

export default Header;