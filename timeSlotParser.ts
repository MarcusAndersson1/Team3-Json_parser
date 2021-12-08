var publish = require("./pub")

const dentists = require('./dentists.json');

var arr = dentists['dentists']

const weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']

for (let index = 0; index < arr.length; index++) { // Specific Clinic
  console.log("\nDentist Clinic: " + arr[index]['name'])


  let arrOpeningHours = arr[index]['openinghours']
  // let daysOpen = Object.keys(arrOpeningHours)
  arr[index]['availableTimes'] = [] // Creates array of available times

  for (let i = 0; i <= 1; i++){ // Clinic's specific day
    var d = new Date();
    d.setDate(d.getDate() + i)
    let day = weekdays[d.getDay()]

    publish(d.toString()) // SUBJECT TO CHANGE, we are not using hours yet

    let openingTime = arrOpeningHours[day]
    if (arrOpeningHours[day] === undefined || openingTime === "") {
      console.log("SKIPPING, Day was " + day + " and hours were " + openingTime)
      continue;
    }

    let startingHour = openingTime.match(/^(\d+)/)[0] // the 0 is to only grab the regex result and not additional info as it creates an array
    let endingHour = openingTime.match(/.(\d{2}):\d{2}$/)[1] // regex grabs the digits from the ending hour, e.g. 9:00-[ 17 ]:00
    startingHour = parseInt(startingHour)
    endingHour = parseInt(endingHour)
    console.log(day + " opening hours: " + openingTime)
    for (let minutes = 0; minutes < 1440; minutes = (minutes + 30)) { // Specific hour of day
        d.setHours(startingHour,minutes,0)
        if(d.getHours() === 12 && endingHour != 12) { // Lunchbreak hour
          continue
        }
        arr[index]['availableTimes'].push(new Date(d))

        if(d.getHours() === endingHour) {
          break
        }
    }
  }
}
console.log("-- End of Parsing --")
// console.log(arr[0]['availableTimes'])