// CRUD Operations for items
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/Item');

// CREATES A NEW ITEM
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            owner: req.body.owner
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// GETS A SINGLE ITEM FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id).populate({ path: 'owner', select: 'name' }).exec(function (err, item) {
        if (err) return res.status(500).send("There was a problem finding the item.");
        if (!item) return res.status(404).send("No user found.");
        res.status(200).send(item);
    });
});

// RETURNS ALL THE ITEMS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}).populate({ path: 'owner', select: 'name' }).exec(function (err, items){
        if (err) return res.status(500).send("There was a problem finding the items.");
        res.status(200).send(items);
    } );
});



// DELETES AN ITEM FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, item) {
        if (err) return res.status(500).send("There was a problem deleting the item.");
        res.status(200).send("Itemr: "+ item.name +" was deleted.");
    });
});

// UPDATES A SINGLE ITEM IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, item) {
        if (err) return res.status(500).send("There was a problem updating the item.");
        res.status(200).send(item);
    });
});


module.exports = router;