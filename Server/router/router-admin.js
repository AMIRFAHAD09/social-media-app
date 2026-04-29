const express = require("express");
const {listUsers,deleteUser} = require("../controller/admin-controller");

const router = express.Router();

router.get("/users", listUsers)
router.delete("/users/delete/:id",deleteUser)
module.exports = router;