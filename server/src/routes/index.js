import express from 'express';
import * as weatherService from '../services/weather.service';
const router = express.Router();

/* GET home. */
router.get('/', function(req, res, next) {
  res.send("Hello world!");
});


// TODO: should move this to a controller
const handleLocationUpdate = async (user, lat, lng, coords) => {
  try {
    const weather = await weatherService.getCurrentWeatherFromLatLng(lat, lng)

    if (weather) {
      // TODO: do stuff here
    }
  } catch (error) {
    console.log('error in location update', error)
  }
}

router.post('/location', function(req, res, next) {
  const { coords, timestamp } = req.body
  try {
    const { latitude, longitude } = coords
    // TODO: Add logic to identify user & store weather data?
    // TODO: handleLocationUpdate(user, latitude, longitude, coords)


    
    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
  }}
);

export default router;
