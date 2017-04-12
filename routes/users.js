var express = require('express');
var router = express.Router();
var userDao = require("../dao/userDao")
router.use(function(req,res,next){
  req.session.fun='users';
  console.log('fun');
  if(req.session.user&&req.session.user.ident=='1'){ 
    next();
  }else{
    res.redirect("/");
  }

})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.params=req.query;
  userDao.findUdsers(req.query,function (error,results) {
    res.locals.pages=Math.ceil(results[0][0].total/2);
    res.render('users/user_list', { results: results[1] });
  })
});

router.delete("/crud/:id",function(req,res,next){
  var id=req.params.id;
   userDao.deleteUser(id,function(error,results){
     if(error){
       res.json({ret:-1,msg:'删除失败'});
     }else{
       res.json({ret:0,msg:'删除成功'});
     }
   })
})

router.get("/crud/:id",function(req,res,next){
  var id=req.params.id;
   userDao.findUserById(id,function(error,results){
     res.render("users/user_edit",{user:results[0]})
   })
})
router.get("/add",function(req,res,next){
     res.render("users/user_add")
})

router.post("/add",function(req,res,next){
     userDao.addUser(req.body,function(error,results){
    if(error) {
    console.log(error);
    res.json({ret:-1,msg:'添加失败'});
  }
    else{
      res.json({ret:0,msg:'添加成功'})
    }
   })
});
 
router.put("/crud/:id",function(req,res,next){
  var id=req.params.id;
  var params=req.body;
   userDao.updateUser(params,function(error,results){
     console.log(error);
     if(error){
       res.json({ret:-1,msg:'更新失败'})
     }else(
       res.json({ret:0,msg:'更新成功'})
     )
   })
})

module.exports = router;
