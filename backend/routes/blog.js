import getAuth from "../middleware/auth.js";
import Blog from "../models/BlogSchema.js";
import express from "express";

const BlogRouter = express.Router();
BlogRouter.use(express.json());

const response = (res, status, result) => {
  res.status(status).json(result);
};

BlogRouter.get("/", async (req, res) => {
  await Blog.find()
    .then((result) => {
      response(res, 200, result);
    })
    .catch((err) => {
      response(res, 400, { error: err });
    });
});

BlogRouter.post("/create", getAuth, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    if (title && content) {
      const blog = new Blog({
        title,
        content,
        image,
        user: req.userId,
      });
      console.log(title, content);
      await blog.save();
      response(res, 200, { msg: "blog created", blog: blog });
      console.log({ blog: blog });
    }
  } catch (error) {
    response(res, 400, { error: error });
  }
});

BlogRouter.delete("/delete", getAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete({
      user: req.userId,
      _id: req.body.id,
    });
    if (!blog) {
      response(res, 404, { error: "blog not found" });
    }
    response(res, 200, { msg: "Blog deleted" });
  } catch (error) {
    response(res, 400, { error: error });
  }
});

BlogRouter.put("/update", getAuth, async (req, res) => {
  const { title, content, image  ,id} = req.body;
  await Blog.findOneAndUpdate(
    { user: req.userId, _id: id },
    {
      title,
      content,
      image,
    }
  )
    .then((result) => response(res, 200, { msg: "blog updated", blog: result }))
    .catch((err) => response(res, 400, err));
});

export default BlogRouter;
