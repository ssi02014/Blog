import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3'; //multer는파일들을 주고받을 수 있게 해줌
import path from 'path'; //경로 파악에 도움을줌
import AWS from 'aws-sdk'; //aws를 사용할 수 있게해줌
import dotenv from 'dotenv';

import Post from '../../models/post'; //Model
import auth from '../../middleware/auth'; //Middleware

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

// api/post
router.get('/', async(req, res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult);
})

router.post('/', auth, async(req, res, next) => {
    try {
        console.log(req, "req");

        const { title, contents, fileUrl, creator } = req.body; //구조 분해 문법
        const newPost = await Post.create({
            title, 
            contents, 
            fileUrl, 
            creator
        });
        res.json(newPost);
    } catch(e) {
        console.log(e);
    }
});

export default router;
