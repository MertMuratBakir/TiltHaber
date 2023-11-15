const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/persons/category/:slug", userController.person_list);

router.get("/persons/:slug", userController.persons_details);

router.get("/persons", userController.person_list);

router.get("/", userController.index);
 
module.exports = router;