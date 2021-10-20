# request-seeker
A express middleware that will help you to log the details of the request that are sent to the server.


## HOW IT IS HELPFUL?

This middleware will help you to log the details of the request that are sent to
the server.

### The log will contain details of:
  1. ENDPOINT (aka route)
  2. METHOD (request method)
  3. BODY (payload that is sent in body of the request)
  4. QUERY (parameter that sent in query string)

## HOW TO USE

 .. - normal code
 -> - code to add

1. Import the middleware

    .. var app = express();
    -> var requestSeeker = require('./middleware/request-seeker');

2. use it

    -> app.use(requestSeeker);
    .. app.get('/', (req, res) => {

## References
1. https://stackoverflow.com/a/62507534
2. https://blog.bitsrc.io/coloring-your-terminal-using-nodejs-eb647d4af2a2
