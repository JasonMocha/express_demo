var express = require('express');
var router = express.Router();
var foodDao = require("../dao/foodDao")
router.use(function(req,res,next){
  req.session.fun='foods';
  if(req.session.user&&req.session.user.ident=='1'){
     
    next();
  }else{
    res.redirect("/");
  }

})
router.get("/",function(req,res,next){
    res.json({msg:"请继续"});
})
module.exports = router;