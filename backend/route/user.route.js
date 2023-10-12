let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let UserSchema = require("../model/User");

router.route("/").get(async (req, res) => {
  const item = await UserSchema.find();
  res.json(item);
});

router.route("/create").post(async (req, res, next) => {
  console.log("---- CREATE USER touched! ----");
  console.log(req.body);


  await UserSchema.create({
    name: "small",
    username: "123",
    password: "123123",
  });


});

module.exports = router;
