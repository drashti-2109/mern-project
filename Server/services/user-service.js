const User = require('../models/user-model')

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if(!firstname || !email || !password){
        throw new Error("All fields are required")
    }

    const users = User.create({
        fullname : {
            firstname, lastname
        },
        email,  
        password  
    })
      
    return users
}