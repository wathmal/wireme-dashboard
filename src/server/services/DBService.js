/**
 * Created by wathmal on 12/3/16.
 */

import Mysql from 'mysql2';
import config from './../config';
import Promise from 'promise';
import Bcrypt from 'bcrypt';

let pool;

class DBService{
    constructor(){
        pool = Mysql.createPool({
            connectionLimit: 10,
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database
        });

        /*conn.connect((err) =>{
            if (err) {
                console.log(err);
            } else {
                console.log("connected to mysql server successfully");
            }
        });*/
    }
    
    loginWithPass(user, pass){
        return new Promise((fulfill, reject) =>{
            pool.getConnection((err, conn)=>{
                if(err){
                    console.log(err);
                    reject(this.responseGenerator(500, 'database error', null, err.code));
                }
                else{
                    conn.execute('SELECT * FROM user WHERE username= ? LIMIT 1', [user],
                        (err, results, fields)=>{
                            conn.release();
                            if(err){
                                console.log(err);
                                reject(this.responseGenerator(500, 'database error', null, err.code));
                            }
                            else{
                                if(results.length ==0){
                                    reject(this.responseGenerator(401));
                                }
                                else {
                                    // compare hash with plain pwd
                                    if(Bcrypt.compareSync(pass, results[0].hash)){
                                        fulfill(this.responseGenerator(200));
                                    }
                                    else{
                                        reject(this.responseGenerator(401));
                                    }
                                }
                            }
                        });
                }
            });
        });
    }

    /*
    * params: user object
    * user{
    *   username
    *   pass
    *   name
    * }
    * */
    registerNewUser(userObj){
        // assume inputs are validated
        return new Promise((fulfill, reject) =>{
            pool.getConnection((err, conn)=>{
                if(err){
                    console.log(err);
                    reject(this.responseGenerator(500, 'database error', null, err.code));
                }
                else{
                    Bcrypt.hash(userObj.pass, config.saltRounds, (err, hash)=>{

                        if(!err){
                            // save pwd in DB
                            conn.execute('INSERT INTO user (username, hash, name) VALUES ( ? , ? , ? )', [userObj.username, hash, userObj.name],
                                (err, results, fields)=>{
                                    conn.release();

                                    if(err){
                                        console.log(err);
                                        reject(this.responseGenerator(500, 'database error', null, err.code));
                                    }
                                    else{
                                        fulfill(this.responseGenerator(201));
                                    }
                                });

                        }
                        else {
                            // release the connection
                            conn.release();
                        }

                    });
                }
            });
        })
    }
    
    /*
    * set user widgets
    * TODO: make this a transaction.
    * params:
    * 
    * username
    * widgets: [
    *   
    * ]
    * */
    setWidgets(username, widgetsAry){
        return new Promise((fulfill, reject)=>{
            // remove user widgets first
            // make it a transaction
            pool.getConnection((err, conn)=>{
                if(err){
                    console.log(err);
                    reject(this.responseGenerator(500, 'database error', null, err.code));
                }
                else{
                    conn.execute('DELETE FROM `user_widget` WHERE `user_id` = (SELECT id FROM user WHERE username = ? LIMIT 1)', [username],
                        (err, results, fields)=>{

                            if(!err){
                                // generate insert values query
                                let subQuery ="";
                                let preparedParams= [];
                                for(let i in widgetsAry){
                                    (i != 0)? subQuery+= ', ': subQuery += '';
                                    subQuery += "((SELECT id FROM user WHERE username= ? ), (SELECT id FROM widget WHERE type= ? ), ? , ? )";
                                    preparedParams.push(username, widgetsAry[i].type, widgetsAry[i].topic, widgetsAry[i].title);
                                }

                                // exec
                                conn.execute("INSERT INTO user_widget (user_id, widget_id, topic, title) values "+ subQuery, preparedParams,
                                    (err, results, fields)=>{
                                        conn.release();

                                        if(err){
                                            console.log(err);
                                            reject(this.responseGenerator(500, 'database error', null, err.code));
                                        }
                                        else{
                                            // changed status code from 201 to 200 due to ActionScript constraints
                                            fulfill(this.responseGenerator(200, 'added'));
                                        }
                                    });
                            }
                            else{
                                conn.release();
                                console.log(err);
                                reject(this.responseGenerator(500, 'database error', null, err.code));
                            }
                        })
                }
            });

        })
    }
    
    getWidgets(username){
        return new Promise((fulfill, reject)=>{
            // get widgets from DB
            pool.getConnection((err, conn)=>{
                if(err){
                    console.log(err);
                    reject(this.responseGenerator(500, 'database error', null, err.code));
                }
                else{
                    conn.execute('SELECT type, title, topic FROM user_widget JOIN widget WHERE user_widget.widget_id = widget.id AND user_id= (SELECT id FROM user WHERE username= ? LIMIT 1)', [username],
                        (err, results, fields)=>{
                            conn.release();

                            if(err){
                                console.log(err);
                                reject(this.responseGenerator(500, 'database error', null, err.code));
                            }
                            else{
                                fulfill(this.responseGenerator(200, null, results));
                            }
                        });
                }
            });
            
        });
    }

    // function to generate response to be sent as API resp.
    responseGenerator(code, message, data, error){
        let res={
            code: code
        };
        
        if(message){
            res.message = message;
        }
        if(data){
            res.data= data;
        }
        if(error){
            res.error= error;
        }
        
        return res;
    }
}

export default new DBService();