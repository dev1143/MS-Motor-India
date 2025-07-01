//fetch user from models
const bcrypt = require("bcrypt")
const models = require('../models');
const emailChecker = require('../utils/builtinfunc');
const NameChecker = require('../utils/builtinfunc');
const jwt = require('jsonwebtoken');

var createUser = async (req, res, next) => {
    console.log(req.body)
    if (req.body && req.body instanceof Object) {
        const saltRounds = 10
        let validate = validateUsers(req.body);
        if (!validate) {
            //to hash the password 
            console.log('pwd___', req.body["password"])
            let hashedpassword = await bcrypt.hash(req.body["password"], saltRounds)
            // to check wether the user exsists or not
            let alreadyCreatedUser = await models.users.findOne({
                where: {
                    email_Id: req.body["email_Id"],
                    first_name: req.body["first_name"],
                    last_name: req.body["last_name"],
                }
            })
            if (alreadyCreatedUser) {
                res.status(200).json({ message: "User already exsists!", statusCode: 303 })
            } else {
                let user = await models.users.create({
                    email_Id: req.body["email_Id"],
                    first_name: req.body["first_name"],
                    last_name: req.body["last_name"],
                    password: hashedpassword
                })
                res.status(200).json({ message: "User has been registered successfully", statusCode: 200 })
            }
        } else {
            res.status(200).json({ message: validate, statusCode: 304 })
        }
        // res.status(200).json(user)
    }
    //  return user
}

var loginUser = async (req, res, next) => {

    if (req.body && req.body instanceof Object) {
        const saltRounds = 10
        let alreadyCreatedUser = await models.users.findOne({
            where: {
                email_Id: req.body["email_Id"],
            }
        })
        if (alreadyCreatedUser) {
            let booleanCompare = bcrypt.compare(req.body['password'], alreadyCreatedUser.dataValues.password);
            console.log('created user____', await booleanCompare, alreadyCreatedUser)

            if (req.body['email_Id'] == alreadyCreatedUser.dataValues.email_Id && await booleanCompare) {
                let responseUser = await models.users.findOne({
                    where: {
                        email_Id: req.body["email_Id"],
                    }
                })
                const token = jwt.sign({ userId: responseUser.dataValues }, "ms-motor-india", {
                    expiresIn: '1h',
                });
                // console.log('little bit', await responseUser)
                console.log('token init', token)
                // res.status(200).json(responseUser.dataValues)
                res.status(200).json({ token: token, userDetails: responseUser.dataValues, statusCode: 200 })
                console.log(req.headers['authorization'])
            } else {
                res.status(200).json({ message: 'Email or password didnt match', statusCode: 303 })
            }
        } else {
            res.status(200).send({ message: 'Need to Sign up first !' })
        }
        // let hashedpassword = await bcrypt.hash(req.body["password"], saltRounds)
        // alreadyCreatedUser
    }
}



function validateUsers(incomingObj) {
    if (!emailChecker.emailChecker(incomingObj["email_Id"]) || incomingObj["email_Id"] == "") {
        let str = ''
        str += 'Please provide a valid email!'
        return str
    }

    if (!NameChecker.NameChecker(incomingObj["first_name"]) || incomingObj["first_name"] == "") {
        let str = ''
        str += 'First name cannot be empty!'
        return str
    }

    if (!NameChecker.NameChecker(incomingObj["last_name"]) || incomingObj["last_name"] == "") {
        let str = ''
        str += 'Last name cannot be empty!'
        return str
    }
    return false
}

module.exports = { createUser, loginUser }