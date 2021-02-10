const knex = require("../database/connection");
const UserModels = require("./UserModels");

class PasswordToken {
  async createToken(email) {
    let user = await UserModels.findByEmail(email);

    if (user.res === undefined)
      return { status: false, res: "The email does not exist!" };

    try {
      let token = Date.now();

      await knex
        .insert({ user_id: user.res.id, used: 0, token })
        .table("passwordtokens");

      return { status: true, res: token };
    } catch (error) {
      // console.log(error);
      return { status: false, res: error };
    }
  }

  async validateToken(token) {
    try {
      let result = await knex.select().where({ token }).table("passwordtokens");

      if (result.length === 0) return { status: false, res: "" };

      let tk = result[0];
      if (tk.used) return { status: false, res: ""};
      
      return { status: true, res: tk };
    } catch (error) {
      // console.log(error);
      return { status: false, res: error };
    }
  }

  async setUsed(token) {
    try {
      await knex.update({ used: 1 }).where({ token:token }).table("passwordtokens");
      return { status: true, res: "" };
    } catch (error) {
      console.log(error);
      return { status: false, res: error };
    }
  }
}

module.exports = new PasswordToken();
///uuid
