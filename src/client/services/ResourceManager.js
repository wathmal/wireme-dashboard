/**
 * Created by wathmal on 12/2/16.
 */

/*
* global resource manager for serving user data
* also manages auth actions
* */

import store from 'store';

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

    getUsername(){
        return store.get('user').username;
    }

    getWidgets(){
        return store.get('user').widgets;
    }

}

export default new ResourceManager();