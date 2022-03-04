'use strict';
var config 				= 	require(ConfigPath+'/config');
const FaqModel 		= 	require(config.ModelsPath+'/FaqsModel');
const HelperClass 		= 	require(config.LibPath+'/helpers');

module.exports 	=	{

	getList: async () => {
		return new Promise(async (resolve) => {
			const getQuery = 	await FaqModel.getList();
			if(getQuery.status && typeof getQuery.data != "undefined"){
				if (getQuery.data.length > 0) {
					var response 	=	{'response':'success', 'message':'Faqs available.', 'data':getQuery.data};
				}else{
					var response 	=	{'response':'error', 'message':'Faqs not available.', 'data':getQuery.data};
				}
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':getQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},
	
	saveFaq: async (data) => {
		return new Promise(async (resolve) => {
			const saveQuery = 	await FaqModel.saveRow(data);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Faq saved successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},


	updateFaq: async (data) => {
		return new Promise(async (resolve) => {
			var returnOptions 	=	{'new':true,'runValidators': true};
			var query			=	{'_id':data.id};
			var updateData 		=	{
										'question':data.question,
										'answer':data.answer,
										'status':data.status,
										'category_id':data.category_id,
									};
								
			const saveQuery = 	await FaqModel.updateRow(query, updateData, returnOptions);

			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Faq updated successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},

	deleteFaq: async (data) => {
		return new Promise(async (resolve) => {
			var query			=	data.id;					
			const saveQuery = 	await FaqModel.deleteRow(query);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Faq delete successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},
	
	
}