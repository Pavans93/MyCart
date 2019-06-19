var express = require("express");
var router = express.Router();

const Item = require("../model/cart");

//retrieving data from db
router.get("/get_items", (req, res, next) => {
  Item.find(function(err, items) {
    //items is the one where all cart items will be stored
    if (err) {
      res.json(err);
    } else {
      res.json(items);
    }
  });
  //res.send("Tested");
});

//inserting data
router.post("/post_item", (req, res, next) => {
  let newCartItem = new Item({
    itemName: req.body.itemName,
    itemQuantity: req.body.itemQuantity,
    itemBought: req.body.itemBought
  });
  //to save/insert data(newCartItem obj) into db
  //item is the one which is going to be inserted
  newCartItem.save((err, item) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ msg: "Item has been added successfully" });
    }
  });
});

//updating data
router.put("/put_item/:id", (req, res, next) => {
  //findoneandupdate accepts 3 params : _id to get the particular item, $set for update criteria and callback
  Item.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
      }
    },
    function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

//deleting data
router.delete("/delete_item/:id", (req, res, next) => {
  Item.remove({ _id: req.params.id }, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//exports make this router obj available in all places
module.exports = router;
