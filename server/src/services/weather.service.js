import rp from 'request-promise';
import moment from 'moment';

const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY

export const fetchCurrentWeatherFromLatLng = (lat, lng) => {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${API_KEY}`
    return rp(endpoint)
}

const parseWeatherData = (response) => {
    // example response:
    //  {
    //     "coord": { "lon": 139, "lat": 35 },
    //     "sys": { "country": "JP", "sunrise": 1369769524,             "sunset": 1369821049 },
    //     "weather": [{ "id": 804, "main": "clouds",                   "description": "overcast clouds", "icon": "04n" }],
    //       "main": { "temp": 289.5, "humidity": 89,                 "pressure": 1013, "temp_min": 287.04, "temp_max":           292.04 },
    //     "wind": { "speed": 7.31, "deg": 187.002 },
    //     "rain": { "3h": 0 },
    //     "clouds": { "all": 92 },
    //     "dt": 1369824698,
    //         "id": 1851632,
    //             "name": "Shuzenji",
    //                 "cod": 200
    // }
    const data = JSON.parse(response)
    const weather = {
        sunrise: data["sys"]["sunrise"],
        sunset: data["sys"]["sunset"],
        temperature: convertCelsiusToFahrenheit(data["main"]["temp"]),
        weather: data["weather"] // note that this is an array
    }
    return weather
}

const convertCelsiusToFahrenheit = (temperature) => {
    return Math.round((temperature * 9 / 5) + 32)
}

export const getCurrentWeatherFromLatLng = async (lat, lng) => {

    const weather = await fetchCurrentWeatherFromLatLng(lat, lng).then(parseWeatherData).catch((error) => {
        console.log("error fetching weather")
    })
    //console.log('weather:', weather)
    return weather
}

const getWeatherFromLatLngForDatetime = async (lat, lng, startTimestamp, endTimestamp) => {
    // TODO: store weather for lat lng somewhere after retrival
    // TODO: if lat, lng not in stored weather's info, we query API 
}

export const mapWeatherIdToWeatherIcon = (id, timezone = "America/Los_Angeles") => {
    let weatherIcon = ['cloud-lightning', 'cloud-drizzle', 'cloud-rain', 'cloud-snow', 'wind', 'sun', 'cloud']
    if (id == 800) {
        const currHour = moment.tz(timezone).hours()
        // make this based on actual timezone/location?
        if (currHour < 7 && currHour > 6) {
            return 'sunrise'
        }
        if (currHour < 18 && currHour > 17) {
            return 'sunset'
        }
        if (currHour > 19) {
            return 'moon'
        }
        console.log(weatherIcon[5])
        return weatherIcon[5]
    }
    if (id > 800) {
        return weatherIcon[6]
    }
    if (Math.floor(id / 100) == 7) {
        return weatherIcon[4]
    }
    if (Math.floor(id / 100) == 6) {
        return weatherIcon[3]
    }
    if (Math.floor(id / 100) == 5) {
        return weatherIcon[2]
    }
    if (Math.floor(id / 100) == 3) {
        return weatherIcon[1]
    }
    if (Math.floor(id / 100) == 2) {
        return weatherIcon[0]
    }
    return weatherIcon[6]
}

export const mapWeatherIdToEmoji = (id, timezone = "America/Los_Angeles") => {
    // cloud-lightning, cloud-drizzel, 'cloud-rain', 'cloud-snow', 'wind', 'sun', 'cloud'
    let weatherIcon = ['⛈', '🌧', '🌧', '🌨', '💨', '☀️', '☁️'] // seperator: •
    if (id == 800) {
        const currHour = moment.tz(timezone).hours()
        // make this based on actual timezone/location?
        if (currHour < 7 && currHour > 6) {
            return '🌅'
        }
        if (currHour < 18 && currHour > 17) {
            return '🌇'
        }
        if (currHour > 19) {
            return '🌙'
        }
        // console.log(weatherIcon[5])
        return weatherIcon[5]
    }
    if (id > 800) {
        return weatherIcon[6]
    }
    if (Math.floor(id / 100) == 7) {
        return weatherIcon[4]
    }
    if (Math.floor(id / 100) == 6) {
        return weatherIcon[3]
    }
    if (Math.floor(id / 100) == 5) {
        return weatherIcon[2]
    }
    if (Math.floor(id / 100) == 3) {
        return weatherIcon[1]
    }
    if (Math.floor(id / 100) == 2) {
        return weatherIcon[0]
    }
    return weatherIcon[6]

}
module.exports.mapWeatherIdToEmoji = mapWeatherIdToEmoji;
module.exports.getCurrentWeatherFromLatLng = getCurrentWeatherFromLatLng;
module.exports.mapWeatherIdToWeatherIcon = mapWeatherIdToWeatherIcon;