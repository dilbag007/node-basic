'use strict';
var config 			= 	require(ConfigPath+'/config');
var FileService 	= 	require(config.ServicePath+'/FileService');
const HelperClass 	= 	require(config.LibPath+'/helpers');
const path 			= 	require('path');
var multer  		= 	require('multer');
var sharp 			= 	require('sharp');


module.exports 	=	{
	
	setupMulter: async (uploadPath) => {
		return new Promise(async (resolve) => {
			var storage 	=	multer.diskStorage({
									destination: function (req, file, cb) {
									  cb(null, uploadPath)
									},
									filename: function (req, file, cb) {
										var fileName 	=	file.originalname;
										var ext 		=	path.extname(file.originalname);
										fileName 		= 	fileName.replace(/\s+/g, ''); // remove space from name if exits.
										fileName 		=	new Date().getTime().toString()+fileName;  // rename file with timestamp.
									    cb(null, fileName)
									}
								});
			resolve(storage);					
		});					
	},
	
	resizeImage: async (imageName, mainImagePath, uploadPath, resizeArray, oldFileName='') => {
		return new Promise(async (resolve) => {
			var imgResponse 	=	{'resized':false};
			var oldFileNameArr 	= 	oldFileName.split("/");
			for(var resizeItem of resizeArray){
				
				if(typeof oldFileNameArr[1] != "undefined"){
					await FileService.removeFile(uploadPath+resizeItem+'/'+oldFileNameArr[1]); // remove old file if exists.
				}
				
				var resizeArr 	= 	resizeItem.split("x").map(Number);
				var resizePath 	= 	uploadPath+'/'+resizeItem+"/";
				
				await FileService.createDirectory(resizePath); // calls function for create directory.
				sharp(mainImagePath).resize({ height:resizeArr[0], width:resizeArr[1]}).toFile(resizePath+imageName).catch(function(err){
					console.log(mainImagePath);
					console.log(err);
					console.log("Got Error");
					
					imgResponse.resized =	false;
					
				}).then((err,info)=>{
					imgResponse.resized =	true;
				});
			}
			resolve(imgResponse);	
		});					
	},
	
	uploadImage: async (req, res, fieldName, uploadDir, oldFileName='', resize=false, resizeArray=[]) => {
		return new Promise(async (resolve) => {
			var uploadPath 		=	config.upload_path+uploadDir+'/';
			await FileService.createDirectory(uploadPath); // calls function for create directory.
			
			var subFolder		=	await HelperClass.createFolderUpload(uploadPath);
			var mainUploadPath 	=	uploadPath;
			uploadPath			+=	subFolder+'/';
			
			var storage 		=	await module.exports.setupMulter(uploadPath);
			
			var upload 			= 	await multer({storage: storage/* , fileFilter: HelperClass.imageFilter */}).single(fieldName);
				
			upload(req, res,  async  function(err) {
				
				var response	=	{'form_data':req.body};
				
				if(typeof req.file != 'undefined'){
					//console.log(req);
					response.status 	=	true;
					response.message 	=	'Upload Success';
					response.file_name 	=	req.file.filename;
					response.sub_folder =	subFolder;
					response.file_path 	=	req.file.path;
					response.file_data 	=	req.file;
					
					
					//console.log(mainUploadPath+oldFileName);
					await FileService.removeFile(mainUploadPath+oldFileName); // remove old file if exists.
					
					if(resize){
						await module.exports.resizeImage(response.file_name, response.file_path, uploadPath, resizeArray, oldFileName);
					}
					
				}else{
					response.status 	=	false;
					response.message 	=	'Upload Failed';
					response.file_name 	=	'';
					response.sub_folder =	subFolder;
					response.file_path 	=	'';
					response.file_data 	=	{};
				}
				
				resolve(response)		
				
			});
		});	
		
	},
	
	
	uploadBase64Image: async (base64String, uploadDir, oldFileName='', resize=false, resizeArray=[]) => {
		return new Promise(async (resolve) => {
			
			var uploadPath 		=	config.upload_path+uploadDir+'/';
			await FileService.createDirectory(uploadPath); // calls function for create directory.
			
			var subFolder		=	await HelperClass.createFolderUpload(uploadPath);
			var mainUploadPath 	=	uploadPath;
			var randomNumber 	=	Math.floor((Math.random() * 10) + 1);
			var fileName 		=	new Date().getTime().toString()+randomNumber+'.png';  // rename file with timestamp.;
			
			uploadPath			+=	subFolder+'/';
			
			// to convert base64 format into random filename
			base64Image		= 	base64Data.replace(/"/g, '');
			base64Image 	= 	base64Image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
			var response	=	{'form_data':{}};
			fs.writeFile(uploadFilePath, base64Image, 'base64', async (err) => {
				if(err != null){
					console.log(err);
					response.status 	=	false;
					response.message 	=	'Upload Failed';
					response.file_name 	=	'';
					response.sub_folder =	subFolder;
					response.file_path 	=	'';
					response.file_data 	=	{};
				}else{
					response.status 	=	true;
					response.message 	=	'Upload Success';
					response.file_name 	=	req.file.filename;
					response.sub_folder =	subFolder;
					response.file_path 	=	req.file.path;
					response.file_data 	=	req.file;
					
					
					//console.log(mainUploadPath+oldFileName);
					await FileService.removeFile(mainUploadPath+oldFileName); // remove old file if exists.
					
					if(resize){
						await module.exports.resizeImage(response.file_name, response.file_path, uploadPath, resizeArray, oldFileName);
					}
				}
				resolve(response);
			});
		});	
		
	},
	
	
	uploadFile: async (req, res, fieldName, uploadDir, oldFileName='') => {
		return new Promise(async (resolve) => {
			var uploadPath 		=	config.upload_path+uploadDir+'/';
			await FileService.createDirectory(uploadPath); // calls function for create directory.
			
			var subFolder		=	await HelperClass.createFolderUpload(uploadPath);
			var mainUploadPath 	=	uploadPath;
			uploadPath			+=	subFolder+'/';
			
			var storage 		=	await module.exports.setupMulter(uploadPath);
			
			var upload 			= 	await multer({storage: storage/* , fileFilter: HelperClass.imageFilter */}).single(fieldName);
				
			upload(req, res,  async  function(err) {
				
				var response	=	{'form_data':req.body};
				
				if(typeof req.file != 'undefined'){
					//console.log(req.file);
					response.status 	=	true;
					response.message 	=	'Upload Success';
					response.file_name 	=	req.file.filename;
					response.sub_folder =	subFolder;
					response.file_path 	=	req.file.path;
					response.file_data 	=	req.file;
					
					
					//console.log(mainUploadPath+oldFileName);
					await FileService.removeFile(mainUploadPath+oldFileName); // remove old file if exists.
					
				}else{
					response.status 	=	false;
					response.message 	=	'Upload Failed';
					response.file_name 	=	'';
					response.sub_folder =	subFolder;
					response.file_path 	=	'';
					response.file_data 	=	{};
				}
				
				resolve(response)		
				
			});
		});	
		
	},
	
	uploadVideo: async (req, res, fieldName, uploadDir, oldFileName='', convert=false) => {
		return new Promise(async (resolve) => {
			var uploadPath 		=	config.upload_path+uploadDir+'/';
			await FileService.createDirectory(uploadPath); // calls function for create directory.
			
			var subFolder		=	await HelperClass.createFolderUpload(uploadPath);
			var mainUploadPath 	=	uploadPath;
			uploadPath			+=	subFolder+'/';
			
			var storage 		=	await module.exports.setupMulter(uploadPath);
			
			var upload 			= 	await multer({storage: storage/* , fileFilter: HelperClass.imageFilter */}).single(fieldName);
				
			upload(req, res,  async  function(err) {
				
				var response	=	{'form_data':req.body};
				
				if(typeof req.file != 'undefined'){
					//console.log(req.file);
					response.status 	=	true;
					response.message 	=	'Upload Success';
					response.file_name 	=	req.file.filename;
					response.sub_folder =	subFolder;
					response.file_path 	=	req.file.path;
					response.file_data 	=	req.file;
					
					
					//console.log(mainUploadPath+oldFileName);
					await FileService.removeFile(mainUploadPath+oldFileName); // remove old file if exists.
					
					if(convert){
						// Video convert process.
					}
					
				}else{
					response.status 	=	false;
					response.message 	=	'Upload Failed';
					response.file_name 	=	'';
					response.sub_folder =	subFolder;
					response.file_path 	=	'';
					response.file_data 	=	{};
				}
				
				resolve(response)		
				
			});
		});
	},
	uploadImageNew: async (req, res, fieldName, uploadDir, resize=false, resizeArray=[]) => {
		return new Promise(async (resolve) => {
			var uploadPath 		=	config.upload_path+uploadDir+'/';
			await FileService.createDirectory(uploadPath); // calls function for create directory.
			
			var subFolder		=	await HelperClass.createFolderUpload(uploadPath);
			var mainUploadPath 	=	uploadPath;
			uploadPath			+=	subFolder+'/';
			
			var storage 		=	await module.exports.setupMulter(uploadPath);
			
			var upload 			= 	await multer({storage: storage/* , fileFilter: HelperClass.imageFilter */}).single(fieldName);
				
			upload(req, res,  async  function(err) {
				
				var response	=	{'form_data':req.body};
				
				if(typeof req.file != 'undefined'){
					//console.log(req);
					response.status 	=	true;
					response.message 	=	'Upload Success';
					response.file_name 	=	req.file.filename;
					response.sub_folder =	subFolder;
					response.file_path 	=	req.file.path;
					response.file_data 	=	req.file;
										
					if(resize){
						await module.exports.resizeImage(response.file_name, response.file_path, uploadPath, resizeArray, oldFileName);
					}
					
				}else{
					response.status 	=	false;
					response.message 	=	'Upload Failed';
					response.file_name 	=	'';
					response.sub_folder =	subFolder;
					response.file_path 	=	'';
					response.file_data 	=	{};
				}
				
				resolve(response)		
				
			});
		});	
		
	},
	removeImage: async (uploadDir, oldFileName) => {
		return new Promise(async (resolve) => {
			var uploadPath 		=	config.upload_path+uploadDir+'/';
			var mainUploadPath 	=	uploadPath;
			await FileService.removeFile(mainUploadPath+oldFileName); // remove old file if exists.
			resolve({"status":true})		
		});	
		
	},
}