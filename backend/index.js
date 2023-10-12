let express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  userRoute = require("./route/user.route"),
  todoRoute = require("./route/todo.route"),
  bodyParser = require("body-parser");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Nonnyss:7yearnonee@todo.a0rxpfo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(
    () => {
      console.log("DB connect");
    },
    (error) => {
      console.log("Error");
    }
  );

app.listen(4000, () => {
  console.log("connect to port" + 4000);
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/user", userRoute);
app.use("/todo", todoRoute);
