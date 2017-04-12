var pool = require("../db/db");
function getCarts(cb) {
  var cartsUser = new Promise((resolve, reject) => {
    pool.pool.query("select distinct u.id,u.username from user u join diningcar dc on u.id = dc.userid",
      function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
  });
    cartsUser.then(function (rest) {
      var proms = new Array(rest.length);
      for (var i = 0; i < rest.length; i++) {
        proms[i] = new Promise((resolve, reject) => {
          pool.pool.query("select f.*,ft.typename,dc.id as dcid from food f join foodtype ft on f.type = ft.id join diningcar dc on f.id = dc.foodid where dc.userid = ?",
            [rest[i].id], function (error, results, fields) {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            });
        });
       }
       Promise.all(proms).then(function (val) {
          for (var i = 0; i < rest.length; i++) {
            rest[i].carts=val[i];
          }
          cb(rest);
          })
    })
  }
module.exports.getCarts = getCarts;