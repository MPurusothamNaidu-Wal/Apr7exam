const express = require('express');
const router = express.Router();
const productModel = require("../models").ExamProducts;
const categoryModel = require("../models").ExamCategory;

router.get("/", (req, res) => {
    productModel.findAll().then(
        (product) => {
            res.json(product);
        },
        (error) => {
            res.json(error);
        }
    )
})

router.post("/", (req, res) => {
    productModel.create({
        name: req.body.name,
        price: req.body.price,
        inStore: req.body.inStore,
        category: req.body.category,
    })
        .then((products) => res.status(201).send(products))
        .catch((error) => res.status(400).send(error))
})

router.get("/category", (req, res) => {
    categoryModel.findAll().then(
        (category) => {
            res.json(category);
        },
        (error) => {
            res.json(error);
        }
    )
})

router.post("/category", (req, res) => {
    categoryModel.create({
        name: req.body.name,
    })
        .then((category) => res.status(201).send(category))
        .catch((error) => res.status(400).send(error))
})

router.put("/:id", (req, res) => {
    console.log(req.body);
    let { name, price, inStore, category } = req.body;
    productModel
        .update(
            {
                name: name,
                price: price,
                inStore: inStore,
                category: req.body.category,
            },
            {
                where: { id: req.params.id },
            }
        )
        .then(function (product) {
            res.status(200).json({ status: 1, debug_data: "Updated data" });
        });
});

router.delete("/:name", (req, res) => {
    productModel
        .destroy({
            where: {
                name: req.params.name,
            },
        })
        .then((status) => {
            if (status === 1) {
                res.status(200).json({ status: 1, debug_date: "deleted successfully" });
            } else {
                res.status(404).json({ status: 0, debug_date: "record not found" });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.put("/category/:id", (req, res) => {
    console.log(req.body);
    let { name } = req.body;
    categoryModel
        .update(
            {
                name: name,
            },
            {
                where: { id: req.params.id },
            }
        )
        .then(function (category) {
            res.status(200).json({ status: 1, debug_data: "Updated data" });
        });
});

router.delete("/category/:name", (req, res) => {
    categoryModel
        .destroy({
            where: {
                name: req.params.name,
            },
        })
        .then((status) => {
            if (status === 1) {
                res.status(200).json({ status: 1, debug_date: "deleted successfully" });
            } else {
                res.status(404).json({ status: 0, debug_date: "record not found" });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});
module.exports = router;