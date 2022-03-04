'use strict';
var config 			= 	require(ConfigPath+'/config');
const jwt 			= 	require('jsonwebtoken');


module.exports 	=	{
	
	createToken: async (data) => {
		return new Promise(async (resolve) => {
			let token 					= 	jwt.sign({'user_id':data['_id'], 'data': data},
											config.jwt_secret,
											{ expiresIn: '24h'});
											
			resolve(token);							
			
		});	
		
	}
	
}