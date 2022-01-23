const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳資訊頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增一筆餐廳資料
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定餐廳的詳細資料
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯餐廳資訊頁面
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯餐廳資料
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const restaurantData = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = restaurantData.name
      restaurant.name_en = restaurantData.english_name
      restaurant.category = restaurantData.category
      restaurant.image = restaurantData.image
      restaurant.location = restaurantData.address
      restaurant.phone = restaurantData.phone_number
      restaurant.google_map = restaurantData.google_map_address
      restaurant.rating = restaurantData.rating
      restaurant.description = restaurantData.description
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除一家餐廳資訊
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router