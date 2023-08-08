module.exports = errorHandler = (error, request, response, next) => {
  switch(error.name){
    case "ValidationError":
      return response.status(400).json({ error: error.message })
    case "JsonWebTokenError":
      return response.status(401).json({ error: 'invalid token' })
    case "AuthorizationError":
      return response.status(401).json({ error: error.message })
  }

  console.log(error)
  return response.status(500).json({ error: error.message });
}