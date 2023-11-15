const Person = require("../models/person");
const Category = require("../models/category");

const { Op } = require("sequelize");


exports.persons_details = async function(req, res) {
    const slug = req.params.slug;
    try {
        const person = await Person.findOne({
            where: {
                url: slug
            },
            raw: true
        });

        if(person) {
            return res.render("users/person-details", {
                title: person.isim,
                person: person
            });
        }
        res.redirect("/");
    }
    catch(err) {
        console.log(err);
    }
}

exports.person_list = async function(req, res) {
    const size = 3;
    const { page = 0 } = req.query;
    const slug = req.params.slug;

    try {
        const { rows, count } = await Person.findAndCountAll({ 
            where: { onay: {[Op.eq]: true } },
            raw: true,
            include: slug ? { model: Category, where: { url: slug } } : null,
            limit: size,
            offset: page * size 
        });

        const categories = await Category.findAll({ raw: true });

        res.render("users/persons", {
            title: "Tüm Personel",
            persons: rows,
            totalItems: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            categories: categories,
            selectedCategory: slug
        })
    }
    catch(err) {
        console.log(err);
    }
}

exports.index = async function(req, res) {
    try {
        const persons = await Person.findAll({
            where: {
                [Op.and]: [
                    { anasayfa: true },
                    { onay: true }
                ]
            },
            raw: true
        });
        const categories = await Category.findAll({ raw: true });

        res.render("users/index", {
            title: "Jail Break",
            persons: persons,
            categories: categories,
            selectedCategory: null
        })
    }
    catch(err) {
        console.log(err);
    }
}