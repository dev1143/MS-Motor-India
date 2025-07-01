const bcrypt = require("bcrypt")
const multer = require('multer')

function NameChecker(str) {
    try {
        if (str && str.length > 0) {
            if (typeof str == 'string') return str.trim()
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}



function base64_encode(file) {
    // read binary data
    // read binary data
    var bitmap = fs.readFileSync(file.path);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// async function passwordEncryption(pwd) {
//     try {
//         if (pwd && pwd.length > 0) {
//         const saltRounds = 10;
//         let hashedpassword = await bcrypt.hash("hello i am a boy", saltRounds);
//         console.log('hashed pwd___', hashedpassword)
//         // return hashedpassword
//         }
//     } catch (err) {
//         console.log(err)
//     }
// }

function emailChecker(email) {
    // regular expression
    try {
        if (email && email.length > 0 && email.includes('@')) {
            let regEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            if (regEx.test(email)) return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    NameChecker: NameChecker,
    emailChecker: emailChecker,
    base64_encode: base64_encode
}