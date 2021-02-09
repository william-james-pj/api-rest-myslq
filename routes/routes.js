const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UsersController = require("../controllers/UsersController");

router.get('/', HomeController.index);
router.post('/user', UsersController.validate('createUser'), UsersController.createUser);
router.get('/user', UsersController.findAllUser);
router.get('/user/:id', UsersController.findUserId);
router.put('/user', UsersController.updateUser);
router.delete('/user/:id', UsersController.deleteUser);
router.post('/recoverpassword', UsersController.recoverPassword);
router.post('/changepassword', UsersController.changePasword);

module.exports = router;