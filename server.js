var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var db = require('./config/database')(config);
var app = require('./config/express')(config, db);
require('./config/passport')(app);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server is running in port localhost:%d', app.get('port'));
});
