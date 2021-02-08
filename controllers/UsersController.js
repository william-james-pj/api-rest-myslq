const { body, validationResult } = require("express-validator");

class UsersController {
  async index(req, res) {}

  async createUser(req, res) {

    let erros = validationResult(req).formatWith(({ msg }) => msg);
    if (!erros.isEmpty()) {
      return res.status(400).send({ erros: erros.array() });
    }
    
    let { name, email, password, role } = req.body;

    res.status = 200;
    res.send("Pegando o corpo da requisicao!");
  }

  validate(method) {
    switch (method) {
      case "createUser": {
        return [
          body('name').exists().withMessage("Name doesn't exists"),
          body('email').exists().isEmail().withMessage("Invalid email"),
          body('password').exists().isLength({ min: 4 }).withMessage("Invalid password"),
          body('role').exists().isInt({ min: 1, max: 10 }).withMessage("Invalid role"),
        ];
      }
    }
  }
}

module.exports = new UsersController();
