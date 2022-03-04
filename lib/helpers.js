'use strict';
var config 								= 	require('../config/config.js');
const { base64encode, base64decode } 	= 	require('nodejs-base64');
var fs									=	require("fs");
class Helpers{
	
	generate_random_string  =  function(length)
	{
		var text = "";
		var charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for( var i=0; i < length; i++ )
			text += charset.charAt(Math.floor(Math.random() * charset.length));
		return text;
	}
	
	createFolderUpload 	=	async function(folderPath){
		/* create folder directory */
		var now 			= 	new Date();
		var year 			= 	"" + now.getFullYear();
		var month 			= 	"" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
		var subFolder		=	month+year;
		var uploadFilePath 	= 	folderPath+subFolder+'/';
		
		if(!fs.existsSync(uploadFilePath)) {
			fs.mkdirSync(uploadFilePath);
		}
		/* create folder directory */
		
		return subFolder;
	}


}
module.exports = new Helpers();
