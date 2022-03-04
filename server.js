const express       = 	require('express');
const bodyParser    = 	require('body-parser');
var cors            = 	require('cors');
var appRoot     	= 	require('app-root-path');
var multer 			= 	require('multer');
var upload 			= 	multer();
const app 			= 	express();

app.use(cors());
//constants
var config 			= 	require('./config/config');
var dbConnection 	= 	require('./config/db');

//Port
var port 			= 	config.port || 5050;

var socketioJwt 	= 	require('socketio-jwt');
var io	 			= 	require('socket.io').listen(app.listen(port));

//Listen port on socket
console.log('Server is running on : ' + port);

// ** Requires Global Variables Starts (Access can be anywhere) ** //
global.DB                 	=   dbConnection();
global.io 					= 	io;
global.ConfigPath      		=   appRoot+"/config";

require(appRoot+"/config/global")
// ** Requires Global Variables Ends (Access can be anywhere) ** //

app.use(express.static(__dirname + '/public/uploads/'));

app.use(bodyParser.json({limit: "5000mb"}));
//app.use(forms.array());
//app.use(upload.array());
app.use(bodyParser.urlencoded({limit: "5000mb", extended: true, parameterLimit:500000000}));
//API routes
app.use('/', require('./app/routes/approutes'));
