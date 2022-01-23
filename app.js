// require packages used in this project
// require express here
const express = require('express')

// require express-handlebars here
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

// routes setting
// app.get('/', (req, res) => {
//   Restaurant.find()
//     .lean()
//     .then(restaurants => res.render('index', { restaurants }))
//     .catch(error => console.log(error))
// })

// // 新增餐廳資訊頁面
// app.get('/restaurants/new', (req, res) => {
//   return res.render('new')
// })

// // 新增一筆餐廳資料
// app.post('/restaurants', (req, res) => {
//   return Restaurant.create(req.body)
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// // 瀏覽特定餐廳的詳細資料
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const id = req.params.restaurant_id
//   return Restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('show', { restaurant }))
//     .catch(error => console.log(error))
// })

// // 編輯餐廳資訊頁面
// app.get('/restaurants/:restaurant_id/edit', (req, res) => {
//   const id = req.params.restaurant_id
//   return Restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('edit', { restaurant }))
//     .catch(error => console.log(error))
// })

// // 編輯餐廳資料
// app.put('/restaurants/:restaurant_id', (req, res) => {
//   const id = req.params.restaurant_id
//   const restaurantData = req.body
//   return Restaurant.findById(id)
//     .then(restaurant => {
//       restaurant.name = restaurantData.name
//       restaurant.name_en = restaurantData.english_name
//       restaurant.category = restaurantData.category
//       restaurant.image = restaurantData.image
//       restaurant.location = restaurantData.address
//       restaurant.phone = restaurantData.phone_number
//       restaurant.google_map = restaurantData.google_map_address
//       restaurant.rating = restaurantData.rating
//       restaurant.description = restaurantData.description
//       return restaurant.save()
//     })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// // 刪除一家餐廳資訊
// app.delete('/restaurants/:restaurant_id', (req, res) => {
//   const id = req.params.restaurant_id
//   return Restaurant.findById(id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.get('/search', (req, res) => {
//   if (!req.query.keyword) {
//     res.redirect('/')
//   }

//   const keyword = req.query.keyword.trim().toLowerCase()

//   Restaurant.find({})
//     .lean()
//     .then(restaurants => {
//       const filteredRestaurantData = restaurants.filter(
//         data =>
//           data.name.toLocaleLowerCase().includes(keyword) ||
//           data.category.toLocaleLowerCase().includes(keyword)
//       )
//       res.render('index', { restaurants: filteredRestaurantData, keyword })
//     })
//     .catch(error => console.log(error))
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
