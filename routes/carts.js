var express = require('express');
var router = express.Router();
var cartsDao = require("../dao/cartDao")
router.use(function(req,res,next){
   req.session.fun='carts';
  if(req.session.user&&req.session.user.ident=='1'){
   
    next();
  }else{
    res.redirect("/");
  }

})
router.get("/",function(req,res,next){
	cartsDao.getCarts(function(result){
    res.render('carts/cart_list',{users:result});
	})
   
})
module.exports = router;