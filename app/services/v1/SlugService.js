'use strict';
var slug 					= 	require('slug');


module.exports 	=	{
	
	generateSlug:  async (data)=>{
		var response 		=	{'response':'error','message':'Slug generating error','data':''};
		var generated_slug 	=	slug(data.name.toLowerCase());
		var separator 		=	'-';
		
		/* var slug_exists 	=	await checkSlug(generated_slug, data.table);
		
		if(slug_exists.status){
			if(typeof slug_exists.data != 'undefined' && slug_exists.data){
				generated_slug 	=	generated_slug+separator+'1';
			}
		} */
		return generated_slug;
	}
}