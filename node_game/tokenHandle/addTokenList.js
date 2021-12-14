var jwt = require('jsonwebtoken');

module.exports = function (name,type) {
  const token = jwt.sign(
    {
      name:name,
      type:type
    },
    'secret',
    {
      expiresIn: '99000s'
    }
  );
  return token;
};
