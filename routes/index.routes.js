const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// User routes
router.get("/", (req, res, next) => {
  res.render("user");
});


module.exports = router;
