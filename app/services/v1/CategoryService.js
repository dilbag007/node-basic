'use strict';
var config 				= 	require(ConfigPath+'/config');
const CategoryModel 		= 	require(config.ModelsPath+'/CategoryModel');
const HelperClass 		= 	require(config.LibPath+'/helpers');
const UploadService     =  require(config.ServicePath+'/UploadService.js');

module.exports 	=	{

		saveCategory: async (req, res, data) => {
		return new Promise(async (resolve) => {	
				var fieldName 		=	'image';
				var uploadProcess 	=	await UploadService.uploadImageNew(req, res, fieldName, 'category', false, ['50x50', '100x100']);
				var inputData 		=	uploadProcess.form_data;
			
				if(uploadProcess.status){
					var imageName 		=	uploadProcess.sub_folder+'/'+uploadProcess.file_name;
					var formData 		=	{'image':imageName,
											 'name':inputData.name,
											 'status':inputData.status,
											 'description':inputData.description};
					const saveQuery 	= 	await CategoryModel.saveRow(formData);
					if(saveQuery.status && typeof saveQuery.data != "undefined"){
						var response 	=	{'response':'success', 'message':'Category created successfully.', 'data':saveQuery.data};
					}else{
						var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
					}
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':{}};
				}
			resolve(response);
		});	
		
	},
	updateCategory: async (req, res, data) => {
		return new Promise(async (resolve) => {	

				var fieldName 		=	'image';
				var oldFileName 	=	"";
				var uploadProcess 	=	await UploadService.uploadImage(req, res, fieldName, 'category', oldFileName, false, ['50x50', '100x100']);
				var inputData 		=	uploadProcess.form_data;

				var returnOptions 	=	{'new':true};
				var query			=	{'_id':inputData.id};
				var updateData 		=	{'name':inputData.name,
										'status':inputData.status,
										'description':inputData.description};

				if(uploadProcess.status){
					var imageName 		=	uploadProcess.sub_folder+'/'+uploadProcess.file_name;
					updateData.image = imageName;
					const categoryQuery   	=   await CategoryModel.getRow({'_id':inputData.id});
					if(categoryQuery.status && typeof categoryQuery.data != "undefined" && categoryQuery.data){
						var categoryData 		=	categoryQuery.data;
						var oldFileName         =  categoryData.image;
						var uploadProcess 	=	await UploadService.removeImage('category',oldFileName);
					}
				}

				const saveQuery 	= 	await CategoryModel.updateRow(query, updateData, returnOptions);
				if(saveQuery.status && typeof saveQuery.data != "undefined"){
					var response 	=	{'response':'success', 'message':'Category updated successfully.', 'data':saveQuery.data};
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
				}
			resolve(response);
		});	
		
	},
	deleteCategory: async (data) => {
		return new Promise(async (resolve) => {
			//var returnOptions 	=	{'strict':true};
			var query			=	{'_id':data.id};
			const categoryQuery   	=   await CategoryModel.getRow({'_id':data.id});
			if(categoryQuery.status && typeof categoryQuery.data != "undefined" && categoryQuery.data){
				var categoryData 		=	categoryQuery.data;
				var oldFileName         =  categoryData.image;
				var uploadProcess 	=	await UploadService.removeImage('category',oldFileName);
				const saveQuery = 	await CategoryModel.deleteRow(query);

				if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Category deleted successfully.', 'data':saveQuery.data};
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
				}
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':categoryQuery.data};
			}
			
			resolve(response);
		});	
		
	},
	
}