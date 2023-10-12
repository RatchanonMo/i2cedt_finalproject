let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router(),
  TodoSchema = require("../model/TodoList");

router.route("/").get(async (req, res) => {
  //   console.log("---- GET TODO touched! ----");
  const item = await TodoSchema.find();
  res.json(item);
});

router.route("/create").post(async (req, res, next) => {
  console.log("---- CREATE TODO touched! ----");
  console.log(req.body);

  await TodoSchema.create(req.body);

  //   res.json(newItem);
});

router.route("/delete/:id").delete(async (req, res, next) => {
  console.log("---- DELETE TODO touched! ----");
  // console.log(req.params.id   );
  TodoSchema.findByIdAndRemove(req.params.id).then(() => {
    console.log("DELETE SUCCESS");
  });

  //   res.json(newItem);
});

router.route("/edit/:id").put(async (req, res, next) => {
  console.log("---- EDIT TODO touched! ----");
  // console.log(req.params.id   );

  TodoSchema.findByIdAndUpdate(req.params.id, req.body).then(() => {
    console.log("EDIT SUCCESS");
  });

  //   res.json(newItem);
});

module.exports = router;
