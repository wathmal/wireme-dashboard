/**
 * Created by wathmal on 12/3/16.
 */

import express from 'express';
import JWT from 'jsonwebtoken';
import config from './config';
import DBService from './services/DBService';

const apiRouter = express.Router();

/*
 * authenticate endpoint
 * body: {
 * username: xxx
 * pass: xxx
 * }
 * */
apiRouter.post('/login', (req, res)=>{
    if(req.body.username && req.body.pass){

        // const hash= Bcrypt.hashSync(req.body.pass, config.saltRounds);
        // console.log(hash);

        DBService.loginWithPass(req.body.username, req.body.pass).then(rep =>{
            // success means user and pwd matches
            // generate token and pass
            const token= JWT.sign({username: req.body.username},config.secret, {
                expiresIn: config.tokenExpiration
            });

            console.log("rep:   ", rep.data);
            // send token
            res.status(rep.code).json({code: 200, token: token, name: rep.data });
        }, err=>{
            res.status(err.code).json(err);
        })
    }
    else{
        res.status(400).json({message: 'bad input'});
    }


});

/*
* register endpoint
* body {
* username:
* }
* */
apiRouter.post('/register', (req, res)=>{
    if(req.body.username && req.body.pass && req.body.name){

        DBService.registerNewUser(req.body).then(rep => {
            res.status(rep.code).json(rep);
        }, err=>{
            res.status(err.code).json(err);
        });
    }
    else{
        res.status(400).json({message: 'bad input'});
    }
});

/*
* user profile update end point
*
 */
apiRouter.post('/update', (req, res)=>{

    if(req.body.old_username && req.body.username && req.body.pass && req.body.name && req.body.old_pass){
        DBService.updateUser(req.body).then(rep => {
            res.status(rep.code).json(rep);
        }, err=>{
            res.status(err.code).json(err);
        });
    }else if(req.body.old_username && req.body.username && req.body.name){
        DBService.updatePartial(req.body).then(rep => {
            res.status(rep.code).json(rep);
        }, err=>{
            res.status(err.code).json(err);
        });

    }else{
        res.status(400).json({message: 'bad input'});
    }
});

// validate jwt
apiRouter.use((req, res, next) =>{

    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        JWT.verify(token, config.secret, (err, decoded) => {
            if (err) {

                return res.status(401).json({code: 401, message: 'failed to authenticate token.'});
            }
            else {
                // if everything is good, save to request for use in other routes
                // this contains the username.
                req.decoded = decoded;
                next();
            }

        })
    }
    else{
        return res.status(401).json({code: 401, message: 'failed to authenticate token.'});
    }
});

apiRouter.get('/', (req, res)=>{
    res.json({code: 200, message: 'verified'});
});


apiRouter.route('/widgets')
    // get user widget details
    .get((req, res) =>{
        const user = req.decoded.username;
        DBService.getWidgets(user).then(rep =>{
            res.status(rep.code).json(rep);
        }, err=>{
            res.status(err.code).json(err);
        })

    })
    // post user widget details
    .post((req, res)=>{
        const user = req.decoded.username;

        let widgetAry= [];
        let badInput = false;

        const keyMap = {
            "setWidgetName": "title",
            "sendDataToWidget": "topic",
            "receiveDataFromWidget": "topic"
        };
        if(req.body.widgets && req.body.widgets.length != 0){
            req.body.widgets.forEach((widget)=>{
                // check if inputs are valid
                if(widget.data.length < 3){
                    badInput = true;
                    res.status(400).json({message: 'bad input'});
                }

                let newWidget={
                    type: widget.title.replace(/([0-9])+/g, "")
                };

                // iterate inner array. skip 1st element
                for(let innerAryIdx= 1; innerAryIdx < widget.data.length; innerAryIdx++){

                    for(let key in keyMap){
                        if(key == widget.data[innerAryIdx][0]){
                            newWidget[keyMap[key]]= widget.data[innerAryIdx][1];
                            // break innner loop
                            break;
                        }
                    }
                }


                widgetAry.push(newWidget);

            });

            // TODO: check widgetAry is a valid widget array
            // if not bad input 
            if(!badInput){
                DBService.setWidgets(user, widgetAry).then(rep => {
                    res.status(rep.code).json(rep);
                }, err=>{
                    res.status(err.code).json(err);
                });
            }

        }
        else{
            console.log('no widgets');
            res.status(400).json({message: 'no widgets provided'});
        }
         // delete old records
        // add new widgets
    });


export default apiRouter;