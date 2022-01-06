/* ------------------- The Request Seeker ------------------- */
/*
     ██╗ ██████╗          ██████╗ ██╗ 
    ██╔╝██╔═══██╗        ██╔═══██╗╚██╗
    ██║ ██║   ██║        ██║   ██║ ██║
    ██║ ██║   ██║        ██║   ██║ ██║
    ╚██╗╚██████╔╝███████╗╚██████╔╝██╔╝
     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝
*/

/** HOW IT IS HELPFUL?

This middleware will help you to log the details of the request that are sent to
the server and also the response that is sent to the client.

  The log will contain details of:
  1. ENDPOINT (aka route)
  2. METHOD (request method)
  3. BODY (payload that is sent in body of the request)
  4. QUERY (parameter that sent in query string)
  5. RESPONSE BODY (the response that is send by that particular route) -- optional
*/

/** HOW TO USE

//::::
 .. - normal code
 -> - code to add
::::

1. Import the middleware
.. var app = express();
-> var requestSeeker = require('request-seeker');

2. use it
-> app.use(function(args){
        requestSeeker(args,<true|false>)
    });
.. app.get('/', (req, res) => {
*/

/* References
1. https://stackoverflow.com/a/62507534
2. https://blog.bitsrc.io/coloring-your-terminal-using-nodejs-eb647d4af2a2
3. https://www.youtube.com/watch?v=1jhdfS1Bwcc
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

function printRequestSeekerBlock(hideLogo, printLog) {

    let paddingPlaceholder = ""
    if (hideLogo) {
        paddingPlaceholder = `

        ━━━━━━━━━ ▼ ━━━━━━━━━
        
        `
    }
    else {
        paddingPlaceholder = `
        ██╗ ██████╗          ██████╗ ██╗ 
       ██╔╝██╔═══██╗        ██╔═══██╗╚██╗
       ██║ ██║   ██║        ██║   ██║ ██║
       ██║ ██║   ██║        ██║   ██║ ██║
       ╚██╗╚██████╔╝███████╗╚██████╔╝██╔╝
        ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝                 
       `
    }

    console.log(paddingPlaceholder)
    printLog()
    console.log("\n" + "==================" + "\n")
}

function requestSeeker(req, res, next, {
    showResponseLog = false,
    hideLogo = false
}) {
    let requestMethod = req.method;
    let endPoint = req.url
    let ogUrl = req.originalUrl;
    let bodyPayload = req.body;
    let queryParam = req.queryParam;

    printRequestSeekerBlock(hideLogo, function () {
        console.log("\n" + "+------- REQUEST LOG -------+" + "\n")
        getColoredKey('red', { key: 'ENDPOINT', value: endPoint });
        getColoredKey('yellow', { key: 'METHOD', value: requestMethod });
        getColoredKey('blue', { key: 'BODY', value: !bodyPayload ? bodyPayload : JSON.stringify(bodyPayload, null, 2) });
        getColoredKey('green', { key: 'QUERY', value: !queryParam ? queryParam : JSON.stringify(queryParam, null, 2) });
    })

    if (showResponseLog) {
        let oldSend = res.send;
        let count = 0;
        res.send = function (data) {
            if (count == 0) {
                printRequestSeekerBlock(hideLogo, function () {
                    console.log("\n" + "+------- RESPONSE LOG -------+" + "\n")
                    getColoredKey('red', { key: 'RESPONSE BODY', value: !data ? data : JSON.stringify(data, null, 2) });
                })
                count++;
            }
            oldSend.apply(res, arguments);
        }
    }
    // the below function is called to continue with next flow
    next();
}

module.exports = requestSeeker;