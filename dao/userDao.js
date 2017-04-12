var pool = require("../db/db");
function findUdsers(params,cb) {
  var s_un=params.s_un;
  var pageno=params.pageno;
  if(s_un){
    s_un='%'+s_un+'%';
  }else{
    s_un='%%';
  }
  if(!pageno){
    pageno=0;
  }
  var sql1="select count(*) as total from user where userName like '"+s_un+"'";
  var sql2="select * from user where userName like '"+s_un +"' limit "+pageno*2+","+2;
  pool.pool.query(sql1+";"+sql2, function (error, results, fields) {
    cb(error, results);

  })
}
function findUser(userInfo, cb) {
  pool.pool.query("select * from user where userName=? and password=? ",
                    [userInfo.userName, userInfo.password], 
                     function (error, results, fields) {
                              cb(error, results);

                     })
}
function reg(userInfo, cb) {
   pool.pool.query("select max(id) as m from user",function(error,result,fds){
        pool.pool.query("insert into user(id,userName,password,ident,telephone,address) values(?,?,?,'0',?,?) ",
                    [result[0].m+1,userInfo.un, userInfo.pw,userInfo.tel,userInfo.addr], 
                     function (error, results, fields) {
                              cb(error, results);

                     })
   })
  
}
function deleteUser(id,cb){
   pool.pool.query("delete from user where id=?",
                    [id], 
                     function (error, results, fields) {
                              cb(error, results);

                     })
}
function findUserById(id,cb){
   pool.pool.query("select * from user where id=?",
                    [id], 
                     function (error, results, fields) {
                              cb(error, results);

                     })
}
function updateUser(params,cb){
   pool.pool.query("update user set userName=?,password=?,ident=?,telephone=?,address=? where id=? ",
                    [params.un,params.pw,params.ident,params.tel,params.addr,params.id], 
                     function (error, results, fields) {
                        console.log(error);
                              cb(error, results);

                     })
}
function addUser(userInfo, cb) {
   pool.pool.query("select max(id) as m from user",function(error,result,fds){
        pool.pool.query("insert into user(id,userName,password,ident,telephone,address) values(?,?,?,?,?,?) ",
                    [result[0].m+1,userInfo.un, userInfo.pw,userInfo.ident,userInfo.tel,userInfo.addr], 
                     function (error, results, fields) {
                              cb(error, results);

                     })
   })
  
}
module.exports.findUdsers = findUdsers;
module.exports.findUser = findUser;
module.exports.reg=reg;
module.exports.deleteUser = deleteUser;
module.exports.findUserById=findUserById;
module.exports.updateUser=updateUser;
module.exports.addUser=addUser;