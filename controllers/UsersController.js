const { body, validationResult } = require("express-validator");

const userModels = require("../models/User");
class UsersController {
  async findAllUser(req, res) {
    let users = await userModels.findAll();
    res.status(200);
    res.json(users);
  }

  async findUserId(req, res) {
    let user = await userModels.findById(req.params.id);
    if (user === undefined) {
      res.status(400);
      res.json({});
    } else {
      res.status(200);
      res.json(user);
    }
  }

  async updateUser(req, res) {
    let { id, name, email, role } = req.body;
    let result = await userModels.update(id, name, email, role);
    if (result === undefined)
      return res.status(500).send({ err: "Internal Server Error" });
    if (result.status === false)
      return res.status(406).send({ err: result.err });
    res.status = 200;
    res.send("Updated user!");
  }

  async deleteUser(req, res) {
    let id  = req.params.id;
    let result = await userModels.delete(id);
    if (result.status === false)
      return res.status(406).send({ err: result.err });
    res.status = 200;
    res.send("Deleted user!");
  }

  async createUser(req, res) {
    let erros = validationResult(req).formatWith(({ msg }) => msg);
    if (!erros.isEmpty()) {
      return res.status(400).send({ erros: erros.array() });
    }

    let { name, email, password, role } = req.body;

    let emailExists = await userModels.findEmail(email);

    if (emailExists) {
      return res
        .status(406)
        .send({ erros: "The email is already registered!" });
    }

    await userModels.new(name, email, password, role);

    res.status = 200;
    res.send("Create user!");
  }

  validate(method) {
    switch (method) {
      case "createUser": {
        return [
          body("name").exists().withMessage("Name doesn't exists"),
          body("email").exists().isEmail().withMessage("Invalid email"),
          body("password")
            .exists()
            .isLength({ min: 4 })
            .withMessage("Invalid password"),
          body("role")
            .optional()
            .isInt({ min: 0, max: 5 })
            .withMessage("Invalid role"),
        ];
      }
    }
  }
}

module.exports = new UsersController();
