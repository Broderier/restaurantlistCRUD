const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

// require restaurant list from json file
const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('done')
    })
    .catch(err => console.log(err))
}) 