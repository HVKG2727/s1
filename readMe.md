## npm init -y 

npm i --save express cors cookie-parser bcryptjs jsonwebtoken mongoose  dotenv express-async-errors helmet http-status-codes joi express-rate-limit rate-limiter swagger-ui-express xss-clean......{Packages}

## bcryptjs:--> 
        Bcrypt is an algorithm that will allow your application to take the user inputted password and convert it into a hash, which can be thought of as a "digital fingerprint." This hash cannot be reversed back into the original password, so upon login, the application must compare hashes to determine if the correct password was given.

## cookie-parser:--> 
    The cookie parser parses cookies and puts the cookie information on req object in the middleware. It will also decrypt signed cookies provided you know the secret. Show activity on this post.
## cors:--->>
    {cross Origin Resource Sharing} CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
## dotenv -->> 
    Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
## express -->>
    Fast, unopinionated, minimalist web framework for node.
## express-async-errors: -->>
    A dead simple ES6 async/await support hack for ExpressJS
    Shamelessly copied from express-yields
    This has been lightly reworked to handle async rather than generators.
## express-rate-limit : -->>
    Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. Plays nice with express-slow-down.
## helmet: -->>
     Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
## joi :--->> 
     The most powerful schema description language and data validator for JavaScript.
## jsonwebtoken: --->>
    An implementation of JSON Web Tokens.
    This was developed against draft-ietf-oauth-json-web-token-08. It makes use of node-jws
## mongoose:-->> 
    Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
## rate-limiter:-->> 
    This is an npm module that will allow you to instantiate a RateLimiter object in your node.js or io.js server. The object exposes the public methods documented below and is designed to be used for rate limiting incoming or outgoing API calls. Rate limiter is designed to be fast and scalable, so it uses a redis database to keep track of per-user and global requests.
    N.B. Rate_Limiter is not yet production-ready. If you would like to help make it production-ready, submit a pull request!
## swagger-ui-express: --->>
    