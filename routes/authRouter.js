const express = require('express');
const {
  userRegister,
  userLogin,
} = require("../controllers/authController");

const router = express.Router();

router.post('/userlogin', userLogin);
router.post("/userregister", userRegister);
module.exports = router;
