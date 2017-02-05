/**
 * Created by wathmal on 12/2/16.
 */

/*
* global resource manager for serving user data
* for Auth related actions check: AuthService
* */

import store from 'store';
import Crypto from 'crypto-js';

class ResourceManager{
    constructor(){
        console.log("RM instance created");
        if(!store.enabled){
            console.log("local storage not enabled");
        }
    }

    getUser(){
        return store.get('user');
    }

    setUser(user){
        store.set('user', user);
    }

    /*
    * TODO: encrypt password
    * */
    setPWD(pwd){
        const ency= Crypto.AES.encrypt(pwd, store.get('token'));
        const cipher= ency.toString();
        //console.log(cipher);
        store.set('pass', cipher);
    }

    getPWD(){
        const pass= store.get('pass');

        if(pass){
            const bytes  = Crypto.AES.decrypt(pass, store.get('token'));
            const plaintext = bytes.toString(Crypto.enc.Utf8);
            //console.log(plaintext);
            return plaintext;
        }
        else{
            return null;
        }
    }

    getUsername(){
        const user = this.getUser();
        if(user && user.hasOwnProperty('username')){
            return user.username;
        }
        else{
            return null;
        }
    }

    getName(){
        const user = this.getUser();
        if(user && user.hasOwnProperty('name')){
            return user.name;
        }
        else{
            return null;
        }
    }

    getWidgets(){
        return store.get('widgets');
    }

    setWidgets(widgets){
        store.set('widgets', widgets);
    }

    getColorForWidget(mqttTopic){
        let colors = store.get('colors');
        if(colors){
            return colors[mqttTopic];
        }
        else{
            return null;
        }
    }

    setColorForWidget(mqttTopic, color){
        let obj= store.get('colors');
        // if not exists
        if(!obj){
            obj= {};
        }
        obj[mqttTopic]= color;
        store.set('colors', obj)
    }

}

export default new ResourceManager();