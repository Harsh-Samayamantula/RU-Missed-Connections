var express = require('express');
var bodyParser = require('body-parser')

var authRouter = require('./routes/auth')
var feedRouter = require('./routes/feed')
var chatRouter = require('./routes/chat')

var app = express();
var port = 3000

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api", authRouter);
app.use("/api", feedRouter);
app.use("/api", chatRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.listen(port, () => {
  console.log(`Example app listening on ${port}.`);
})