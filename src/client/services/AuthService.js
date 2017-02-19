/**
 * Created by wathmal on 12/3/16.
 */

import RM from './ResourceManager';
import store from 'store';
import Promise from 'promise';

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

    login(username, pass){
        // jquery ajax POST request
        const user= {
            username: username,
            pass: pass
        };

        return new Promise((fulfill, reject) =>{
            $.ajax({
                method: 'POST',
                url: '/api/login',
                data: JSON.stringify(user),
                dataType: 'json',
                contentType: "application/json",
                success: (data) => {
                    this.setToken(data.token);
                    // get complete user object from login endpoint
                    RM.setUser({username: username, name: data.name});
                    RM.setPWD(pass);
                    fulfill(data);
                },
                error: (xhr, status, err) => {
                    reject(err);
                }
            });
        });
    }

    register(name, username, pass){
        // jquery ajax POST request
        const user= {
            name: name,
            username: username,
            pass: pass
        };

        return new Promise((fulfill, reject) =>{
            $.ajax({
                method: 'POST',
                url: '/api/register',
                data: JSON.stringify(user),
                dataType: 'json',
                contentType: "application/json",
                success: (data) => {
                    fulfill(data);
                },
                error: (xhr, status, err) => {
                    reject(xhr.responseJSON);
                }
            });
        });
    }

    updateProfile(old_username,name,username,old_pass,pass){
        // jquery ajax POST request
        const user= {
            old_username:old_username,
            name: name,
            username: username,
            old_pass:old_pass,
            pass: pass
        };

        return new Promise((fulfill, reject) =>{
            $.ajax({
                method: 'POST',
                url: '/api/update',
                data: JSON.stringify(user),
                dataType: 'json',
                contentType: "application/json",
                headers: {"x-access-token": this.getToken()},
                success: (data) => {
                    RM.setUser({username: username, name: name});
                    fulfill(data);
                },
                error: (xhr, status, err) => {
                    reject(xhr.responseJSON);
                }
            });
        });
    }

    checkIfLoggedIn(){
        return new Promise((fulfill, reject) =>{
            if(this.getToken()){
                $.ajax({
                    method: 'GET',
                    url: '/api',
                    headers: {"x-access-token": this.getToken()},
                    success: (data) => {
                        fulfill(true);
                    },
                    error: (xhr, status, err) => {
                        reject(false);
                    }
                });
            }
            else{
                reject(false);
            }
        });

    }

    getUserWidgets(){
        return new Promise((fulfill, reject) =>{
            $.ajax({
                method: 'GET',
                url: '/api/widgets',
                headers: {"x-access-token": this.getToken()},
                success: (data) => {
                    RM.setWidgets(data.data);
                    fulfill(data);
                },
                error: (xhr, status, err) => {
                    reject(err);
                }
            });
        });
    }

    logout(clearAll){

        if(clearAll) {
            store.clear();
        }
        else{
            // keep colors
            store.remove('token');
            store.remove('pass');
        }
        window.location = '/login';
    }
    
}

export default new AuthService();