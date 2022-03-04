'use strict'
var config 				= 	require('../../../config/config');
var EmailTemplateService= 	require(config.ServicePath+'/EmailTemplateService.js');
const HelperClass 		= 	require(config.LibPath+'/helpers');

const { Validator } 	= 	require('node-input-validator');


module.exports 	=	{
	/**
	* Function for Get listing.
	*
	* @param search
	* 
	* @return Response.
	*/
	index: async (req, res, next)=>{
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
	* @return json response  
	*/
	saveTemplate: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await EmailTemplateService.saveTemplate(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Please fill all the required fields.','data':{}});
			}
		}catch(err){
			console.log(err);
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},

	/**
	* Function update user.
	*
	* @param email, username, password, first_name, last_name
	* 
	* @return json response  
	*/
	updateTemplate: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await EmailTemplateService.updateUser(post);
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