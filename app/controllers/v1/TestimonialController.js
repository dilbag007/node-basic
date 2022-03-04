'use strict'
var config 				= 	require('../../../config/config');
var TestimonialService 		= 	require(config.ServicePath+'/TestimonialService.js');
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

	testimonialList: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var result		=	await TestimonialService.getTestimonials();
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':{}});
			}
		}catch(err){
			res.json({'response':'error','message':'Technical issue please contact service provider.','data':err});
		}
	},
	saveTestimonial: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result 		=	await TestimonialService.saveTestimonial(req, res, post);
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
	updateTestimonial: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await TestimonialService.updateTestimonial(req, res, post);
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
	deleteTestimonial: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await TestimonialService.deleteTestimonial(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':validateObj.errors});
			}
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	}
}