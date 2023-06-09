const express = require("express");
const {
  getSingleUser,
  getSingleUsercategory
} = require("../controllers/userController");

const router = express.Router();

router
  .route("/menu/:id")
  .get(getSingleUsercategory);
router
  .route("/:id")
  .get(getSingleUser);
module.exports = router;
