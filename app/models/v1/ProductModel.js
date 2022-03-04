'use strict';
var config 			= 	require(ConfigPath+'/config');
const Products 			= 	require(config.SchemaPath+'/Products');

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
			Products.create(data)
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
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
			Products.findByIdAndUpdate(query, data, returnOptions)
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
	deleteRow:  async (query) => {
		return new Promise((resolve, reject) => {
			Products.findByIdAndDelete(query)
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	},
	getSearch:  async (query,min) => {
		return new Promise((resolve, reject) => {
			Products.find(query,min)
			.then(row => {
				if (row.length > 0) {
					resolve({'status':true, 'data':row});
				}else{
					resolve({'status':false, 'data':row})
				}
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	}	
}
