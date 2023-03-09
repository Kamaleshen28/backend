const axios = require('axios')

const validateJWT = async (req, res, next) => {
  try{
    console.log("REQQQ: ", req.body)
    console.log("REQQQ: ", req.headers.token)
    var data = '';

    const response = await axios.post(
      'http://localhost:7000/validate/token',
      { data },
      { 
        headers: { 
          'token': req.headers.token
        }      }
    );
    console.log("RESPONSE CAME BRO", response.data.message)

        next()
  }catch(error){

  }
}

module.exports = {validateJWT}
