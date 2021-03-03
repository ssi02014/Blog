import express from 'express';

import multer from 'multer';
import multerS3 from 'multer-s3'; //multer는파일들을 주고받을 수 있게 해줌
import path from 'path'; //경로 파악에 도움을줌
import AWS from 'aws-sdk'; //aws를 사용할 수 있게해줌
import dotenv from 'dotenv';
import moment from "moment";

//Model
import Post from '../../models/post'; 
import Category from '../../models/category'; 
import User from '../../models/user'; 

//Middleware
import auth from '../../middleware/auth'; 
import { isNullOrUndefined } from 'util';

dotenv.config();

const router = express.Router();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
    storage: multerS3({
        s3,
        bucket: "minjaesideproject/upload",
        region: "ap-northeast-2",
        key(req, file, cb) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext); 
            cb(null, basename + new Date().valueOf() + ext);
        },
    }),
    limits: { fieldSize: 100 * 2048 * 2048 },
});

// api/post/image
//uploadS3.array('upload', 5)의 의미는 5개로 제한한다는 뜻
router.post('/image', uploadS3.array('upload', 5), async(req, res, next) => {
    try {
        console.log(req.files.map(v => v.location));
        res.json({ uploaded: true, url: req.files.map(v => v.location) });
    } catch (e) {
        console.error(e);
        res.json({ uploaded: false, url: null });
    }
});

// POST api/post
router.get('/', async(req, res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult);
})

router.post('/', auth, uploadS3.none(), async(req, res, next) => {
    try {
        console.log(req, "req");

        const { title, contents, fileUrl, creator, category } = req.body; //구조 분해 문법
        const newPost = await Post.create({
            title, 
            contents, 
            fileUrl, 
            creator: req.user.id,
            date: moment().format("YYYY-MM-DD hh:mm:ss"),
        });

        const findResult = await Category.findOne({
            categoryName: category,
        });

        console.log(findResult, "Find Result!!");

        if (isNullOrUndefined(findResult)){
            const newCategory = await Category.create({
                categoryName: category
            });
            await Post.findByIdAndUpdate(newPost._id, {
                $push: { 
                    category: newCategory._id 
                }
            });
            await Category.findByIdAndUpdate(newCategory._id, {
                $push: {
                    posts: newPost._id
                }
            });
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    posts: newPost._id,
                },
            });

        } else {
            await Category.findByIdAndUpdate(findResult._id, {
                $push: {
                    posts: newPost._id,
                }
            });
            await Post.findByIdAndUpdate(newPost._id, {
                category: findResult._id,
            });
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    posts: newPost._id,
                },
            });
        }
        return res.redirect(`/api/post/${newPost._id}`);
    } catch(e) {
        console.log(e);
    }
});

//api/post/:id
router.get("/:id", async(req, res, next) => {
    try{
        const post = await Post.findById(req.params.id)
                    .populate("creator", "name")
                    .populate({
                        path: "category", select: "categoryName"
                    });
        post.views += 1;
        post.save();
        console.log(post);
        res.json(post);
    } catch(e) {
        console.error(e);
        next(e);
    }
})

export default router;
