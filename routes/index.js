const router = require("express").Router();

const apiRoutes = require("./api");

router.get("/api", apiRoutes);

module.exports = router;