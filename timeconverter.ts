const dentists = require('./dentists.json');

// console.log(dentists); // output 'testing'
// console.log(dentists['dentists'][1]['openinghours']); // output 'testing'

var arr = dentists['dentists']

var weekdays = ['monday','tuesday','wednesday','thursday','friday']

for (let index = 0; index < arr.length; index++) {
  console.log("Dentist Clinic: " + arr[index]['name'])
  let arrOpeningHours = arr[index]['openinghours']
  for (let i = 0; i <= 4; i++){
    let time = arrOpeningHours[weekdays[i]]
    let startinghour = time.match(/^(\d+)/)[0] // the 0 is to only grab the regex result and not additional info as it creates an array
    let endinghour = time.match(/.(\d{2}):\d{2}$/)[1] // regex grabs the digits from the ending hour, e.g. 9:00-[ 17 ]:00
    startinghour = parseInt(startinghour)
    endinghour = parseInt(endinghour)
    console.log(weekdays[i] + " opening hours: " + time)
    for (let minutes = 0; minutes < 1440; minutes = (minutes + 30)) {
        const d = new Date();
        d.setHours(startinghour,minutes,0)
        if(d.getHours() === 12) { // Lunchbreak hour
          continue
        }
        console.table(d.toString())
        if(d.getHours() === endinghour) {
          break
        }
    }
  }
}
console.log("-- End of Opening Hours --")