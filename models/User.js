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

  async findAllId(id) {
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

  // async findAllName(name) {
  //   try {
  //     let result = await knex
  //       .select(["id", "name", "email", "role"])
  //       .where({ name })
  //       .from("users");
  //     if (result.length > 0) return result[0];
  //     else return undefined;
  //   } catch (error) {
  //     console.log(error);
  //     return undefined;
  //   }
  // }

  async newUser(name, email, password, role = 0) {
    try {
      let hash = await bcrypt.hash(password, 10);
      await knex.insert({ name, email, password: hash, role }).table("users");
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findEmail(email) {
    try {
      let result = await knex.select("*").from("users").where({ email });
      if (result.length > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = new User();
