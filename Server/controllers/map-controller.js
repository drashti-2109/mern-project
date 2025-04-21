const axios = require("axios");
const mapService = require('../services/map-service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (req, res) => {
    console.log("Request query:", req.query);

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })     
    }

    const { address } = req.query

    try {
        const coordinates = await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates)
    
    } catch (error) {    
        res.status(404).json({ message : "Coordinates not found" })
    }
}

const getCoords = async (location) => {
  const response = await axios.get(
    `https://api.openrouteservice.org/geocode/search`,
    {
      params: {
        api_key: process.env.OPENROUTE_API_KEY,
        text: location,
      },
    }
  );

  const features = response.data.features;
  if (!features || features.length === 0) {
    throw new Error(`Location not found: ${location}`);
  }

  const [lon, lat] = features[0].geometry.coordinates;
  return { lat, lon };
};

module.exports.fetchDistanceTime = async function(start, end) {
  const fromCoords = await getCoords(start);
  const toCoords = await getCoords(end);

  const directionsRes = await axios.get(
    `https://api.openrouteservice.org/v2/directions/driving-car`,
    {
      params: {
        api_key: process.env.OPENROUTE_API_KEY,
        start: `${fromCoords.lon},${fromCoords.lat}`,
        end: `${toCoords.lon},${toCoords.lat}`,
      },
    }
  );

  const data = directionsRes.data.features[0].properties.summary;

  return {
    distance: {
      value: data.distance,
      text: `${(data.distance / 1000).toFixed(2)} km`
    },
    duration: {
      value: data.duration,
      text: `${Math.floor(data.duration / 3600)} hr ${Math.round((data.duration % 3600) / 60)} min`
    }
  };
}

module.exports.getDistanceTime = async (req, res) => {
  try {
    const { start, end } = req.query;
    const result = await fetchDistanceTime(start, end);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const { input } = req.query;

      const suggestions = await mapService.getAutoCompleteSuggestions(input);

      res.status(200).json(suggestions);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
}
