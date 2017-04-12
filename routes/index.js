var express = require('express');
var router = express.Router();
var userDao = require("../dao/userDao")
var foodDao = require("../dao/foodDao");

/* GET home page. */
router.use(function (error, req, resp, next) {
req.session.fun='';
  next();
});

router.get('/', function (req, res, next) {
  foodDao.getHomeFoods(function (error, foods) {
    res.render('index', { foods: foods });
  })
});

router.post('/login', function (req, res, next) {
  var userInfo = {
    userName: req.body.un,
    password: req.body.pw
  };
  userDao.findUser(userInfo, function (error, results) {
    if (!error) {
      if (results.length == 1) {
        req.session.regenerate(function (err) {
          var user = results[0];
          req.session.user = user;
          res.json({ret:0,msg:'success'});
        });
      }else{
       // res.redirect("/");
        res.json({ret:-1,msg:'用户名密码不正确'});
      }
    }
  });
});

router.post("/reg", function (req, res, next) {
   userDao.reg(req.body,function(error,results){
    if(error) {
    console.log(error);
    res.json({ret:-1,msg:'注册失败'});
  }
    else{
      res.json({ret:0,msg:'注册成功'})
    }
   })
});

router.all("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;
