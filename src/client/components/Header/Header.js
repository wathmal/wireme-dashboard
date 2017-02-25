/**
 * Created by wathmal on 1/3/17.
 */

import React, {PropTypes} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import {IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import Link from 'react-toolbox/lib/link';
import {Button} from 'react-toolbox/lib/button';
import style from './Header.scss';


import RM from './../../services/ResourceManager';
import AuthService from './../../services/AuthService';


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
            <div style={{backgroundColor:'#0097A7'}}>
                <AppBar className={style.headerSection} leftIcon='home' title={this.props.title}
                        onLeftIconClick={()=>{window.location = '/';}} >
                    <Navigation type="horizontal">
                        {(RM.getUser()) ?
                            <Button href='/dashboard' flat
                                    style={{color: 'white',textDecoration: 'none'}}>dashboard</Button>
                            : null
                        }
                        <Button href='/quickstart' flat style={{color: 'white',textDecoration: 'none'}}>quick
                            start</Button>

                        {(RM.getUser()) ?
                            <Button href='/profile' icon='person' flat
                                    style={{textDecoration: 'none',color: 'white'}}>{RM.getUsername()}</Button>
                            : null
                        }
                        {(RM.getUser()) ? null
                            : <Button href='/login' flat
                                      style={{textDecoration: 'none',color: 'white'}}>login</Button>
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