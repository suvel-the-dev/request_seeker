# request-seeker
A express middleware that will help you to log the details of the request that are sent to your express server and also log the response that is sent back to client.

#### HOW IT IS HELPFUL?

This middleware will help you to log the details of the request that are sent to
the server and also the response that is sent to the client.

**The log will contain details of:**
  1. ENDPOINT (aka route)
  2. METHOD (request method)
  3. BODY (payload that is sent in body of the request)
  4. QUERY (parameter that sent in query string)
  5. RESPONSE BODY (the response that is send by that particular route) -- optional

#### API Explanation

| arg no. |   arg   | desc                          | required |
|:-------:|:-------:|-------------------------------|:--------:|
|    1    |   req   |                               |    yes   |
|    2    |   res   |                               |    yes   |
|    3    |   nxt   |                               |    yes   |
|    4    | options | used for customizing the logs |          |

**Options**

| att             | desc                                             | default |
|-----------------|--------------------------------------------------|---------|
| showResponseLog | print the response that is sent to every request | false   |
| hideLogo        | toggle between showing or hiding the logo        | false   |

#### HOW TO USE

```
    .. - normal code
    -> - code to add
```

1. Import the middleware

```
  .. var app = express();
  -> var requestSeeker = require('request-seeker');
```
2. use it

```
app.use((req, res, next) => {
    requestSeeker(req, res, next, { showResponseLog: true, hideLogo: true })
})
  .. app.get('/', (req, res) => {
```

## References
1. [Logging request details](https://stackoverflow.com/a/62507534)
2. [Coloring log](https://blog.bitsrc.io/coloring-your-terminal-using-nodejs-eb647d4af2a2)
3. [Logging response body](https://www.youtube.com/watch?v=1jhdfS1Bwcc)
