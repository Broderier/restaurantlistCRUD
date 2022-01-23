const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const sortMethod = req.body.sortingMethod
  let sort = ''
  switch (sortMethod) {
    case '1':
      sort = { name_en: 'asc' }
      break
    case '2':
      sort = { name_en: 'desc' }
      break
    case '3':
      sort = { category: 'desc' }
      break
    case '4':
      sort = { location: 'desc' }
      break
    default:
      sort = { _id: 'asc' }
  }
  Restaurant.find()
    .lean()
    .sort(sort)
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