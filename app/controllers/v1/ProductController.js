'use strict'
var config 				= 	require('../../../config/config');
var ProductService 		= 	require(config.ServicePath+'/ProductService.js');
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
	addProduct: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await ProductService.saveProduct(post);
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
	updateProduct: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await ProductService.updateProduct(post);
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
	deleteProduct: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await ProductService.deleteProduct(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':validateObj.errors});
			}
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},

	searchProduct: async (req, res, next)=>{
		try {
			if(req.method == "GET"){
				var post = new RegExp(req.query['name'],'i');
				var result		=	await ProductService.searchProduct(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':validateObj.errors});
			}
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	}
}