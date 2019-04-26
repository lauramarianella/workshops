let express = require('express') // 1
let app = express() // 1
let count = 0 // 2

app.get('/count', (req, res) => { // 3
    console.log("I received a request to /count ", count) // 3
    count++ // 4
    res.send("<h1>This page has been visited " + count + " times</h1>") // 4
}) // 3

app.use('/static', express.static(__dirname + '/public')) // 5

app.listen(4000, () => { // 1
    console.log("server started") // 1
}) // 1

/* meta
{
    text: {
    1: `The first thing to do is to import the express library 
    and use it to create a single http server. In general, we only create
    one http server. Our http server will listen on port 4000. The second argument passed
    to the listen function call is a function that gets called once the server has started.`,
    2: `We create a global variable to keep track of the number a user has made a request
    to the /count endpoint`,
    3: `We create the count endpoint. This endpoint waits for HTTP requests with a path of /count.
    The console.log is for debugging purposes`,
    4: `The body of the HTTP response generated by /count is an HTML formatted string
    generated by using the count variable`,
    5: `You don't need to understand the details of this line, but it's important to know what it does.
    It creates two endpoints, one for each file in /public:
- GET endpoint with path /static/index.html
- GET endpoint with path /static/style.css
    `
    }
}
*/