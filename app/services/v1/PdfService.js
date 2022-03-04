'use strict';
var config 			= 	require(ConfigPath+'/config');
const HelperClass 	= 	require(config.LibPath+'/helpers');
const path 			= 	require('path');
var pdf 			= 	require("pdf-creator-node");
const fs 			= 	require('fs');


module.exports 	=	{
	
	createPdf: async (table_detail, path_detail) => {
		return new Promise(async (resolve, reject) => {

			var html = fs.readFileSync(config.template, "utf8");

			var options = {format: "A4"};

			var document = {
			  html: html,
			  data: {
			    lists: table_detail,
			  },
			  path: path_detail,
			  type: "pdf",
			};
		
			pdf
			  .create(document, options)
			  .then((res) => {
			  	resolve({"status":true,"url":path_detail});
			  })
			  .catch((error) => {
			    console.log(error);
			    resolve({"status":false});
			  });
			
								
		});					
	},
}