const axios = require('axios');
const httpError = require('../utils/httpError');


const validateJWT = async (req, res, next) => {
  try {
    console.log('REQQQ: ', req.body);
    console.log('REQQQ: ', req.headers.token);
    var data = '';

    const response = await axios.post(
      'http://localhost:7000/validate/token',
      { data },
      {
        headers: {
          'token': req.headers.token
        }
      }
    );
    console.log('RESPONSE CAME BRO', response.data.message);
    next();
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { validateJWT };
