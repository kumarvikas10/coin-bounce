const Joi = require('joi');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const Comment = require('../models/comment') 

const commentController={
    async create(req,res,next){
        const createCommentSchema = Joi.object({
            content: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blog: Joi.string().regex(mongodbIdPattern).required(),
        });

        const {error} = createCommentSchema.validate(req.body);

        if(error){
            return next(error);
        }

        const {content, author, blog} = req.body;
        try{
            const newComment = new Comment ({
                content, author, blog
            });
            await newComment.save();

        }catch(error){
            return next(error);
        }

        return res.status(201).json({message: "Comment Created"});
    },
    async getById(req,res,next){

    }
}

module.exports = commentController;