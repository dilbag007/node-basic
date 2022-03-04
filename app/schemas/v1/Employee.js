'use strict';
var mongoose 			= 	require('mongoose');
const collectionName 	=	'employee';
const modelName 		=	'Employee';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								name: {
									type: Number,
									required: true
								},
								email: {
									type: Number,
									required: true
								},
								salary_id: {
									type: mongoose.Schema.Types.ObjectId,
									ref: "Salary",
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
