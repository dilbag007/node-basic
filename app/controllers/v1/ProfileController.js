'use strict'
var config 				= 	require('../../../config/config');
var AuthService 		= 	require(config.ServicePath+'/AuthService.js');
var UserService 		= 	require(config.ServicePath+'/UserService.js');
const HelperClass 		= 	require(config.LibPath+'/helpers');

const { Validator } 	= 	require('node-input-validator');


module.exports	=	{
	/**
	* Function for upload profile image.
	*
	* @param image
	* 
	*@return Response.
	*/
	uploadProfileImage: async (req, res, next)=>{
		try {
			console.log('Controller');
			var post      	=   req.body;
			post.user_id 	=	req.jwt.user_id;
			var result 		=	await UserService.uploadProfileImage(req, res, post);
			res.json(result);
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
	/**
	* Function for get Auth User Data.
	*
	* @param image
	* 
	*@return Response.
	*/
	uploadCoverImage: async (req, res, next)=>{
		try {
			var post      	=   req.body;
			post.user_id 	=	req.jwt.user_id;
			var result 		=	await UserService.uploadCoverImage(req, res, post);
			res.json(result);
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
	/**
	* Function for update profile
	*
	* @param first_name, last_name, address, phone etc.
	* 
	*@return Response.
	*/
	updateProfile: async (req, res, next)=>{
		try {
			var post      	=   req.body;
			var result 		=	await UserService.updateProfile(post);
			res.json(result);
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
	/**
	* Function for change password	*
	* @param old_password, new_password, confirm_password
	* 
	*@return Response.
	*/
	changePassword: async (req, res, next)=>{
		try {
			var post      	=   req.body;
			var result 		=	await UserService.changePassword(post);
			res.json(result);
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
}