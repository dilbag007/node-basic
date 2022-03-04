'use strict'
var config 				= 	require('../../../config/config');
var CategoryService 		= 	require(config.ServicePath+'/CategoryService.js');
const HelperClass 		= 	require(config.LibPath+'/helpers');

const { Validator } 	= 	require('node-input-validator');


module.exports	=	{

	/**
	* Function create user.
	*
	* @param email, username, password, first_name, last_name
	* 
	*@return json response  
	*/
	addCategory: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result 		=	await CategoryService.saveCategory(req, res, post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':{}});
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
	updateCategory: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await CategoryService.updateCategory(req, res, post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':validateObj.errors});
			}
		}catch(err){
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
	deleteCategory: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await CategoryService.deleteCategory(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':validateObj.errors});
			}
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	}
}