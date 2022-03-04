'use strict';
var config 			= 	require(ConfigPath+'/config');
const Faq 			= 	require(config.SchemaPath+'/Faqs');

module.exports 	=	{
	/**
	* Function for save new row/rows
	*
	* @param data
	* 
	*@return
	*/

	getList: async () => {
		return new Promise((resolve, reject) => {
			Faq.find()
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				resolve({'status':false, 'data':err});
			});
		});
	},
	
	saveRow: async (data) => {
		return new Promise((resolve, reject) => {
			Faq.create(data)
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
			Faq.findOneAndUpdate(query, data, returnOptions)
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
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
			Faq.findOne(query, returnOptions)
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	},

	deleteRow: async (query) => {
		return new Promise((resolve, reject) => {
			Faq.findByIdAndDelete(query)
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				resolve({'status':false, 'data':err});
			});
		});
	},	
}
