const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const passwordPattern = /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const authController = {
    async register(req,res,next) {
        //1. Validate user input
        const userRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password')
        })

        const {error} = userRegisterSchema.validate(req.body);
        //2. if error in validation -> return error in middleware

        if(error){ //next is used to implement next middleware
            return next(error);
        }

        //3. if email or username is already registered -> return an error
        const {username, name, email, password} = req.body

        try{
            const emailInUse = await User.exists({email});
            const usernameInUse = await User.exists({email});

            if(emailInUse){
                const error = {
                    status: 409,
                    message: 'Email already registered, use another email!'
                }
                return next(error);
            }

            if(usernameInUse){
                const error = {
                    status: 409,
                    message: 'Username not available, choose another username!'
                }
                return next(error);
            }
        }
        catch(error){
            return next(error);
        }
        // 4. password hash
        //123abc -> diffrent code oedfdefzedfs
        //login -> 123abcd -> oedfdefzedfsaas if both hash not match then return error
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. store user data in db
        const userToRegister = new user ({
            username,
            email,
            name,
            password: hashedPassword
        })

        await userToRegister.save();

        //6. response send
        return res.status(201).json({user})
    },
    async login() {},
}

module.exports = authController;