'use strict';
var config 			= 	require(ConfigPath+'/config');
var fs      		= 	require('fs');


module.exports 	=	{
	
	createDirectory: async (path) => {
		return new Promise(async (resolve) => {
			if(!fs.existsSync(path)) {
				fs.mkdirSync(path);
			}
			resolve(true);
		});	
		
	},
	
	
	removeDirectory: async (path) => {
		return new Promise(async (resolve) => {
			fs.unlink(path, function(err) {
				if(err && err.code == 'ENOENT') {
					// file doens't exist
					console.info("File doesn't exist, won't remove it.");
					resolve(false);
				} else if (err) {
					// other errors, e.g. maybe we don't have enough permission
					resolve(false);
				} else {
					console.info(`removed`);
					resolve(true);
				}
			});
		});	
		
	},
	
	removeFile: async (path) => {
		return new Promise(async (resolve) => {
			fs.unlink(path, function(err) {
				if(err && err.code == 'ENOENT') {
					// file doens't exist
					console.info("File doesn't exist, won't remove it.");
					resolve(false);
				} else if (err) {
					// other errors, e.g. maybe we don't have enough permission
					resolve(false);
				} else {
					console.info(`removed`);
					resolve(true);
				}
			});
		});	
		
	},
}