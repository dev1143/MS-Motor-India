const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Directory where files will be uploaded
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create unique filename
    },
});
const upload = multer({ storage });
//controller
const cars = require('../controllers/carModelsController')


//adding a new car
router.post('/cars', upload.single('image'), cars.verifyToken, cars.createCars)
router.get('/cars', cars.viewCars);
router.post('/delete-cars', cars.deleteEachCar);



module.exports = router;

