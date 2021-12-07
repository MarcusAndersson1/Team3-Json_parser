
const mqtt = require("mqtt")
var client = mqtt.connect('mqtt://broker.hivemq.com')


var publish = function sendTimeslot(timeslot){
    client.on('connect', function(){
            if(timeslot===undefined){
                client.end()
            }else{
                console.log(timeslot);
                client.publish('Timeslot',timeslot)
            }
    })
}

module.exports = publish;