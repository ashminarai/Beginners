// check if accessToken is valid importing verify

const { verify } = require("jsonwebtoken");

// get the token from the frontend and validate using JWT
// then continue with request.

// next is a function if the req is going to move forward
const validateToken = (req, res, next) => {
    // passing token from frontend to backend using Header
    // must be same as post request made in frontend
    const accessToken = req.header("accessTokenFromFrontend");
    if (!accessToken) return res.json({ error: "User not logged in" });
    try {
        // accessToken and important secret
        const validToken = verify(accessToken, "important");
        if (validToken) {
            req.user = validToken;
            return next();
        }
    } catch (err) {
        res.json({ error: err });
    }
};

module.exports = { validateToken };