'use strict';
var config 				= 	require(ConfigPath+'/config');
const SalaryModel 		= 	require(config.ModelsPath+'/SalaryModel');
const HelperClass 		= 	require(config.LibPath+'/helpers');

module.exports 	=	{
	
	saveUser: async (data) => {
		return new Promise(async (resolve) => {
			const saveQuery = 	await SalaryModel.saveRow(data);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'User saved successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},

	getUser: async () => {
		return new Promise(async (resolve) => {
			const saveQuery = 	await SalaryModel.getList();
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'User saved successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},


	updateUser: async (data) => {
		return new Promise(async (resolve) => {
			var returnOptions 	=	{'new':true};
			var query			=	{'_id':data.id};
			var updateData 		=	{
										'first_name':data.first_name,
										'last_name':data.last_name,
										'username':data.username,
										'email':data.email,
										'password':data.password,
									};
								
			const saveQuery = 	await SalaryModel.updateRow(query, updateData, returnOptions);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'User updated successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},

	
	
	
}