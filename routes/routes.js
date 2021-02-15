const express = require("express")
const app = express();
const router = express.Router();
const AdminAuth = require("../middleware/AdminAuth");
const TokenAuth = require("../middleware/TokenAuth");
const HomeController = require("../controllers/HomeController");
const UsersController = require("../controllers/UsersController");

router.get('/', HomeController.index);
router.get('/user', AdminAuth, UsersController.findAllUser);
router.get('/user/:id', AdminAuth, UsersController.findUserId);
router.post('/user', UsersController.validate('createUser'), UsersController.createUser);
router.post('/recoverpassword', UsersController.recoverPassword);
router.post('/changepassword', UsersController.changePasword);
router.post('/login', UsersController.login);
router.post('/validate', AdminAuth, HomeController.validate);
router.post('/validatetoken', TokenAuth, HomeController.validate);
router.put('/user', AdminAuth, UsersController.updateUser);
router.delete('/user/:id', AdminAuth, UsersController.deleteUser);

module.exports = router;
