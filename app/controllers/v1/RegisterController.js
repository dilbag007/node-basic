'use strict'
var config 				= 	require('../../../config/config');
var UserService 		= 	require(config.ServicePath+'/UserService.js');
const HelperClass 		= 	require(config.LibPath+'/helpers');

const { Validator } 	= 	require('node-input-validator');


module.exports	=	{
	/**
	* Function for register user.
	*
	* @param
	* 
	*@return Response.
	*/
	registerUser: async (req, res, next)=>{
		try {
			var post      	=   req.body;
			var result 		=	await UserService.registerUser(post);
			res.json(result);
		}catch(err){
			res.json({'response':'error','message':'Please fill all the required fields.','data':err});
		}
	},
	
}