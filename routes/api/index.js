const router = require("express").Router();
const usersRoutes = require("./user-routes");
const thoughtsRoutes = require("./thought-routes");

router.get("/users", usersRoutes);
router.get("/thoughts", thoughtsRoutes);

module.exports = router;