const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.get("/users", userRoutes);
router.get("/thoughts", thoughtRoutes);

module.exports = router;