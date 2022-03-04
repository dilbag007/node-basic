'use strict'
var config 				= 	require('../../../config/config');
var AuthService 		= 	require(config.ServicePath+'/AuthService.js');
const HelperClass 		= 	require(config.LibPath+'/helpers');

const { Validator } 	= 	require('node-input-validator');


module.exports	=	{
	/**
	* Function for login.
	*
	* @param email/username, password
	* 
	*@return Response.
	*/
	login: async (req, res, next)=>{
		try {
			var post      	=   req.body;
			var result 		=	await AuthService.login(post);
			res.json(result);
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
	/**
	* Function for get Auth User Data.
	*
	* @param 
	* 
	*@return Response.
	*/
	authUser: async (req, res, next)=>{
		try {
			var post      	=   req.body;
			post.user_id 	=	req.jwt.user_id;
			var result 		=	await AuthService.authUser(post);
			res.json(result);
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
	/**
	* Function for request for new password.
	*
	* @param email/username
	* 
	*@return Response.
	*/
	forgotPassword: async (req, res, next)=>{
		try {
			var post      	=   req.body;
			var result 		=	await AuthService.forgotPassword(post);
			res.json(result);
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
}