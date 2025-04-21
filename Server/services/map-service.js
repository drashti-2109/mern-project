const axios = require('axios')
const Captain = require('../models/captain-model')

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.OPENCAGE_API_KEY
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`

    try {
        const response = await axios.get(url)

        if(response.data && response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry

            return {
                ltd : location.lat,
                lng : location.lng
            }
        } else {
            throw new Error("Unable to fetch coordinates from opencage")
        }

    } catch (error) {
        console.error(error.message)
        throw error
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.LOCATIONIQ_API_KEY; 
    const url = `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${encodeURIComponent(input)}&limit=5`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
            return response.data.map(place => place.display_name);
        } else {
            throw new Error('No suggestions found');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
    const captains = await Captain.find({
        location : {
            $geoWithin : {
                $centerSphere : [ [ltd, lng], radius / 6371]
            }
        }
    })

    return captains
}