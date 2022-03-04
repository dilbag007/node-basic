'use strict';
var mongoose 			= 	require('mongoose');
var uniqueValidator 	= 	require('mongoose-unique-validator');
const collectionName 	=	'users';
const modelName 		=	'User';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								username: {
									type: String,
									required: true,
									unique: true
								},
								email: {
									type: String,
									required: true,
									unique: true
								},
								password: {
									type: String,
									required: true,
								},
								first_name: {
									type: String,
									required: true,
								},
								last_name: {
									type: String,
									required: true,
								},
								reset_password_token: {
									type: String
								},
								name:{type: String},
								phone:{type: String},
								image:{type: String},
								cover_image:{type: String},
								verify_token:{type: String},
								is_verified:{type: Number},
								remember_token:{type: String},
								source:{type: String},
								status:{type: Number},
							};
													
							
const schemaConfig 		=	{
								collection	: 	collectionName,
								timestamps	: 	timeStampConfig,
								versionKey	:	allowVersionKey
							}							

const modelSchema 		= 	new mongoose.Schema(columns , schemaConfig);

modelSchema.plugin(uniqueValidator, { message: '{PATH} is already registered with Spur Experiences.' });

module.exports 			= 	mongoose.model(modelName, modelSchema);
