'use strict';
var config 				= 	require(ConfigPath+'/config');
const ProductModel 		= 	require(config.ModelsPath+'/ProductModel');
const HelperClass 		= 	require(config.LibPath+'/helpers');

module.exports 	=	{
	
	saveProduct: async (data) => {
		return new Promise(async (resolve) => {
			const saveQuery = 	await ProductModel.saveRow(data);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Product created successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},

	updateProduct: async (data) => {
		return new Promise(async (resolve) => {
			var returnOptions 	=	{'new':true};
			var query			=	{'_id':data.id};
			var updateData 		=	{
										'name':data.name,
										'status':data.status,
										'description':data.description,
										'price':data.price,
										'discount':data.discount,
									};
								
			const saveQuery = 	await ProductModel.updateRow(query, updateData, returnOptions);
			//console.log(saveQuery);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Product updated successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},


	deleteProduct: async (data) => {
		return new Promise(async (resolve) => {
			//var returnOptions 	=	{'strict':true};
			var query			=	{'_id':data.id};					
			const saveQuery = 	await ProductModel.deleteRow(query);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Product deleted successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},

	searchProduct: async (data) => {
		return new Promise(async (resolve) => {
			//var returnOptions 	=	{'strict':true};
			var query			=	{'name':data};
			var min				=   {'name': 1};	
			const saveQuery = 	await ProductModel.getSearch(query,min);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Product found successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Product not found please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},
	
}