const jwt       =   require("jsonwebtoken");
var config 		= 	require(ConfigPath+'/config');
exports.requireLogin = async (req, res, next) => {
	
    if(req.headers['authorization']){
        try{
            let authorization = req.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
                return res.status(401).json({'response':'error','message':'Invalid Login','data':{}});
            }else{
                req.jwt 				= 	jwt.verify(authorization[1], config.jwt_secret);
				//req.body.user_agent 	=	req.get('User-Agent');
                return next();
            }
        }catch(err){
		   return res.status(401).json({'response':'error','message':'Invalid Login','data':{}});
        }
    }else{
		return res.status(401).json({'response':'error','message':'Invalid Login','data':{}});
    }
};

exports.requireNotLogin = async (req, res, next) => {
    if(req.headers['authorization']){
        return res.status(401).json({'response':'error','message':'Permission not allowed to access','data':{}});
    }else{
        //console.log(req);
		return next();
    }
};


exports.optionalLogin = async (req, res, next) => {
	
    if(req.headers['authorization']){
        try{
            let authorization = req.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
               return next();
            }else{
                req.jwt 				= 	jwt.verify(authorization[1], config.jwt_secret);
				req.body.user_agent 	=	req.get('User-Agent');
                return next();
            }
        }catch(err){
		   return next();
        }
    }else{
		return next();
    }
};