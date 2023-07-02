const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const authController = {
    async register(req, res, next) {
        // 1. validate user input
        const userRegisterSchema = Joi.object({
          username: Joi.string().min(5).max(30).required(),
          name: Joi.string().max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string().pattern(passwordPattern).required(),
          confirmPassword: Joi.ref("password"),
        });
        const { error } = userRegisterSchema.validate(req.body);
    
        // 2. if error in validation -> return error via middleware
        if (error) {
          return next(error);
        }
    
        // 3. if email or username is already registered -> return an error
        const { username, name, email, password } = req.body;
    
        try {
          const emailInUse = await User.exists({ email });
    
          const usernameInUse = await User.exists({ username });
    
          if (emailInUse) {
            const error = {
              status: 409,
              message: "Email already registered, use another email!",
            };
    
            return next(error);
          }
    
          if (usernameInUse) {
            const error = {
              status: 409,
              message: "Username not available, choose another username!",
            };
    
            return next(error);
          }
        } catch (error) {
          return next(error);
        }
    
        // 4. password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. store user data in db
        const userToRegister = new User ({
            username,
            email,
            name,
            password: hashedPassword,
        });

        const user = await userToRegister.save();

        //6. response send
        return res.status(201).json({user})
    },
    async login(req,res,next) {
      // 1. Validate user input
      // 2. If Validation error, return error
      // 3. match username and password
      // 4.return response

      const userLoginSchema = Joi.object({
        username: Joi.string().min(5).max(30).required(),
        password: Joi.string().pattern(passwordPattern)

      });
      const {error} = userLoginSchema.validate(req.body);

      if(error){
        return next(error);
      }
      const {username, password} = req.body; //destructure

      let user;
      try{
        //match username
        user = await User.findOne({username});

        if (!user){
          const error = {
            status: 401,
            message: 'Invalid username'
          }
          return next(error);
        }

        //match Passowrd
        const match = await bcrypt.compare(password, user.password);

        if(!match){
          const error = {
            status: 401,
            message: 'Invalid password'
          }
          return next(error);
        }

      }catch(error){
        return next(error);
      }
      return re.status(200).json({user});
    },
}

module.exports = authController;