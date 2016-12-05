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
                    RM.setUser({username: username});
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
                    reject(err);
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

    logout(){
        store.clear();
        window.location = '/login';
    }
    
}

export default new AuthService();