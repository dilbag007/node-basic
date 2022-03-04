'use strict';
var mongoose 			= 	require('mongoose');
const collectionName 	=	'setings';
const modelName 		=	'Setting';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								
							};
													
							
const schemaConfig 		=	{
								collection	: 	collectionName,
								timestamps	: 	timeStampConfig,
								versionKey	:	allowVersionKey
							}							

const modelSchema 		= 	new mongoose.Schema(columns , schemaConfig);

module.exports 			= 	mongoose.model(modelName, modelSchema);
