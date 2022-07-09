const CognitoExpress = require("cognito-express");

//Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
	region: process.env.COGNITO_REGION,
	cognitoUserPoolId: process.env.COGNITO_POOL_ID,
	tokenUse: "access", //Possible Values: access | id
	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});


module.exports.verificationHandler = function(req, res, next) {

    //Get access token from headers
    let accessTokenFromClient = req.headers.token;

	//Fail if token not present in header. 
	if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");

    //Validate token
    cognitoExpress.validate(accessTokenFromClient, function(err, response) {

        //If API is not authenticated, Return 401 with error message. 
        if (err) return res.status(401).send(err);

        //Else API has been authenticated. Proceed.
        res.locals.username = response.username;
        next();
    });
} 
