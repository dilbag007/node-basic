'use strict';
var config 			= 	require(ConfigPath+'/config');
const EmailTemplate = 	require(config.SchemaPath+'/EmailTemplate');

module.exports 	=	{
	/**
	*  for save new row/rows
	*
	* @param data
	* 
	*@return
	*/
	saveRow:  async (data) => {
		return new Promise((resolve, reject) => {
			EmailTemplate.create(data)
			.then(row => {
				//console.log(row);
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	},

	/**
	*  for update row
	*
	* @param query, updateData, return options.
	* 
	*@return
	*/
	updateRow:  async (query, data, returnOptions) => {
		return new Promise((resolve, reject) => {
			EmailTemplate.findOneAndUpdate(query, data, returnOptions)
			.then(row => {
				//console.log(row);
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	},

	/**
	*  for get row
	*
	* @param query, return options.
	* 
	*@return
	*/
	getRow:  async (query, returnOptions) => {
		return new Promise((resolve, reject) => {
			
			EmailTemplate.findOne(query, returnOptions)
			.then(row => {
				//console.log(row);
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	}	
}
