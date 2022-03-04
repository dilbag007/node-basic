'use strict';
var config 			= 	require(ConfigPath+'/config');
const HelperClass 	= 	require(config.LibPath+'/helpers');
const path 			= 	require('path');
const ExcelJS 			= 	require("exceljs");
const fs 			= 	require('fs');


module.exports 	=	{
	
	createFile: async (table_detail) => {
		return new Promise(async (resolve, reject) => {
			var options = {
			    filename: './user-workbook.xlsx',
			    useStyles: true,
			    useSharedStrings: true
			};

			var workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options);
			const worksheet = workbook.addWorksheet("User");

			worksheet.columns = [
			  { header: 'Id', key: 'id', width: 30 },
			  { header: 'Name', key: 'name', width: 32 },
			  { header: 'UserName', key: 'username', width: 15},
			  { header: 'Email', key: 'email', width: 32}
			];

			table_detail.forEach(d =>{
				worksheet.addRow({id: d._id,
				 name: d.name,
				 username: d.username,
				 email: d.email});
			});

			worksheet.commit();

			workbook.commit().then((res) => {
				resolve({"status":true,"url":"./user-workbook.xlsx"});
			})
			.catch((error) => {
			    console.log(error);
			    resolve({"status":false});
			  });
								
		});					
	},
}