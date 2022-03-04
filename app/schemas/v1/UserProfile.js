'use strict';
var mongoose 			= 	require('mongoose');
var uniqueValidator 	= 	require('mongoose-unique-validator');
const collectionName 	=	'user_profile';
const modelName 		=	'UserProfile';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;


const columns 			=	{
								user_id:{
									type: Number,
									unique: true
								},
								company_name:{type: String},
								latitude:{type: String},
								longitude:{type: String},
								longitude:{type: String},
								facebook_id:{type: String},
								linkedin_id:{type: String},
								instagram_id:{type: String},
							};
													
							
const schemaConfig 		=	{
								collection	: 	collectionName,
								timestamps	: 	timeStampConfig,
								versionKey	:	allowVersionKey
							}							

const modelSchema 		= 	new mongoose.Schema(columns , schemaConfig);

modelSchema.plugin(uniqueValidator, { message: '{PATH} is already registered with Spur Experiences.' });

module.exports 			= 	mongoose.model(modelName, modelSchema);
