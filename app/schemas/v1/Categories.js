'use strict';
var mongoose 			= 	require('mongoose');
var uniqueValidator 	= 	require('mongoose-unique-validator');
const collectionName 	=	'categories';
const modelName 		=	'Category';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								name: {
									type: String,
									required: true
								},
								image: {
									type: String,
									required: true
								},
								status: {
									type: String,
									required: true
								},
								description: {
									type: String,
									required: true
								}
							};
													
							
const schemaConfig 		=	{
								collection	: 	collectionName,
								timestamps	: 	timeStampConfig,
								versionKey	:	allowVersionKey
							}


const modelSchema 		= 	new mongoose.Schema(columns , schemaConfig);

modelSchema.plugin(uniqueValidator, { message: '{PATH} is already registered with Spur Experiences.' });

module.exports 			= 	mongoose.model(modelName, modelSchema);
