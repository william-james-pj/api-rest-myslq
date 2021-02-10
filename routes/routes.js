const express = require("express")
const app = express();
const router = express.Router();
const AdminAuth = require("../middleware/AdminAuth");
const HomeController = require("../controllers/HomeController");
const UsersController = require("../controllers/UsersController");

router.get('/', HomeController.index);
router.post('/user', UsersController.validate('createUser'), UsersController.createUser);
router.get('/user', AdminAuth, UsersController.findAllUser);
router.get('/user/:id', AdminAuth, UsersController.findUserId);
router.put('/user', AdminAuth, UsersController.updateUser);
router.delete('/user/:id', AdminAuth, UsersController.deleteUser);
router.post('/recoverpassword', UsersController.recoverPassword);
router.post('/changepassword', UsersController.changePasword);
router.post('/login', UsersController.login);

module.exports = router;