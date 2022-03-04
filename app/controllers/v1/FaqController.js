'use strict'
var config 				= 	require('../../../config/config');
var FaqService 		= 	require(config.ServicePath+'/FaqService.js');
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

	faqList: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var result		=	await FaqService.getList();
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':{}});
			}
		}catch(err){
			res.json({'response':'error','message':'Technical issue please contact service provider.','data':err});
		}
	},
	saveFaq: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await FaqService.saveFaq(post);
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
	updateFaq: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await FaqService.updateFaq(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':validateObj.errors});
			}
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},

	deleteFaq: async (req, res, next)=>{
		try {
			if(req.method == "POST"){
				var post      	=   req.body;
				var result		=	await FaqService.deleteFaq(post);
				res.json(result);
			}else{
				res.json({'response':'error','message':'Something wrong.','data':{}});
			}
		}catch(err){
			res.json({'response':'error','message':'Technical issue please contact service provider.','data':err});
		}
	},
}