/**
 * Created by wathmal on 12/1/16.
 */
import MQTT from 'mqtt';

let client;

class MQTTService{
    constructor(){
        if(!client) {
            client = MQTT.connect('ws://wireme.projects.mrt.ac.lk', {port: 8883, username:'test', password:'test123'});
            // client = MQTT.connect('mqtt://wireme.projects.mrt.ac.lk', {port: 8000});
            // client = MQTT.connect('mqtt://test.mosquitto.org');

            client.on('error', ()=>{
                console.log('error');
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

export default new MQTTService();