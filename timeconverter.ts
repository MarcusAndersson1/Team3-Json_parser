
const dentists = require('./dentists.json');

// console.log(dentists); // output 'testing'
// console.log(dentists['dentists'][1]['openinghours']); // output 'testing'

var arr = dentists['dentists'][0]['openinghours']

console.log(arr)

var weekdays = ['monday','tuesday','wednesday','thursday','friday']

for (var i = 0; i <= 4; i++){
    let time = arr[weekdays[i]]
    let startinghour = time.match(/^\d?/)[0] // the 0 is to only grab the regex result and not additional info as it creates an array
    let endinghour = time.match(/$\d?/)[0]
    startinghour = parseInt(startinghour)
    console.log(time)
    let minutes = 0
    for (var j = 0; j <= 12; j++) {
        let hour = startinghour + 1 // for unknown reason, the date is one hour behind
        const d = new Date();
        d.setHours(hour,minutes,0)
        console.log(d)
        minutes = (minutes + 30)
    }
  }
  

console.log("End")
