const Joi = require('joi');
const fs = require('fs');
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const Blog = require('../models/blog');
const {BACKEND_SERVER_PATH} = require('../config/index');
const BlogDTO = require('../dto/blog');

const blogController = {
    async create(req,res,next){
        // 1. Validate req body
        // 2. Handle photo storage ,naming
        // 3. add to db
        // 4. return response

        // photo comes by client side -> base64 encoded string -> decode -> store -> save photos path in db

        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required()
        })

        const {error} = createBlogSchema.validate(req.body);

        if (error){
            return next(error);
        }

        const {title,author,content,photo} = req.body;

        //photo read as buffer
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64')

        // add random name
        const imagePath = `${Date.now()}-${author}`;

        // save locally
        try{
            fs.writeFileSync(`storage/${imagePath}`, buffer);
        }catch(error){
            return next(error);
        }
        
        //save blog in db

        let newBlog;
        try{
            newBlog = new Blog({
                title,
                author,
                content,
                photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`
            })

            await newBlog.save();
        }catch(error){
            return next(error);
        }
        const blogDto = new BlogDTO(newBlog);

        return res.status(201).json({blog: blogDto});
    },
    async getAll(req,res,next){},
    async getById(req,res,next){},
    async update(req,res,next){},
    async delete(req,res,next){}
}

module.exports = blogController;