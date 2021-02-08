const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UsersController = require("../controllers/UsersController");

router.get('/', HomeController.index);
router.post('/user', UsersController.validate('createUser'), UsersController.createUser);

module.exports = router;