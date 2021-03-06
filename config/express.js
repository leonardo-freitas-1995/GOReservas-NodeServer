'use strict'

var express =  require('express')
	, consign	= require('consign')
	, bodyParser =  require('body-parser')
    , logger = require('morgan')
	, cookieParser = require('cookie-parser')
	, session = require('express-session')
	, helmet = require('helmet')
    , passport = require('passport');



//Environment setup

module.exports = function(config, db){

var app = express();
	app.db = db;

		app.set('port',config.port);

		app.use(express.static('./public'));
		app.set('view engine','jade');
		app.set('views','./server/views');
        app.use(logger('dev'));
		app.use(cookieParser());
		app.use(session(
		{
			secret:'$up3r_$3c37',
			resave:true,
			saveUninitialized:true,
			cookie: { maxAge: 60000 }
		}
	));

    app.use(passport.initialize());
    app.use(passport.session());

		app.use(bodyParser.urlencoded({extended:true}));
		app.use(bodyParser.json());
		app.use(require('method-override')());


		app.use(helmet());
		app.use(helmet.xframe());
		app.use(helmet.xssFilter());
		app.use(helmet.nosniff());
		app.disable('x-power-by');
		app.use(helmet.hidePoweredBy({setTo:'PHP 5.5.14'}));




		consign({cwd:'server'})
			.include('models')
			.then('controllers')
			.then('routes')
			.into(app);



 return app;

}
