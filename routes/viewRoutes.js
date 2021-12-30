const router = require("express").Router();
const postController = require("../controller/postController");

router.get("/posts", postController.getAllPost);
router.post("/post", postController.createPost);
router.patch("/post/:id", postController.updatePost);

module.exports = router;
