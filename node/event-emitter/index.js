const EventEmitter = require('events');
const myFirstEmitter = new EventEmitter();//creating a new emitter

myFirstEmitter.on('greet',(name)=>{//on is used to add a callback function that's going to be executed when the evnts is triggered
    //greet is name of evenet
    console.log(`Hello ${name}`)
})
//to call this/or to trigger this event emitter we need emit
myFirstEmitter.emit('greet','Samar');