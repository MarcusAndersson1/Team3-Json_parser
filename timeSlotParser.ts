var publish = require("./pub.js")
const get = require('cross-fetch');
var date = new Date();
var json = JSON.stringify(date);


var arr = []

const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

async function getJson(){
    let response = await get('https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json')
    let jsondata = await response.json()
    console.log(jsondata)
    arr = jsondata['dentists']
}

async function timeSlotParser() {

await getJson()
  for (let index = 0; index < arr.length; index++) { // Specific Clinic
    //console.log("\nDentist Clinic: " + arr[index]['name'])
    

    let temparray = []
    let clinic = {clinic: arr[index],
                  timeslots: temparray}
    let counter = 0
    let arrOpeningHours = arr[index]['openinghours']
    // let daysOpen = Object.keys(arrOpeningHours)
    // let availableTimes = [] // Creates array of available times

    // INSERT CODE THAT WAITS FOR WHEN RESPONSE FOR pubClinic IS RECIEVED

    for (let i = 0; i <= 6; i++) { // Clinic's specific day
      var d = new Date();
      d.setDate(d.getDate() + i)
      let day = weekdays[d.getDay()]

      let openingTime = arrOpeningHours[day]
      if (arrOpeningHours[day] === undefined || openingTime === "") {
        //console.log("SKIPPING, Day was " + day + " and hours were " + openingTime)
        continue;
      }

      let startingHour = openingTime.match(/^(\d+)/)[0] // the 0 is to only grab the regex result and not additional info as it creates an array
      let endingHour = openingTime.match(/.(\d{2}):\d{2}$/)[1] // regex grabs the digits from the ending hour, e.g. 9:00-[ 17 ]:00
      startingHour = parseInt(startingHour)
      endingHour = parseInt(endingHour)
      //console.log(day + " opening hours: " + openingTime)
      for (let minutes = 0; minutes < 1440; minutes = (minutes + 30)) { // Specific hour of day
        d.setHours(startingHour, minutes, 0)
        if (d.getHours() === 12 && endingHour != 12) { // Lunchbreak hour
          continue
        }
       // console.log(new Date(d).toString())
        let stringDate = new Date(d).toString()
        let abc = {dateTime: stringDate,
                  isAvailable: true,
                  user: null}
        clinic.timeslots.push(abc)

        counter++

        if (d.getHours() === endingHour) {
          break
        }
      }
    }
    console.log("Amount of timeslots: " + counter)
    console.log(clinic)
    await publish.pubClinic(clinic)
  }
  console.log("-- End of Parsing --")
  //console.log((arr[0]))
  
}
timeSlotParser()
// > CLINIC 1
// > 150 timeslots
// > CLINIC 2
// > 90 timeslots