'use strict';
var config 				= 	require(ConfigPath+'/config');
const TestimonialModel 		= 	require(config.ModelsPath+'/TestimonialModel');
const HelperClass 		= 	require(config.LibPath+'/helpers');
const UploadService     =  require(config.ServicePath+'/UploadService.js');

module.exports 	=	{

	   getTestimonials: async () => {
		return new Promise(async (resolve) => {
			const testimonialQuery   	=   await TestimonialModel.getList();
			if(testimonialQuery.status && typeof testimonialQuery.data != "undefined" && testimonialQuery.data){
				if (testimonialQuery.data.length > 0) {
					var response 	=	{'response':'success', 'message':'Testimonials available.', 'data':testimonialQuery.data};
				}else{
					var response 	=	{'response':'error', 'message':'Testimonials not available.', 'data':testimonialQuery.data};
				}
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':testimonialQuery.data.errors};
			}			
			resolve(response);
		});	
		
	},

		saveTestimonial: async (req, res, data) => {
		return new Promise(async (resolve) => {	
				var fieldName 		=	'image';
				var uploadProcess 	=	await UploadService.uploadImageNew(req, res, fieldName, 'testimonials', false, ['50x50', '100x100']);
				var inputData 		=	uploadProcess.form_data;
				if(uploadProcess.status){
					var imageName 		=	uploadProcess.sub_folder+'/'+uploadProcess.file_name;
					var formData 		=	{'image':imageName,
											 'name':inputData.name,
											 'username':inputData.username,
											 'status':inputData.status,
											 'description':inputData.description};
					const saveQuery 	= 	await TestimonialModel.saveRow(formData);
					if(saveQuery.status && typeof saveQuery.data != "undefined"){
						var response 	=	{'response':'success', 'message':'Testimonial created successfully.', 'data':saveQuery.data};
					}else{
						var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
					}
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':{}};
				}
			resolve(response);
		});	
		
	},
	updateTestimonial: async (req, res, data) => {
		return new Promise(async (resolve) => {	

				var fieldName 		=	'image';
				var uploadProcess 	=	await UploadService.uploadImageNew(req, res, fieldName, 'testimonials', false, ['50x50', '100x100']);
				var inputData 		=	uploadProcess.form_data;

				var returnOptions 	=	{'new':true};
				var query			=	{'_id':inputData.id};
				var updateData 		=	{'name':inputData.name,
										'username':inputData.username,
										'status':inputData.status,
										'description':inputData.description};

				if(uploadProcess.status){
					var imageName 		=	uploadProcess.sub_folder+'/'+uploadProcess.file_name;
					updateData.image = imageName;
					const testimonialQuery   	=   await TestimonialModel.getRow({'_id':inputData.id});
					if(testimonialQuery.status && typeof testimonialQuery.data != "undefined" && testimonialQuery.data){
						var testimonialData 		=	testimonialQuery.data;
						var oldFileName         =  testimonialData.image;
						var uploadProcess 	=	await UploadService.removeImage('testimonials',oldFileName);
					}
				}

				const saveQuery 	= 	await TestimonialModel.updateRow(query, updateData, returnOptions);
				if(saveQuery.status && typeof saveQuery.data != "undefined"){
					var response 	=	{'response':'success', 'message':'Testimonial updated successfully.', 'data':saveQuery.data};
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
				}
			resolve(response);
		});	
		
	},
	deleteTestimonial: async (data) => {
		return new Promise(async (resolve) => {
			//var returnOptions 	=	{'strict':true};
			var query			=	{'_id':data.id};
			const testimonialQuery   	=   await TestimonialModel.getRow({'_id':data.id});
			if(testimonialQuery.status && typeof testimonialQuery.data != "undefined" && testimonialQuery.data){
				var testimonialData 		=	testimonialQuery.data;
				var oldFileName         =  testimonialData.image;
				var uploadProcess 	=	await UploadService.removeImage('testimonials',oldFileName);
				const saveQuery = 	await TestimonialModel.deleteRow(query);

				if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'Testimonial deleted successfully.', 'data':saveQuery.data};
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
				}
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':testimonialQuery.data};
			}
			
			resolve(response);
		});	
		
	},
	
}