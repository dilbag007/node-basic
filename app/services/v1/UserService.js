'use strict';
var config 				= 	require(ConfigPath+'/config');
const UserModel 		= 	require(config.ModelsPath+'/UserModel');
const UserProfileModel 	= 	require(config.ModelsPath+'/UserProfileModel');
const HelperClass 		= 	require(config.LibPath+'/helpers');
var PasswordService 	= 	require(config.ServicePath+'/PasswordService');
var JwtTokenService 	= 	require(config.ServicePath+'/JwtTokenService');
var UploadService 		= 	require(config.ServicePath+'/UploadService');

module.exports 	=	{

	usersList: async () => {
		return new Promise(async (resolve) => {
			const getQuery = 	await UserModel.getList();
			if(getQuery.status && typeof getQuery.data != "undefined" && getQuery.data){
				if (getQuery.data.length > 0) {
					var response 	=	{'response':true, 'message':'Users available.', 'data':getQuery.data};
				}else{
					var response 	=	{'response':false, 'message':'Users not available.', 'data':getQuery.data};
				}
			}else{
				var response 	=	{'response':false, 'message':'Technical error please try again later', 'data':getQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},
	
	saveUser: async (data) => {
		return new Promise(async (resolve) => {
			const saveQuery = 	await UserModel.saveRow(data);
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
								
			const saveQuery = 	await UserModel.updateRow(query, updateData, returnOptions);
			console.log(saveQuery);
			if(saveQuery.status && typeof saveQuery.data != "undefined"){
				var response 	=	{'response':'success', 'message':'User updated successfully.', 'data':saveQuery.data};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			
			resolve(response);
		});	
		
	},
	
	
	registerUser: async (data) => {
		return new Promise(async (resolve) => {
			var inputData 		=	data;
			var verify_token	=	await HelperClass.generate_random_string(15);
			var saveData 		=	{
										'first_name'	:	inputData.first_name,
										'last_name'		:	inputData.last_name,
										'name'			:	inputData.first_name+' '+inputData.last_name,
										'username'		:	inputData.username,
										'email'			:	inputData.email,
										'verify_token'	:	verify_token,
										'status'		:	1,
										'is_verified'	:	1,
									};
			
			var hashPass 		=	await PasswordService.hashPassword(inputData);
			saveData.password	=	hashPass;
			
			
			var saveQuery 		=	await UserModel.saveRow(saveData);
			
			if(saveQuery.status && typeof saveQuery.data != 'undefined' && saveQuery.data){
				var userData 		=	saveQuery.data;
				var authToken 		=	await JwtTokenService.createToken(userData);
				userData.auth_token =	authToken;
				var response 	=	{'response':'success', 'message':'You have succesfully registered with us please check your email to activate account.', 'data':userData, 'auth_token':authToken};
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
			}
			var response;
			
			resolve(response);
		});	
		
	},
	
	uploadProfileImage: async (req, res, data) => {
		return new Promise(async (resolve) => {
			 
			var user_id 		=	data.user_id;
			
			const userQuery   	=   await UserModel.getRow({'_id':user_id}, {});
			if(userQuery.status && typeof userQuery.data != "undefined" && userQuery.data){
				var userData 		=	userQuery.data;
				
				var fieldName 		=	'image';
				var oldFileName 	=	userData.image;
				var uploadProcess 	=	await UploadService.uploadImage(req, res, fieldName, 'users', oldFileName, true, ['50x50', '100x100']);
				
				var inputData 		=	uploadProcess.form_data;
				
				if(uploadProcess.status){
					var returnOptions 	=	{'new':true};
					var query			=	{'_id':user_id};
					var imageName 		=	uploadProcess.sub_folder+'/'+uploadProcess.file_name;
					var updateData 		=	{'image':imageName};
					const saveQuery 	= 	await UserModel.updateRow(query, updateData, returnOptions);
					if(saveQuery.status && typeof saveQuery.data != "undefined"){
						var response 	=	{'response':'success', 'message':'Profile image uploaded successfully.', 'data':saveQuery.data};
					}else{
						var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
					}
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':{}};
				}
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':{}};
			}
			resolve(response);
		});	
		
	},
	
	uploadCoverImage: async (req, res, data) => {
		return new Promise(async (resolve) => {
			 
			var user_id 		=	data.user_id;
			
			const userQuery   	=   await UserModel.getRow({'_id':user_id}, {});
			if(userQuery.status && typeof userQuery.data != "undefined" && userQuery.data){
				var userData 		=	userQuery.data;
				
				var fieldName 		=	'image';
				var oldFileName 	=	userData.image;
				var uploadProcess 	=	await UploadService.uploadImage(req, res, fieldName, 'users', oldFileName, true, ['50x50', '100x100']);
				
				var inputData 		=	uploadProcess.form_data;
				
				if(uploadProcess.status){
					var returnOptions 	=	{'new':true};
					var query			=	{'_id':user_id};
					var imageName 		=	uploadProcess.sub_folder+'/'+uploadProcess.file_name;
					var updateData 		=	{'cover_image':imageName};
					const saveQuery 	= 	await UserModel.updateRow(query, updateData, returnOptions);
					if(saveQuery.status && typeof saveQuery.data != "undefined"){
						var response 	=	{'response':'success', 'message':'Profile image uploaded successfully.', 'data':saveQuery.data};
					}else{
						var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
					}
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':{}};
				}
			}else{
				var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':{}};
			}
			resolve(response);
		});	
		
	},
	
	
	saveUserProfileData: async (data) => {
		return new Promise(async (resolve) => {
			
			var inputData 	=	data;
			
			delete inputData.user_agent;
			
			const userProfileQuery =   await UserProfileModel.getRow({'user_id':user_id}, {});
			
			if(userQuery.status && typeof userQuery.data != "undefined" && userQuery.data){
				var userData 		=	userQuery.data;
				var query 			=	{'user_id':user_id};
				const saveQuery 	= 	await UserProfileModel.updateRow(query, inputData);
				if(saveQuery.status && typeof saveQuery.data != "undefined"){
					var response 	=	{'response':'success', 'message':'User data successfully.', 'data':saveQuery.data};
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
				}	
			}else{
				var userData 		=	userQuery.data;
				const saveQuery 	= 	await UserProfileModel.saveRow(inputData);
				if(saveQuery.status && typeof saveQuery.data != "undefined"){
					var response 	=	{'response':'success', 'message':'User data successfully.', 'data':saveQuery.data};
				}else{
					var response 	=	{'response':'error', 'message':'Technical error please try again later', 'data':saveQuery.data.errors};
				}
			}
			
			resolve(response);
		});
	},
	
	
	
}