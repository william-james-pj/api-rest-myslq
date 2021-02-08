const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {
  async findAll() {
    try {
      let result = await knex
        .select(["id", "name", "email", "role"])
        .from("users");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    try {
      let result = await knex
        .select(["id", "name", "email", "role"])
        .where({ id })
        .from("users");
      if (result.length > 0) return result[0];
      else return undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async new(name, email, password, role = 0) {
    try {
      let hash = await bcrypt.hash(password, 10);
      await knex.insert({ name, email, password: hash, role }).table("users");
    } catch (error) {
      console.log(error);
      return { status: false, err: error };
    }
  }

  async findEmail(email) {
    try {
      let result = await knex.select("*").from("users").where({ email });
      if (result.length > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return { status: false, err: error };
    }
  }

  async update(id, name, email, role) {
    let usesUpdate = await this.findById(id);
    let editUser = {};

    if (usesUpdate === undefined)
      return { status: false, err: "The user does not exist!" };
    if (email !== undefined && email !== usesUpdate.email) {
      let res = await this.findEmail(email);
      if (!res) editUser.email = email;
      else return { status: false, err: "Email is already registered" };
    }

    if (name !== undefined) editUser.name = name;

    if (role !== undefined) editUser.role = role;

    try {
      console.log(editUser);
      await knex.update(editUser).where({ id: id }).table("users");
      return { status: true };
    } catch (error) {
      console.log(error);
      return { status: false, err: error };
    }
  }

  async delete(id) {
    let usesDelete = await this.findById(id);
    if (usesDelete === undefined)
      return { status: false, err: "The user does not exist!" };
      try {
        await knex.delete().where({ id: id }).table("users");     
        return { status: true};   
      } catch (error) {
        console.log(error);
        return { status: false, err: error };
      }
  }
}

module.exports = new User();
