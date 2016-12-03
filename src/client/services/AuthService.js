/**
 * Created by wathmal on 12/3/16.
 */

import RM from './ResourceManager';
import store from 'store';

class AuthService{
    constructor(){
        console.log("auth service initialised");
    }

    setToken(token){
        store.set('token', token);
    }

    getToken(){
        return store.get('token');
    }

    login(user, pass){
        // login
        //this.setToken()
    }

    logout(){
        // logout logic
        console.log('logging out');
    }
    
}

export default new AuthService();