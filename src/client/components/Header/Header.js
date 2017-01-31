/**
 * Created by wathmal on 1/3/17.
 */

import React, {PropTypes} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import {IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import Link from 'react-toolbox/lib/link';
import {Button} from 'react-toolbox/lib/button';


import RM from './../../services/ResourceManager';
import AuthService from './../../services/AuthService';


class Header extends React.Component{

    constructor(){
        super();
    }

    static propTypes = {
        title: React.PropTypes.string.isRequired
    };

    componentDidMount(){
        document.title= "wireme - "+this.props.title;

    }
    render(){

        return(
            <div>
                <AppBar className="topbar" leftIcon='home' title={"wireme / "+ this.props.title} onLeftIconClick={()=>{window.location = '/';}}>
                    <Navigation type="horizontal">
                        <Button icon='star' label='quick start' raised onClick={()=>{window.location = '/quickstart';}} className='hidden-xs'/>

                        {(RM.getUser())?
                                <Link href='profile' label={RM.getUsername()} icon='person' style={{ textDecoration: 'none', color: "white" }} />
                            : null
                        }
                        {(RM.getUser())?
                            <IconMenu icon='more' position='topRight' menuRipple style={{marginRight: '-1.25rem'}}>
                                <MenuItem value='logout' onClick={()=> AuthService.logout(true)} icon='exit_to_app' caption='logout' />
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