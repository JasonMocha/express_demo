var db = require("../db/db");
function getHomeFoods(cb) {
    db.pool.query("select * from food order by hits limit 1,4 ;"+
                     " select * from food order by price limit 1,4 ;"+ 
                        "select * from food order by comment limit 1,4",
                        function (error, results, fields) {
        cb(error, {hotfoods:results[0],salefoods:results[1],recommedfoods:results[2]});


    })
}

module.exports.getHomeFoods = getHomeFoods;
