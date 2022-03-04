'use strict';
var config 			= 	require(ConfigPath+'/config');
const Testimonial 	= 	require(config.SchemaPath+'/Testimonials');

module.exports 	=	{
	/**
	* Function for save new row/rows
	*
	* @param data
	* 
	*@return
	*/

	getList:  async () => {
		return new Promise((resolve, reject) => {
			Testimonial.find()
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
			Testimonial.create(data)
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
			Testimonial.findByIdAndUpdate(query, data, returnOptions)
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
			Testimonial.findByIdAndDelete(query)
			.then(row => {
				resolve({'status':true, 'data':row});
			})
			.catch(err => {
				//console.log(err);
				resolve({'status':false, 'data':err});
			});
		});
	},
	getRow:  async (query) => {
		return new Promise((resolve, reject) => {
			Testimonial.findOne(query)
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
