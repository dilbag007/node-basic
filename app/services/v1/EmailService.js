'user strict';
var config 					= 	require('../../../config/config');
const EmailTemplateModel 	= 	require(config.ModelsPath+'/EmailTemplateModel');
const EmailLogModel 		= 	require(config.ModelsPath+'/EmailLogModel');
const HelperClass 			= 	require(config.LibPath+'/helpers');
const nodemailer  			=   require('nodemailer');



transporter = nodemailer.createTransport({
	//service: config.email.emailService,
	host: config.email.host,
    port: config.email.port,
	secure: true, // use TLS
	auth: {
		user: config.email.emailUser,
		pass: config.email.emailPassword
	},
	tls: {
    // do not fail on invalid certs
		rejectUnauthorized: false
	}
});

module.exports 	=	{
	
	// default function for sending email.
	sendmail: async (toArray, subject, message, ccArray, bccArray, attachmentArray) => {
		
		return new Promise((resolve) => {
			
			var mailOptions = {
			  from: config.EMAIL_FROM_ADDRESS,
			  to: toArray,
			  subject: subject,
			  html: message
			};

			if (attachmentArray.length > 0) {
				mailOptions.attachments = attachmentArray;
			}

			if (ccArray.length > 0) {
				mailOptions.cc = ccArray;
			}

			if (bccArray.length > 0) {
				mailOptions.bcc = bccArray;
			}
			
			//console.log(toArray);
			
			transporter.sendMail(mailOptions, async function(error, info){
				var status 	=	0;
				var data 		=	{'email_to':toArray,'email_from':config.EMAIL_FROM_ADDRESS,'email_type':'html','subject':subject,'message':message,'status':status};
				if (error) {
					console.log(error);
					var sent_response 	=	error;
				}else{
					data.status =	1;
					var sent_response 	=	info.response;
					console.log('Email sent: ' + info.response);
				}
				//var save_response 	=	await EmailLogModel.saveRow(data);
				//console.log(123);
				resolve({status:true, data:sent_response});
			});
		});	
		
	},



	sendEmail:  async (to_email,subject,message, headers={}, cc="", bcc="") => {
		
		return new Promise((resolve) => {
			
			var mailOptions = {
			  from: config.EMAIL_FROM_ADDRESS,
			  to: to_email,
			  subject: subject,
			  html: message
			};
			
			transporter.sendMail(mailOptions, async function(error, info){
				var status 	=	0;
				var data 		=	{'email_to':to_email,'email_from':config.EMAIL_FROM_ADDRESS,'email_type':'html','subject':subject,'message':message,'status':status};
				if (error) {
					console.log(error);
					var sent_response 	=	error;
				}else{
					data.status =	1;
					var sent_response 	=	info.response;
					console.log('Email sent: ' + info.response);
				}
				var save_response 	=	await EmailLogModel.save_logs(data);
				
				resolve({status:true, data:sent_response});
			});
		});	
		
	},


	mailSend:  async (slug, emailArray, subjectArray, bodyArray, ccArray, bccArray, attachmentArray, forceSend=true, includeExtra=false, fromMethod="") => {
		
		const templateQuery   		=   await EmailTemplateModel.getRow({'slug':slug}, {});
		
		if(templateQuery.status && typeof templateQuery.data !== "undefined" && templateQuery.data){
			var templateData 			=	templateQuery.data;
			var body 					= 	templateData.body;
			
			var bodyConstantarray 		= 	await getConstants(templateData.body);
			var subjectConstantArray 	= 	await getConstants(templateData.subject);
			var subject					=	await findandreplace(subjectConstantArray, subjectArray, templateData.subject);
			var message					=	await findandreplace(bodyConstantarray, bodyArray, body);
			message 					=	await alterMessage136(message, includeExtra);
			
			if(forceSend){
				var sent_response 	=	await sendmail(emailArray, subject, message, attachmentArray); // calling default function for sending email.
				return sent_response.status;
			}else{
				var status 			=	0;
				return status;
				/* var data 			=	{'email_to':to_email,'email_from':config.EMAIL_FROM_ADDRESS,'email_type':'html','subject':subject,'message':message,'status':status};
				var save_response 	=	await EmailLogModel.save_logs(data);
				return save_response.status; */
			}
			
			
		}else{
			var response 	=	{'response':'error','message':'Email template not found.','data':{}};
		}
		
		return response;
	},

	findandreplace: async (find,replace,body) => {
	  var replaceString = body;
	  for (var i = 0; i < find.length; i++) {
		replaceString = replaceString.replace(find[i], replace[i]);
	  }
	  return replaceString;
	},

	getConstants: async (string) => {
		var staticVariables = 	config.emailTemplateStaticConstants;
		var found 			= 	[];         // an array to collect the strings that are found
		var rxp 			= 	/{([^}]+)}/g;
		var curMatch;

		while( curMatch = rxp.exec( string ) ) {
			
			if(!staticVariables.includes(curMatch[0])){
				found.push( curMatch[0] );
			}
			
		}

		return found;
	},

	alterMessage136: async (message, includeExtra) => {
		
		if(includeExtra){
			var after_head		=	''; 
			var before_footer	=	'';
			var deactive_unsub	=	"<tr><td style='color: #989898; text-align: center; font-size: 12px; padding: 0px;'><a style='color: #981F41; text-decoration: underline;' href='"+config.SiteUrl+"/settings/?unsubscribe=unsubscribe' target='_blank'>Unsubscribe to Emails and/or Deactivate Registry</a></td></tr>";
			var after_footer	=	'';
		}else{
			var after_head		=	''; 
			var before_footer	=	'';
			var deactive_unsub	=	'';
			var after_footer	=	'';
		}
		
		var search 		= 	config.emailTemplateStaticConstants;
		var replace		= 	[after_head, before_footer, deactive_unsub, after_footer];
		message 		=	await findandreplace(search,replace,message);
		return message;
	}
}
