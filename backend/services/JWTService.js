const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../config/index');
const RefreshToken = require('../models/token');

class JWTService{
    //Sign acess token
    static signAcessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: expiryTime}); //jwn sign method
    }
    //Sign refresh token
    static signRefreshToken(payload, expiryTime){
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: expiryTime}); //jwn sign method
    }
    //verify acess token
    static verifyAcessToken(token){
        return jwt.verify(token, ACCESS_TOKEN_SECRET); //jwn sign method
    }
    //verify refresh token
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN_SECRET); //jwn sign method
    }
    //store refresh token
    static async storeRefreshToken(token){
        try{
            const newToken = new RefreshToken ({
                token: token,
                userId: userId
            });
            await newToken.save(); //store in db
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = JWTService;