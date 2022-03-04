'use strict';
var mongoose 			= 	require('mongoose');
var uniqueValidator 	= 	require('mongoose-unique-validator');
const collectionName 	=	'faqs';
const modelName 		=	'Faqs';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								question: {
									type: String,
									required: true
								},
								answer: {
									type: String,
									required: true
								},
								status: {
									type: String,
									required: true,
								},
								category_id: {
									type: mongoose.Schema.Types.ObjectId,
									ref: "Categories",
									required: true
								}
							};
													
							
const schemaConfig 		=	{
								collection	: 	collectionName,
								timestamps	: 	timeStampConfig,
								versionKey	:	allowVersionKey
							}							

const modelSchema 		= 	new mongoose.Schema(columns , schemaConfig);

module.exports 			= 	mongoose.model(modelName, modelSchema);
