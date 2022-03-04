var appRoot     			= 	require('app-root-path');

var config 					= 	module.exports = 	{}; 
  
/* App Config Variables Starts */
config.port 				= 	5050;
config.authkey 			    = 	'123456';
config.apiVersion 			=	'v1';
config.DS              		=   '/';
config.APP_NAME   	    	= 	"Spur";
config.currencySymbol   	= 	"$";
config.AppName				=	config.APP_NAME;  
config.AppPath              =   appRoot;

/* App Config Variables Ends */
 
/* Path/Url Variables Starts */
config.ControllersPath      =   appRoot+"/app/controllers"+config.DS+config.apiVersion;
config.ModelsPath      		=   appRoot+"/app/models"+config.DS+config.apiVersion;
config.SchemaPath      		=   appRoot+"/app/schemas"+config.DS+config.apiVersion;
config.MiddlewarePath      	=   appRoot+"/app/middlewares";
config.RoutePath      		=   appRoot+"/app/routes";
config.ConfigPath      		=   appRoot+"/config";
config.ServicePath      	=   appRoot+"/app/services"+config.DS+config.apiVersion;
config.ViewPath      		=   appRoot+"/views"+config.DS+config.apiVersion;
config.LibPath   			=   appRoot+'/lib';
config.template   			=   appRoot+'/resources/views/template.html';
/* Path/Url Variables Ends */

/* Database Config Variables Starts */
config.db 					= 	{};
config.db.connString 		= 	'mongodb://localhost:27017/spur';
/* Database Config Variables Ends */

/* Email Config Variables Starts */
config.email 				= 	{};
/* config.email.host 			= 	'mail.obdemo.com';
config.email.port 			= 	465;
config.email.emailUser		=	'obsmtp@obdemo.com';
config.email.emailPassword	=	'5BoSS8BqKqTx'; */
config.email.host 			= 	'smtp.gmail.com';
config.email.port 			= 	465;
config.email.emailUser		=	'projectdemo2020@gmail.com';
config.email.emailPassword	=	'projectdemo@_1';
config.email.emailService	=	'gmail';
/* Email Config Variables Ends */

/* Email Template Variables Starts */
config.emailTemplateStaticConstants = 	['{AFTER_HEADER}','{BEFORE_FOOTER}','{DEACTIVATE_UNSUBSCRIBE}','{AFTER_FOOTER}'];
/* Email Template Variables Starts */

config.jwt_secret 			= 	'sfsafsdfsdfiuoipsdfsfs46543216458sfsafsdafsadf';


config.upload_path 			= 	'./public/uploads/';