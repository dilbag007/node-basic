'use strict';

	var express = 	require('express'); 
	var config 	= 	require('../../../config/config'); 
	var app 	= 	express.Router();
	
	/* Require all middlewares for routes starts */
	var mainMiddleware          = 	require('../../middlewares/middleware');
	/* Require all middlewares for routes starts */

	/* Require all controllers for routes starts */			
	var UserCtrl 				= 	require(config.ControllersPath+'/UserController');
	var EmailTemplateCtrl 		= 	require(config.ControllersPath+'/EmailTemplateController');
	var LoginCtrl 				= 	require(config.ControllersPath+'/LoginController');
	var RegisterCtrl 			= 	require(config.ControllersPath+'/RegisterController');
	var ProfileCtrl 			= 	require(config.ControllersPath+'/ProfileController');
	var ProductCtrl 			= 	require(config.ControllersPath+'/ProductController');
	var CategoryCtrl 			= 	require(config.ControllersPath+'/CategoryController');
	var TestimonialCtrl 			= 	require(config.ControllersPath+'/TestimonialController');

	//var SalaryCtrl 				= 	require(config.ControllersPath+'/SalaryController');
	var FaqCtrl 			= 	require(config.ControllersPath+'/FaqController');
	/* Require all controllers for routes ends */
	
	/* Auth routes Starts */
	app.post('/login', mainMiddleware.requireNotLogin, LoginCtrl.login);
	app.post('/forgot-password', mainMiddleware.requireNotLogin, LoginCtrl.forgotPassword);
	app.post('/auth-user', mainMiddleware.requireLogin, LoginCtrl.authUser);
	/* Auth routes Ends */
	
	/* Register routes Starts */
	app.post('/register', mainMiddleware.requireNotLogin, RegisterCtrl.registerUser);
	/* Register routes Starts */
	
	/* Profile routes Starts */
	app.post('/update-profile', mainMiddleware.requireLogin, ProfileCtrl.updateProfile);
	app.post('/upload-profile-image', mainMiddleware.requireNotLogin, ProfileCtrl.uploadProfileImage);
	app.post('/upload-cover-picture', mainMiddleware.requireLogin, ProfileCtrl.uploadCoverImage);
	/* Profile routes Starts */
	
  
	/* User routes Starts */
	app.post('/user-list', mainMiddleware.optionalLogin, UserCtrl.userList);
	app.post('/save-user', mainMiddleware.optionalLogin, UserCtrl.saveUser);
	app.post('/update-user', mainMiddleware.optionalLogin, UserCtrl.updateUser);
	app.post('/check-username', mainMiddleware.optionalLogin, UserCtrl.checkUsername);
	app.post('/check-email', mainMiddleware.optionalLogin, UserCtrl.checkEmail);
	/* User routes Ends */
	
	
	/* Email Templates routes Starts */
	app.post('/save-email-template', mainMiddleware.optionalLogin, EmailTemplateCtrl.saveTemplate);
	app.post('/update-email-template', mainMiddleware.optionalLogin, EmailTemplateCtrl.updateTemplate);
	//app.post('/delete-email-template', mainMiddleware.optionalLogin, EmailTemplateCtrl.deleteEmailTemplate);
	//app.post('/index-email-template', mainMiddleware.optionalLogin, EmailTemplateCtrl.deleteEmailTemplate);
	/* Email Templates routes Ends */

	  /* products routes starts */
	app.post('/save-product', mainMiddleware.requireNotLogin, ProductCtrl.addProduct);
	app.post('/update-product', mainMiddleware.requireNotLogin, ProductCtrl.updateProduct);
	app.post('/delete-product', mainMiddleware.requireNotLogin, ProductCtrl.deleteProduct);
	app.get('/search-product', mainMiddleware.requireNotLogin, ProductCtrl.searchProduct);
	/* products routes Ends */

	/* categories routes starts */
	app.post('/save-category', mainMiddleware.requireNotLogin, CategoryCtrl.addCategory);
	app.post('/update-category', mainMiddleware.requireNotLogin, CategoryCtrl.updateCategory);
	app.post('/delete-category', mainMiddleware.requireNotLogin, CategoryCtrl.deleteCategory);
	/* categories routes Ends */

	/* testimonials routes starts */
	app.post('/list-testimonial', mainMiddleware.requireNotLogin, TestimonialCtrl.testimonialList);
	app.post('/save-testimonial', mainMiddleware.requireNotLogin, TestimonialCtrl.saveTestimonial);
	app.post('/update-testimonial', mainMiddleware.requireNotLogin, TestimonialCtrl.updateTestimonial);
	app.post('/delete-testimonial', mainMiddleware.requireNotLogin, TestimonialCtrl.deleteTestimonial);
	/* testimonials routes Ends */

	/* faqs routes starts */
	app.post('/list-faqs', mainMiddleware.requireNotLogin, FaqCtrl.faqList);
	app.post('/save-faqs', mainMiddleware.requireNotLogin, FaqCtrl.saveFaq);
	app.post('/update-faqs', mainMiddleware.requireNotLogin, FaqCtrl.updateFaq);
	app.post('/delete-faqs', mainMiddleware.requireNotLogin, FaqCtrl.deleteFaq);
	/* faqs routes Ends */

	app.get('/user-list-pdf', mainMiddleware.requireNotLogin, UserCtrl.userListDownload);
	app.get('/user-list-excel', mainMiddleware.requireNotLogin, UserCtrl.userListExcel);
	app.post('/user-list-send', mainMiddleware.requireNotLogin, UserCtrl.userListSend);

	
module.exports = app;	