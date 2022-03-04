'use strict';
var config 			= 	require(ConfigPath+'/config');
const bcrypt 		= 	require('bcrypt');
const saltRounds 	= 	10;


module.exports 	=	{
	
	hashPassword: async (data) => {
		return new Promise(async (resolve) => {
			//console.log(data);
			bcrypt.hash(data.password, saltRounds).then(function(hash) {
				resolve(hash);
			});
			
		});	
		
	},


	comparePassword: async (data) => {
		return new Promise(async (resolve) => {
			const match = await bcrypt.compare(data.password, data.db_password);

			if(match) {
				var response 	=	{'response':'success', 'message':'Password matched.', 'data':{}};
			}else{
				var response 	=	{'response':'error', 'message':'Password not matched.', 'data':{}};
			}
			
			resolve(response);
		});	
		
	}
	
	
	
}