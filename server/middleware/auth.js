const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
      return res.status(401).send({
          errorCode: 1,
          message: "Access token expired"
    });
    }
    return res.sendStatus(401).send({
        errorCode: 2,
        message: "Invalid token"
    });
  }

const verifyToken = (req, res, next) => {
    // Get authorization header from request
    const authHeader = req.headers['authorization'];
    if(authHeader != null){
        try {
            // Extract token string from Authorization:Bearer {token}
            const bearerToken = authHeader.split(" ")[1];
            // Decode token
            jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return catchError(err, res);
                }
                req.tokenData = decoded;
                next();
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        return res.status(401).send({
            'errorCode': 3,
            'message': 'Authorization missing'
        });
    }
}

module.exports = verifyToken;