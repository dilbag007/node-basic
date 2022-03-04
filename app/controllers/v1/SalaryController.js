'use strict'
var config 				= 	require('../../../config/config');
var SalaryService 		= 	require(config.ServicePath+'/SalaryService.js');
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


	/**
	* Function create user.
	*
	* @param email, username, password, first_name, last_name
	* 
	*@return json response  
	*/
	getUser: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await SalaryService.getUser();
				res.json(result);
			}else{
				res.json({'response':'error','message':'Please fill all the required fields.','data':{}});
			}
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},

	saveUser: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await SalaryService.saveUser(post);
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
				var result		=	await SalaryService.updateUser(post);
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
				var result		=	await SalaryService.checkUsername(post);
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
				var result		=	await SalaryService.checkEmail(post);
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