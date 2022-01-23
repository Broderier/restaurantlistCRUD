const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }

  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filteredRestaurantData = restaurants.filter(
        data =>
          data.name.toLocaleLowerCase().includes(keyword) ||
          data.category.toLocaleLowerCase().includes(keyword)
      )
      res.render('index', { restaurants: filteredRestaurantData, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router