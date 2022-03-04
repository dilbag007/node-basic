'use strict';
var config 					= 	require(ConfigPath+'/config');
const EmailTemplateModel 	= 	require(config.ModelsPath+'/EmailTemplateModel');
var SlugService 			= 	require(config.ServicePath+'/SlugService');
const HelperClass 			= 	require(config.LibPath+'/helpers');

module.exports 	=	{
	
	saveTemplate:  async (data) => {
		return new Promise(async (resolve) => {
			
			var slug 			=	await SlugService.generateSlug({'name':data.name});
			
			var updateData 		=	{
										'name':data.name,
										'subject':data.subject,
										'body':data.body,
										'slug':slug,
										'status':1,
									};
			
			//console.log(data);
			const saveQuery = 	await EmailTemplateModel.saveRow(updateData);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Template saved successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},


	updateTemplate:  async (data) => {
		return new Promise(async (resolve) => {
			
			var returnOptions 	=	{'new':true};
			var query			=	{'_id':data.id};
			var updateData 		=	{
										'name':data.name,
										'subject':data.subject,
										'body':data.body,
										'status':1,
									};
								
			const saveQuery = 	await EmailTemplateModel.updateRow(query, updateData, returnOptions);
			console.log(saveQuery);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Template updated successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	}	
}