'use strict';
var mongoose 			= 	require('mongoose');
var uniqueValidator 	= 	require('mongoose-unique-validator');
const collectionName 	=	'testimonials';
const modelName 		=	'Testimonial';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								name: {
									type: String,
									required: true
								},
								username: {
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
								description: {type: String}
							};
													
							
const schemaConfig 		=	{
								collection	: 	collectionName,
								timestamps	: 	timeStampConfig,
								versionKey	:	allowVersionKey
							}


const modelSchema 		= 	new mongoose.Schema(columns , schemaConfig);

module.exports 			= 	mongoose.model(modelName, modelSchema);
