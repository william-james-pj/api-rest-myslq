const knex = require("../database/connection");
const User = require("./User");

class PasswordToken {
  async createToken(email) {
    let user = await User.findByEmail(email);
    console.log(user);
    if (user === undefined)
      return { status: false, err: "The email does not exist!" };
    try {
      let token = Date.now();
      await knex
        .insert({ user_id: user.id, used: 0, token })
        .table("passwordtokens");
      return { status: true, token };
    } catch (error) {
      console.log(error);
      return { status: false, err: error };
    }
  }

  async validateToken(token) {
    try {
      let result = await knex.select().where({ token }).table("passwordtokens");

      if (result.length === 0) return { status: false };
      let tk = result[0];
      if (tk.used) return { status: false };
      return { status: true, token: tk };
    } catch (error) {
      console.log(error);
      return { status: false, err: error };
    }
  }

  async setUsed(token) {
    try {
      await knex.update({ used: 1 }).where({ token }).table("passwordtokens");
      return { status: true };
    } catch (error) {
      console.log(error);
      return { status: false, err: error };
    }
  }
}

module.exports = new PasswordToken();
///uuid
