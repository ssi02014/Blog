import express from 'express';

import Post from '../../models/post'; //Model

const router = express.Router();

// api/post
router.get('/', async(req, res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult);
})

router.post('/', async(req, res, next) => {
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
