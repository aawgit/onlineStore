var app = require('./app');
const path = require("path");
var port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});