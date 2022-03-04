'use strict';
var mongoose 			= 	require('mongoose');
var uniqueValidator 	= 	require('mongoose-unique-validator');
const collectionName 	=	'salary';
const modelName 		=	'Salary';
const timeStampConfig 	=	true;
const allowVersionKey 	=	false;

const columns 			=	{
								salary: {
									type: Number,
									required: true
								}
							};
													
							
const schemaConfig 		=	{
								collection	: 	collectionName,
								timestamps	: 	timeStampConfig,
								versionKey	:	allowVersionKey
							}


const modelSchema 		= 	new mongoose.Schema(columns , schemaConfig);

modelSchema.virtual('EmployeeDetail', {
   ref: 'Employee', //The Model to use
   localField: '_id', //Find in Model, where localField 
   foreignField: 'salary_id', // is equal to foreignField
});

modelSchema.set('toObject', { virtuals: true });
modelSchema.set('toJSON', { virtuals: true });

modelSchema.plugin(uniqueValidator, { message: '{PATH} is already registered with Spur Experiences.' });

module.exports 			= 	mongoose.model(modelName, modelSchema);
