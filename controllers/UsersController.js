const { body, validationResult } = require("express-validator");

const userModels = require("../models/User");
class UsersController {
  async findAllUser(req, res) {
    let users = await userModels.findAll();
    res.status(200);
    res.json(users);
  }

  async findUserId(req, res) {
    let user = await userModels.findAllId(req.params.id);
    if (user === undefined) {
      res.status(400);
      res.json({});
    } else {
      res.status(200);
      res.json(user);
    }
  }

  // async findUserName(req, res) {
  //   let user = await userModels.findAllName(req.params.id);
  //   if (user === undefined) {
  //     res.status(400);
  //     res.json({});
  //   } else {
  //     res.status(200);
  //     res.json(user);
  //   }
  // }

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

    await userModels.newUser(name, email, password, role);

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
