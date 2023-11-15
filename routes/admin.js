const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");

const adminController = require("../controllers/admin");

router.get("/person/delete/:personid", adminController.get_person_delete);

router.post("/person/delete/:personid", adminController.post_person_delete);

router.get("/category/delete/:categoryid", adminController.get_category_delete);

router.post("/category/delete/:categoryid", adminController.post_category_delete);

router.get("/person/create", adminController.get_person_create);

router.post("/categories/remove", adminController.get_category_remove);

router.post("/person/create", imageUpload.upload.single("resim"), adminController.post_person_create);

router.get("/category/create", adminController.get_category_create);

router.post("/category/create", adminController.post_category_create);

router.get("/persons/:personid", adminController.get_person_edit);

router.post("/persons/:personid", imageUpload.upload.single("resim"), adminController.post_person_edit);

router.get("/categories/:categoryid", adminController.get_category_edit);

router.post("/categories/:categoryid", adminController.post_category_edit);

router.get("/persons", adminController.get_persons);

router.get("/categories", adminController.get_categories);

module.exports = router;