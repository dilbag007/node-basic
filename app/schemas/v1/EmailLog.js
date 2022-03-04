'use strict';
var mongoose 			= 	require('mongoose');
const collectionName 	=	'email_logs';
const modelName 		=	'EmailLog';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								to_email: {
									type: String,
									required: true
								},
								email_from: {
									type: String,
									required: true
								},
								cc: {
									type: String,
									required: true
								},
								bcc: {
									type: String,
									required: true,
								},
								subject: {
									type: String,
									required: true,
								},
								message: {
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

module.exports 			= 	mongoose.model(modelName, modelSchema);
