const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

// require restaurant list from json file
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('done')
    })
    .catch(err => console.log(err))

}) 