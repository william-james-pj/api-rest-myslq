const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class UserModels {
  async findAll() {
    try {
      let result = await knex
        .select(["id", "name", "email", "role"])
        .from("users");

      return { status: true, res: result };
    } catch (error) {
      // console.log(error);
      return { status: false, res: [] };
    }
  }

  async findById(id) {
    try {
      let result = await knex
        .select(["id", "name", "email", "role"])
        .where({ id })
        .from("users");

      if (result.length > 0) return { status: true, res: result[0] };
      else return { status: false, res: undefined };
    } catch (error) {
      // console.log(error);
      return { status: false, res: undefined };
    }
  }

  async findByEmail(email) {
    try {
      let result = await knex.select("*").where({ email }).from("users");

      if (result.length > 0) return { status: true, res: result[0] };
      else return { status: false, res: undefined };
    } catch (error) {
      // console.log(error);
      return { status: false, res: undefined };
    }
  }

  async new(name, email, password, role = 0) {
    try {
      let hash = await bcrypt.hash(password, 10);

      await knex.insert({ name, email, password: hash, role }).table("users");
    } catch (error) {
      // console.log(error);
      return { status: false, res: error };
    }
  }

  async update(id, name, email, role) {
    let usesUpdate = await this.findById(id);
    let editUser = {};

    if (usesUpdate.res === undefined)
      return { status: false, res: "The user does not exist!" };

    if (email !== undefined && email !== usesUpdate.res.email) {
      let res = await this.findByEmail(email);

      if (!res.res) editUser.email = email;
      else return { status: false, res: "Email is already registered" };
    }

    if (name !== undefined) editUser.name = name;

    if (role !== undefined) editUser.role = role;

    try {
      await knex.update(editUser).where({ id: id }).table("users");

      return { status: true, res: "" };
    } catch (error) {
      // console.log(error);
      return { status: false, res: error };
    }
  }

  async delete(id) {
    let usesDelete = await this.findById(id);

    if (usesDelete === undefined)
      return { status: false, res: "The user does not exist!" };

    try {
      await knex.delete().where({ id: id }).table("users");

      return { status: true, res: "" };
    } catch (error) {
      // console.log(error);
      return { status: false, res: error };
    }
  }

  async changePassword(newPassword, id, token) {
    let hash = await bcrypt.hash(newPassword, 10);

    try {
      await PasswordToken.setUsed(token);
      await knex.update({ password: hash }).where({ id }).table("users");
    } catch (error) {
      // console.log(error);
      return { status: false, res: error };
    }
  }
}

module.exports = new UserModels();
