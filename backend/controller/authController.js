const authController = {
    async register(req,res,next) {
        //1. Validate user input
        //2. if error in validation -> return error in middleware
        //3. if email or username is already registered -> return an error
        // 4. password hash
        // 5. store user data in db
        //6. response send
    },
    async login() {},
}

module.exports = authController;