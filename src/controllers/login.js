const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const usersHelper = require('../helpers/Users');

router.post('/', async (request, response, next) => {
  const { email, password } = request.body;

  try{
    const user = await _validate(email, password);
  
    const userForToken = {
      email: user.email,
      id: user.ID,
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET);
  
    response
      .status(200)
      .send({ token, email: user.email, name: user.name })
  } catch(error){
    next(error);
  }
})

const _validate = async (email, password) => {
  if(!email || !password){
    throw {
      name: "ValidationError",
      message: "email or password missing"
    }
  }

  const user = await usersHelper.findUser(email);

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if(!(user && passwordCorrect)) {
    throw {
      name: "AuthorizationError",
      message: "invalid email or password"
    }
  }

  return user;
}

module.exports = router;