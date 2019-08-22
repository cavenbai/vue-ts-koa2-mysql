const query = require('../db')

module.exports = {
  userLogin: function (username) {
    return query('SELECT * FROM help_topic')
  }
}
