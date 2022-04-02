const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Get authorization header from request
    const authHeader = req.headers['authorization'];
    if(authHeader != null){
        try {
            // Extract token string from Authorization:Bearer {token}
            const bearerToken = authHeader.split(" ")[1];
            // Decode token
            req.tokenData = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
        } catch (err) {
            return res.status(403).send({
               'message': 'Invalid authorization token' 
            });
        }
    } else {
        return res.status(403).send({
            'message': 'Authorization required'
        });
    }
    // If no errors, continue to target route normally with token data included
    return next();
}

module.exports = verifyToken;