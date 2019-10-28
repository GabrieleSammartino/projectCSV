var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');


var Client = require('../models/Client');

var csvfile = __dirname + "/../public/files/clients.csv";
var stream = fs.createReadStream(csvfile);


/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('index', {title: 'Import CSV using NodeJS'});

}).get('/import', function (req, res, next) {
    console.log("start");
    var csvParser = require('csv-parse');
    var filePath = __dirname + "/../public/files/clients.csv";
    fs.readFile(filePath, {
        encoding: 'utf-8'
    }, function (err, csvData) {
        if (err) {
            console.log(err);
        }


        var dataName = "";
        var dataCompany = "";
        var dataTypoAct = "";
        var dataCategoryId = "";
        var dataRelationId = "";
        var dataStateId = "";
        var dataExchangeId = "";
        var dataUrl = "";
        var dataTypoOpp = "";
        var dataDescOpp = "";
        var dataNote = "";


        csvParser(csvData, {
            delimiter: ','
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < data.length; i++) {

                    for (var f = 0; f < data[i].length; f++) {
                        if (data[i][f] == null || data[i][f] == "") {
                            data[i][f] = "Ignoto" + i + " " + f;
                        }
                        // console.log(data[i][f], " data" + i + ' ' + f);

                        if (f == 0) dataCompany = data[i][f];
                        if (f == 1) dataName = data[i][f];
                        if (f == 2) dataTypoAct = data[i][f];
                        if (f == 3) dataCategoryId = data[i][f];
                        if (f == 4) dataRelationId = data[i][f];
                        if (f == 5) dataStateId = data[i][f];
                        if (f == 6) dataExchangeId = data[i][f];
                        if (f == 7) dataUrl = data[i][f];
                        if (f == 8) dataTypoOpp = data[i][f];
                        if (f == 9) dataDescOpp = data[i][f];
                        if (f == 10) dataNote = data[i][f];

                    }
                    var item = new Client({
                        company: dataCompany,
                        name: dataName,
                        typoAct: dataTypoAct,
                        categoryId: dataCategoryId,
                        relationId: dataRelationId,
                        stateId: dataStateId,
                        exchangeId: dataExchangeId,
                        url: dataUrl,
                        typoOpp: dataTypoOpp,
                        descOpp: dataDescOpp,
                        note: dataNote
                    });
                    item.save(function (error) {
                        console.log("save");

                        console.log(item);
                        if (error) {
                            console.log(error);
                        }
                    });

                }
            }
        })
    })
});

// var item = new Client({
//     company: data[0][0],
//     name: data[0][1],
//     typoAct: data[0][2],
//     categoryId: data[0][3],
//     relationId: data[0][4],
//     stateId: data[0][5],
//     exchangeId: data[0][6],
//     url: data[0][7],
//     typoOpp: data[0][8],
//     descOpp: data[0][9],
//     note: data[0][10]
// });

//   var  clients  = [];
//   var csvStream = csv().on("data", function(data){
//        var item = new Client({
//            company: data[0],
//            name: data[1],
//            typoAct: data[2],
//            categoryId: data[3],
//            relationId: data[4],
//            stateId: data[5],
//            exchangeId: data[6],
//            url: data[7],
//            typoOpp: data[8],
//            descOpp: data[9],
//            note: data[10]
//        });
//        item.save(function(error){
//            console.log("save");
//
//            console.log(item);
//             if(error){
//                  console.log(error);
//             }
//         });
//
//   }).on("end", function(){
//
//   });
//
//   stream.pipe(csvStream);
//   res.json({success : "Data imported successfully.", status : 200});
//
// }).get('/fetchdata', function(req, res, next) {
//
//   Client.find({}, function(err, docs) {
//       if (!err){
//           res.json({success : "Updated Successfully", status : 200, data: docs});
//       } else {
//           throw err;
//       }
//   });


module.exports = router;
