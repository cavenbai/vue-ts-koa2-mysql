const query = require('../db')

module.exports = {
  login: function (userInformation) {
    return query(`SELECT * FROM customer WHERE user_name = '${userInformation.username}'`)
  },
  register: function (userInformation) {
    return query(`INSERT INTO customer (user_name,pass_word) VALUES ('${userInformation.username}','${userInformation.password}') `)
  }
}
