var express = require('express');
var router = express.Router();
const MongoHelper = require('../db/mongo_helper.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoHelper.get("customers").then(results => {
    res.status(200).json(results);
  })
});

// router.post('/', function(req, res, next) {
//   MongoHelper.create("customers", req.body).then(results => {
//     res.status(201).json("New customer created")
//   });
// });

router.delete("/:id", function(req, res) {
  MongoHelper.delete("customers", req.params.id).then(results => {
    res.status(200).json("Customer deleted");
  });
});

router.put("/:id", function(req, res) {
  MongoHelper.update("customers", req.params.id, req.body).then(results => {
    res.status(200).json("Customer updated");
  });
});

router.post("/:customer_id/accounts", function(req, res) {
  MongoHelper.addAccount("customers", req.params.customer_id, req.body).then(
    results => {
      res.status(201).json("New account created");
    }
  );
});

module.exports = router;
