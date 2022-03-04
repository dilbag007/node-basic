'use strict';
var mongoose 			= 	require('mongoose');
var uniqueValidator 	= 	require('mongoose-unique-validator');
const collectionName 	=	'email_templates';
const modelName 		=	'EmailTemplate';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								name: {
									type: String,
									required: true
								},
								subject: {
									type: String,
									required: true
								},
								slug: {
									type: String,
									required: true,
									unique: true
								},
								body: {
									type: String,
									required: true,
								},
								status: {
									type: String,
								},
							};
													
							
const schemaConfig 		=	{
								collection	: 	collectionName,
								timestamps	: 	timeStampConfig,
								versionKey	:	allowVersionKey
							}							

const modelSchema 		= 	new mongoose.Schema(columns , schemaConfig);

modelSchema.plugin(uniqueValidator, { message: '{PATH} is already found.' });

module.exports 			= 	mongoose.model(modelName, modelSchema);
