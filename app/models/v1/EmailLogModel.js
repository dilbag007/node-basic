'use strict';
var config 		= 	require(ConfigPath+'/config');
const EmailLog  = 	require(config.SchemaPath+'/EmailLog');

module.exports 	=	{
	
	/**
	* Function for save new row/rows
	*
	* @param data
	* 
	*@return
	*/
	saveRow:  async (data) => {
		return new Promise((resolve, reject) => {
			EmailLog.create(data)
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
	updateRow:  async (query, data, returnOptions) => {
		return new Promise((resolve, reject) => {
			EmailLog.findOneAndUpdate(query, data, returnOptions)
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
