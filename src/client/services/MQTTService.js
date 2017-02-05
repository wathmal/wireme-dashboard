/**
 * Created by wathmal on 12/1/16.
 */
import MQTT from 'mqtt';
import RM from './ResourceManager'
let client;

class MQTTService{
    constructor(user, pass){
        if(!client) {
            client = MQTT.connect('ws://wireme.projects.mrt.ac.lk', {port: 8883, username:user, password:pass});
            // client = MQTT.connect('mqtt://wireme.projects.mrt.ac.lk', {port: 8000});
            // client = MQTT.connect('mqtt://test.mosquitto.org');
            client.on('connect', ()=>{
                console.log('mqtt connected over WS');
            });

            client.on('error', ()=>{
                console.log('mqtt not connected');
            });
        }

    }

    getClient(){
        // client.on('connect', ()=>{
        //     console.log('connect');
        //
        // });

        return client;
    }



}

export default new MQTTService(RM.getUsername(), RM.getPWD());