/**
 * Created by wathmal on 12/1/16.
 */

import EventEmitter from 'events';

/*
* main singleton event emitter class
* */
class MainEmitter extends EventEmitter{
    constructor(){
        super();
        this.state= {};
        // console.log("lets see how");
    }

    getState(){
        return this.state;
    }

}

export default new MainEmitter();