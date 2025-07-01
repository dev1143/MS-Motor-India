const base64_encode = require('../utils/builtinfunc');
const models = require('../models');
const jwt = require('jsonwebtoken');

var createCars = async (req, res, next) => {
    try {
        let base64Image = ''
        if (req.file) {
            // console.log('file____', (base64_encode(req.file)))
            // let actualfile = req.file.path.split('\\')
            // actualfile = `/${actualfile[0]}/${actualfile[1]}`
            const cars = await models.cars.create({
                title: req.body["title"] ? req.body["title"] : "",
                description: req.body["description"] ? req.body["description"] : "",
                image: req.file ? `/uploads/${req.file.filename}` : "",
                price: req.body["price"] ? req.body["price"] : "",
            })
            res.status(200).json({ message: "Cars Added Successfully" })
        } else if (req.body["imageFile"] == "") {
            res.status(200).json({ message: "Image not uploaded Properly!" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

var viewCars = async (req, res) => {
    try {
        let viewCars = await models.cars.findAndCountAll({ raw: true });
        if (viewCars) {
            res.status(200).json(viewCars)
        }
    } catch (err) {
        console.log(err)
    }
}

var deleteEachCar = async (req, res) => {
    try {
        let deleteCar = await models.cars.destroy({ where: { id: req.body['id'] } })
        if (deleteCar) {
            res.status(200).json({ message: 'Deleted Successfully !' })
        }
    } catch (err) {
        console.log(err)
    }
}

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token missing or invalid' });
    }

    const token = bearerHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, "ms-motor-india");
        req.user = decoded; // attach decoded user
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { createCars, viewCars, verifyToken, deleteEachCar }