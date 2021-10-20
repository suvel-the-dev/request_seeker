/* ------------------- The Request Seeker (O_O) ------------------- */

/** HOW IT IS HELPFUL?

This middleware will help you to log the details of the request that are sent to
the server.

  The log will contain details of:
  1. ENDPOINT (aka route)
  2. METHOD (request method)
  3. BODY (payload that is sent in body of the request)
  4. QUERY (parameter that sent in query string)
*/

/** HOW TO USE

//::::
 .. - normal code
 -> - code to add
::::

1. Import the middleware
.. var app = express();
-> var requestSeeker = require('./middleware/requestSeeker');

2. use it
-> app.use(requestSeeker);
.. app.get('/', (req, res) => {
*/

/* References
1. https://stackoverflow.com/a/62507534
2. https://blog.bitsrc.io/coloring-your-terminal-using-nodejs-eb647d4af2a2
*/

function getColoredKey(color, { key, value }) {
    let colorCode = undefined;
    const defaultColorCode = `\x1b[37m%s\x1b[89m`;

    switch (color) {
        case 'red': {
            colorCode = `\x1b[31m%s\x1b[89m`
            break;
        }
        case 'yellow': {
            colorCode = `\x1b[33m%s\x1b[89m`
            break;
        }
        case 'blue': {
            colorCode = `\x1b[34m%s\x1b[89m`
            break;
        }
        case 'green': {
            colorCode = `\x1b[32m%s\x1b[89m`
            break;
        }
        default: colorCode = defaultColorCode;
    }
    // making the value color to be white
    colorCode = colorCode + ` ` + defaultColorCode;

    console.log(colorCode, key, value)
}

function requestSeeker(req, res, next) {
    let requestMethod = req.method;
    let endPoint = req.url
    let ogUrl = req.originalUrl;
    let bodyPayload = req.body;
    let queryParam = req.queryParam;
    console.log("\n" + "----- request seeker (O_O) --------" + "\n")
    getColoredKey('red', { key: 'ENDPOINT', value: endPoint });
    getColoredKey('yellow', { key: 'METHOD', value: requestMethod });
    getColoredKey('blue', { key: 'BODY', value: !bodyPayload ? bodyPayload : JSON.stringify(bodyPayload, null, 2) });
    getColoredKey('green', { key: 'QUERY', value: !queryParam ? queryParam : JSON.stringify(queryParam, null, 2) });
    console.log("\n" + "-------------" + "\n")
    // the below function is called to continue with next flow
    next();
}

module.exports = requestSeeker;