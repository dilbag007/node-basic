'use strict';
var config 			= 	require(ConfigPath+'/config');
const User 			= 	require(config.SchemaPath+'/User');

module.exports 	=	{
	/**
	* Function for save new row/rows
	*
	* @param data
	* 
	*@return
	*/
	saveRow: async (data) => {
		return new Promise((resolve, reject) => {
			User.create(data)
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
	* Function for update row
	*
	* @param query, updateData, return options.
	* 
	*@return
	*/
	updateRow: async (query, data, returnOptions) => {
		return new Promise((resolve, reject) => {
			User.findOneAndUpdate(query, data, returnOptions)
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
	* Function for get row
	*
	* @param query, return options.
	* 
	*@return
	*/
	getRow:  async (query, returnOptions) => {
		return new Promise((resolve, reject) => {
			User.findOne(query, returnOptions)
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	},	


	getList:  async () => {
		return new Promise((resolve, reject) => {
			User.find().lean()
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	}	
}
