'use strict';
var config 			= 	require(ConfigPath+'/config');
const UserModel 	= 	require(config.ModelsPath+'/UserModel');
var EmailService 	= 	require(config.ServicePath+'/EmailService');
var JwtTokenService = 	require(config.ServicePath+'/JwtTokenService');
var PasswordService = 	require(config.ServicePath+'/PasswordService');
const HelperClass 	= 	require(config.LibPath+'/helpers');

module.exports 	=	{
	
	login:  async (data) => {
		return new Promise(async (resolve) => {
			
			const userQuery   	=   await UserModel.getRow({'email':data.email}, {});
			//console.log(userQuery);
			if(userQuery.status && typeof userQuery.data != "undefined" && userQuery.data){
				var userData 	=	userQuery.data;
				var comparePass =	await PasswordService.comparePassword({'password':data.password, 'db_password':userData.password});
				if(comparePass.response == 'success'){
					if(userData.is_verified == 1){
						if(userData.status == 1){
							var userData 	=	userQuery.data;
							var authToken 	=	await JwtTokenService.createToken(userData);
							var response 	=	{'response':'success','message':'You have successfully logged in.','data':userData, 'auth_token':authToken};
						}else{
							var response 	=	{'response':'error','message':'You account is not active anymore. Please contact with site administrator','data':{}};
						}
					}else{
						var response 	=	{'response':'error','message':'You account is not verified!','data':{}};
					}
				}else{
					var response 	=	{'response':'error','message':'Invalid login details.','data':{}};
				}
				
				
			}else{
				var response 	=	{'response':'error','message':'There is no user registered with that email or user id address','data':{}};
			} 
			
			resolve(response);
		});	
		
	},
	
	authUser:  async (data) => {
		return new Promise(async (resolve) => {
			
			var inputData 		=	data;
			var user_id 		=	inputData.user_id;
			
			const userQuery   	=   await UserModel.getRow({'_id':user_id}, {});
			//console.log(userQuery);
			if(userQuery.status && typeof userQuery.data != "undefined" && userQuery.data){
				var userData 	=	userQuery.data;
				var authToken 	=	await JwtTokenService.createToken(userData);
				var response 	=	{'response':'success','message':'Auth data found','data':userData, 'auth_token':authToken};
			}else{
				var response 	=	{'response':'error','message':'Auth data not found','data':{}};
			} 
			
			resolve(response);
		});	
		
	},
	
	forgotPassword:  async (data) => {
		return new Promise(async (resolve) => {
			
			const userQuery   	=   await UserModel.getRow({'email':data.email}, {});
			//console.log(userQuery);
			if(userQuery.status && typeof userQuery.data != "undefined" && userQuery.data){
				var userData 				=	userQuery.data;
				
				/** Process for Sending Email Starts **/
				var userImage 				=	'';
				var userCoverImage 			=	'';
				var toEmail 				=	[userData.email];
				var ccArray 				=	[];
				var bccArray 				=	[];
				var attachmentArray			=	[];
				var forceSend 				=	true;
				var includeExtra 			=	true;
				var random_string 			=	HelperClass.generate_random_string(10);
				var link					=	config.SiteUrl+'reset-password/'+random_string;
				var subjectArray 			=	[];
				var bodyArray 				=	[userCoverImage, config.SiteUrl, config.SiteUrl, userData.username, userImage, link];
				var emailSlug 				=	'forgot-password';
				var updateData 				=	{'reset_password_token':random_string};
				var mailSent 				=	await EmailService.mailSend(emailSlug, toEmail, subjectArray, bodyArray, ccArray, bccArray, attachmentArray, forceSend, includeExtra);
				/** Process for Sending Email Ends **/
				if(mailSent){
					var query			=	{'_id':userData['_id']};
					const updateToken 	= 	await UserModel.updateRow(query, updateData);
					if(updateToken.status){
						var response 	=	{'response':'success','message':'Email has been sent to your inbox please check and follow the instruction to reset password.','data':{}};
					}else{
						var response 	=	{'response':'success','message':'Something went wrong please try again later.','data':{}};
					}
				}else{
					var response 	=	{'response':'success','message':'Something went wrong while send email please try again later.','data':{}};
				}
			}else{
				var response 	=	{'response':'error','message':'There is no user registered with that email or user id address','data':{}};
			} 
			
			resolve(response);
		});	
		
	}
}