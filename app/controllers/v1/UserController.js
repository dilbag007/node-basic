'use strict'
var config 				= 	require('../../../config/config');
var UserService 		= 	require(config.ServicePath+'/UserService.js');
var PdfService          =   require(config.ServicePath+'/PdfService.js');
var ExcelService          =   require(config.ServicePath+'/ExcelService.js');
var EmailService          =   require(config.ServicePath+'/EmailService.js');
const HelperClass 		= 	require(config.LibPath+'/helpers');

const { Validator } 	= 	require('node-input-validator');

module.exports	=	{
	
	/**
	* Function for Get Users Data.
	*
	* @param search
	* 
	*@return Response.
	*/
	userList: async (req, res, next)=>{
		try {
			var post      	=   req.body;
			res.json({'response':'success','message':'Success','data':{}});
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},


	userListDownload: async (req, res, next)=>{
		try {
			var result		=	await UserService.usersList();
			if (result.response) {
				var pdfcreator	=   await PdfService.createPdf(result.data, "./userlist.pdf");
				if (pdfcreator.status) { 
					res.download(pdfcreator.url);
				}else{
					res.json({'status':'error','message':'Something worng.','data':{}});
				}
			}else{
				res.json({'status':'error','message':'Data Not available.','data':{}});
			}
		}catch(err){
			res.json({'status':'error','message':'Technical error please contact service provider.','data':err});
		}
	},

	userListExcel: async (req, res, next)=>{
		try {
			var result		=	await UserService.usersList();
			if (result.response) {
				var excelcreator	=   await ExcelService.createFile(result.data);
				if (excelcreator.status) { 
					res.download(excelcreator.url);
				}else{
					res.json({'status':'error','message':'Something worng.','data':{}});
				}
			}else{
				res.json({'status':'error','message':'Data Not available.','data':{}});
			}
		}catch(err){
			console.log(err);
			res.json({'status':'error','message':'Technical error please contact service provider.','data':err});
		}
	},

	userListSend: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await UserService.usersList();
				if (result.response) {
					var pdfcreator	=   await PdfService.createPdf(result.data, "./userlist.pdf");
					var excelcreator	=   await ExcelService.createFile(result.data);
					if (excelcreator.status && pdfcreator.status) { 
					    var emailId = [post.email];	
					    var subject = "user list";
					    var message = "User list attached with this mail.";
					    var attachmentArray = [{
            				path: pdfcreator.url
					    },
					    {
            				path: excelcreator.url
					    }];				
						var emailSend = await EmailService.sendmail(emailId, subject, message, [], [], attachmentArray);
						res.json(emailSend);
					}else{
						res.json({'status':'error','message':'Something worng.','data':{}});
					}
				}else{
					res.json({'status':'error','message':'Data Not available.','data':{}});
				}
			}else{
				res.json({'response':'error','message':'Something worng.','data':{}});
			}
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	 

	/**
	* Function create user.
	*
	* @param email, username, password, first_name, last_name
	* 
	*@return json response  
	*/
	saveUser: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await UserService.saveUser(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Please fill all the required fields.','data':{}});
			}
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},

	/**
	* Function update user.
	*
	* @param email, username, password, first_name, last_name
	* 
	*@return json response  
	*/
	updateUser: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await UserService.updateUser(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Please fill all the required fields.','data':validateObj.errors});
			}
		}catch(err){
			console.log(err);
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
	/**
	* Function for check username exists or not.
	*
	* @param username
	* 
	*@return json response  
	*/
	checkUsername: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await UserService.checkUsername(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Please fill all the required fields.','data':validateObj.errors});
			}
		}catch(err){
			console.log(err);
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
	/**
	* Function for check email exists or not.
	*
	* @param email
	* 
	*@return json response  
	*/
	checkEmail: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await UserService.checkEmail(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Please fill all the required fields.','data':validateObj.errors});
			}
		}catch(err){
			console.log(err);
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	}
}