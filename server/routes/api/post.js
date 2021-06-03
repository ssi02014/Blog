import express from "express";

import multer from "multer";
import multerS3 from "multer-s3"; //multer는파일들을 주고받을 수 있게 해줌
import path from "path"; //경로 파악에 도움을줌
import AWS from "aws-sdk"; //aws를 사용할 수 있게해줌
import dotenv from "dotenv";
import moment from "moment";

//Model
import Post from "../../models/post";
import Category from "../../models/category";
import User from "../../models/user";
import Comment from "../../models/comment";

//Middleware
import auth from "../../middleware/auth";
import { isNullOrUndefined } from "util";

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
      console.log(file);
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fieldSize: 100 * 2048 * 2048 },
});
// api/post/image
//uploadS3.array('upload', 5)의 의미는 5개로 제한한다는 뜻
router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});

// POST api/post
router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  const categoryFindResult = await Category.find();
  const result = { postFindResult, categoryFindResult };

  res.json(result);
});

router.post("/", auth, uploadS3.none(), async (req, res, next) => {
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

    if (isNullOrUndefined(findResult)) {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: {
          category: newCategory._id,
        },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: {
          posts: newPost._id,
        },
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
        },
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
  } catch (e) {
    console.log(e);
  }
});

//api/post/:id
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({
        path: "category",
        select: "categoryName",
      });
    post.views += 1;
    post.save();
    console.log(post);
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//api/post/comments
router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id).populate({
      path: "comments",
    });
    const result = comment.comments;
    console.log(result, "comment load");
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

router.post("/:id/comments", async (req, res) => {
  console.log(req);
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName,
    post: req.body.id,
    date: moment().format("YYYY-MM-DD hh:mm:ss"),
  });
  console.log(newComment, "newComment");

  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });
    res.json(newComment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//api/post/:id (DELETE)
router.delete("/:id", auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });

  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }
  );

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }
  return res.json({ success: true });
});

//api/post/:id/edit
router.get("/:id/edit", auth, async (req, res, next) => {
  try {
    const post = await (
      await Post.findById(req.params.id)
    ).populate("creator", "name");
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});

router.post("/:id/edit", auth, async (req, res, next) => {
  console.log(req, "api/post/:id/edit");
  const {
    body: { title, contents, fileUrl, id },
  } = req;
  try {
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        date: moment().format("YYYY-MM-DD hh:mm:ss"),
      },
      { new: true }
    );
    res.redirect(`/api/post/${modified_post.id}`);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/category/:categoryName", async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        categoryName: {
          $regex: req.params.categoryName,
          $options: "i",
        },
      },
      "posts"
    ).populate({ path: "posts" });
    console.log(result, "Category Find result");
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
export default router;
