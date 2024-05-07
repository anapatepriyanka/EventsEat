require('dotenv').config()
const express = require('express')
const {checkSchema} = require('express-validator')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3099
const multer = require('multer');
app.use('/uploads', express.static('uploads'));



const usersCtrl = require('./app/controllers/users-controller');
const catererCtrl = require('./app/controllers/caterer-controller')
const menuItemCtrl = require('./app/controllers/menuItemController')
const menuCartCtrl = require('./app/controllers/menuCart-controller')
const enquiryCtrl = require('./app/controllers/enquiry-controller')
const eventsCtrl = require('./app/controllers/event-controller')
const {reviewsCtrl, ratingsCtrl} = require('./app/controllers/review-controller')
const paymentsCtrl = require('./app/controllers/payment-controller')

const {userRegisterSchema, userLoginSchema} = require('./app/validations/user-validation')

const configureDB = require('./config/db')




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './images');
  },
  filename: function (req, file, cb) {
   return  cb(null, Date.now() + '-' + file.originalname);
  }
})
const upload = multer({storage});


const catererValidationSchema = require('./app/validations/caterer-validation')
const enquiryValidationSchema = require('./app/validations/enquiry-validation')
const { authenticateUser, authorizeUser } = require('./app/middlewares/auth')
const menuCartValidation = require('./app/validations/menuCart-validation')




configureDB()

app.use(cors())
app.use(express.json())


//user
app.post('/api/user/register',checkSchema(userRegisterSchema), usersCtrl.register)
app.post('/api/user/login', checkSchema(userLoginSchema), usersCtrl.login)
app.get('/api/user/account', authenticateUser, usersCtrl.account)

//Caterer
app.post('/api/caterer', authenticateUser, authorizeUser(['caterer']), checkSchema(catererValidationSchema), catererCtrl.createCatererService)
app.put('/api/caterer/verify/:id', authenticateUser, authorizeUser(['admin']), checkSchema(catererValidationSchema), catererCtrl.verify)
app.get('/api/caterer', checkSchema(catererValidationSchema), catererCtrl.catererItems)
app.put('/api/caterer/:id', checkSchema(catererValidationSchema), catererCtrl.updateCaterer)
app.delete('/api/caterer/:id', checkSchema(catererValidationSchema), catererCtrl.deleteCaterer)

//menuItem
app.post('/api/menuItem/upload', authenticateUser, authorizeUser(['caterer']), upload.single('itemImage'), menuItemCtrl.create)
app.post('/api/menuItem/upload',upload.array('itemImage',4), menuItemCtrl.create)

//menuCart
app.post('/api/carts',authenticateUser, authorizeUser(['customer']), checkSchema(menuCartValidation), menuCartCtrl.create )
app.get('/api/carts',checkSchema(menuCartValidation), menuCartCtrl.list)
app.delete('api/carts/:id', checkSchema(menuCartValidation), menuCartCtrl.delete)


//enquiry
app.post('/api/enquiries/:id', authenticateUser, authorizeUser(['customer']), checkSchema(enquiryValidationSchema), enquiryCtrl.create)


//event
app.post('/api/events/:catererId', authenticateUser, authorizeUser(['customer']), eventsCtrl.create)

//review
app.post('/api/reviews/:catererId', authenticateUser, authorizeUser(['customer']), reviewsCtrl.create)
app.get('/api/reviews', reviewsCtrl.list)
app.post('/api/ratings/:catererId', authenticateUser, authorizeUser(['customer']), ratingsCtrl.create )
app.get('/api/ratings', ratingsCtrl.list)

//payment
app.post('/api/payments',authenticateUser,authorizeUser(['customer']),paymentsCtrl.pay)
app.post('/api/payments/success/:id', paymentsCtrl.successUpdate);
app.post('/api/payments/failed/:id', paymentsCtrl.failedUpdate);

  



app.listen(port, () => {
    console.log('server running on port', port)
})



 
