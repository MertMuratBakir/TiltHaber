const Person = require("../models/person");
const Category = require("../models/category");
const { Op } = require("sequelize");
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");

const fs = require("fs");

exports.get_person_delete = async function(req, res){
    const personid = req.params.personid;

    try {
        const person = await Person.findByPk(personid);

        if(person) {
            return res.render("admin/person-delete", {
                title: "delete person",
                person: person
            });
        }
        res.redirect("/admin/persons");
    }
    catch(err) {
        console.log(err); 
    }
}

exports.post_person_delete = async function(req, res) {
    const personid = req.body.personid;
    try {
        const person = await Person.findByPk(personid);
        if(person) {
            await person.destroy();
            return res.redirect("/admin/persons?action=delete");
        }
        res.redirect("/admin/persons");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_category_delete = async function(req, res){
    const categoryid = req.params.categoryid;

    try {
        const category = await Category.findByPk(categoryid);

        res.render("admin/category-delete", {
            title: "delete category",
            category: category
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_category_delete = async function(req, res) {
    const categoryid = req.body.categoryid;
    try {
        await Category.destroy({
            where: {
                id: categoryid
            }
        });
        res.redirect("/admin/categories?action=delete");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_person_create = async function(req, res) {
    try {
        const categories = await Category.findAll();

        res.render("admin/person-create", {
            title: "add person",
            categories: categories
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_person_create = async function(req, res) {
    const isim = req.body.isim;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const anasayfa = req.body.anasayfa == "on" ? 1:0;
    const onay = req.body.onay == "on"? 1:0;

    try {
        await Person.create({
            isim: isim,
            url: slugField(isim),
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay
        });
        res.redirect("/admin/persons?action=create");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_category_create = async function(req, res) {
    try {
        res.render("admin/category-create", {
            title: "add category"
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_category_create = async function(req, res) {
    const name = req.body.name;
    try {
        await Category.create({ name: name, url: slugField(name) }); // url alanını doldur
        res.redirect("/admin/categories?action=create");
    }
    catch(err) {
        console.log(err);
    }
}
exports.get_person_edit = async function(req, res) {
    const personid = req.params.personid;

    try {
        const person = await Person.findOne({
            where: {
                id: personid
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });
        const categories = await Category.findAll();

        if(person) {
            return res.render("admin/person-edit", {
                title: person.dataValues.isim,
                person: person.dataValues,
                categories: categories
            });
        }

        res.redirect("admin/persons");
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_person_edit = async function(req, res) {
    const personid = req.body.personid;
    const isim = req.body.isim;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const kategoriIds = req.body.categories;
    const url = req.body.url;

    let resim = req.body.resim;

    if(req.file) {
        resim = req.file.filename;

        fs.unlink("./public/images/" + req.body.resim, err => {
            console.log(err);
        });
    }

    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;

    try {
        const person = await Person.findOne({
            where: {
                id: personid
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });
        if(person) {
            person.isim = isim;
            person.altbaslik = altbaslik;
            person.aciklama = aciklama;
            person.resim = resim;
            person.anasayfa = anasayfa;
            person.onay = onay;
            person.url = url;
            
            if(kategoriIds == undefined) {
                await person.removeCategories(person.categories);
            } else {
                await person.removeCategories(person.categories);
                const selectedCategories = await Category.findAll({
                    where: {
                        id: {
                            [Op.in]: kategoriIds
                        }
                    }
                });
                await person.addCategories(selectedCategories);
            }

            await person.save();
            return res.redirect("/admin/persons?action=edit&personid=" + personid);
        }
        res.redirect("/admin/persons");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_category_remove = async function(req, res) {
    const personid = req.body.personid;
    const categoryid = req.body.categoryid;

    await sequelize.query(`delete from personCategories where personId=${personid} and categoryId=${categoryid}`);
    res.redirect("/admin/categories/" + categoryid);
}

exports.get_category_edit = async function(req, res) {
    const categoryid = req.params.categoryid;

    try {
        const category = await Category.findByPk(categoryid);
        const persons = await category.getPersons();
        const countPerson = await category.countPersons();

        if(category) {
            return res.render("admin/category-edit", {
                title: category.dataValues.name,
                category: category.dataValues,
                persons: persons,
                countPerson: countPerson
            });
        }

        res.redirect("admin/categories");
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_category_edit = async function(req, res) {
    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try {
        await Category.update({ name: name, url: slugField(name) }, {
            where: {
                id: categoryid
            }
        });
        return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
    }    
    catch(err) {
        console.log(err);
    }
}

exports.get_persons = async function(req, res) {
    try {
        const persons = await Person.findAll({ 
            attributes: ["id","isim","altbaslik","resim"],
            include: {
                model: Category,
                attributes: ["name"]
            } 
        });
        res.render("admin/person-list", {
            title: "person list",
            persons: persons,
            action: req.query.action,
            personid: req.query.personid
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_categories = async function(req, res) {
    try {
        const categories = await Category.findAll();

        res.render("admin/category-list", {
            title: "person list",
            categories: categories,
            action: req.query.action,
            categoryid: req.query.categoryid
        });
    }
    catch(err) {
        console.log(err);
    }
}