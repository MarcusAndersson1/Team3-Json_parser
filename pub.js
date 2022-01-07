
const { constants } = require("crypto")
const { TIMEOUT } = require("dns")
const mqtt = require("mqtt")
var client = mqtt.connect('mqtt://broker.hivemq.com')
const clinic = {
    "id": 30,
    "name": "Tooth Fairy Dentist",
    "owner": "Tooth Fairy",
    "dentists": 1,
    "address": "Slottskogen",
    "city": "Gothenburg",
    "coordinate": {
        "longitude": 11.942625,
        "latitude": 57.685255
    },
    "openinghours": {
        "monday": "7:00-19:00",
        "tuesday": "7:00-19:00",
        "wednesday": "7:00-19:00",
        "thursday": "7:00-19:00",
        "friday": "7:00-19:00",
        "sunday": ""
    }
}




var pubTimeslot = function sendTimeslot(timeslot) {
    client.on('connect', function () {
        if (timeslot === undefined) {
            client.end()

        } else {
            client.publish('Timeslot', timeslot)
            // console.log("Publishing" + timeslot)
        }
    })
}
client.subscribe("Clinic/true")

var listen = function listen() {
    client.on('message', function (topic, message) {
        // console.log(message + topic)
    }
    )
}

function sendTimeslot(timeslot) {
    client.on('connect', function () {

        if (timeslot === undefined) {
            client.end()

        } else {
            client.publish('Timeslot', timeslot)
            console.log(timeslot)
        }
    })
}


var pubClinic = function sendClinic(clinic) {
    client.on('connect', function () {
        if (clinic === undefined) {
            client.end()
        } else {
            client.publish('Clinic', JSON.stringify(clinic))
            //console.log(JSON.stringify(clinic))
        }

    })

}


function sendClinic(clinic) {
    client.on('connect', function () {
        if (clinic === undefined) {
            client.end()
        } else {
            client.publish('Clinic', JSON.stringify(clinic))
            console.log(JSON.stringify(clinic))
        }

    })

}

//sendClinic(clinic)
//sendTimeslot("2023")








module.exports = { pubTimeslot, pubClinic, listen };