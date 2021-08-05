"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs = require('fs');
var router = express_1.Router();
var mydata = JSON.parse(fs.readFileSync("data.json").toString());
router.get('/', function (req, res) {
    res.status(200).send(mydata);
});
router.post('/', function (req, res) {
    var flag = 0;
    var demo = req.body;
    console.log(demo);
    for (var i = 0; i < mydata.length; i++) {
        if (mydata[i]["id"] == demo.id) {
            res.status(404);
            flag = 1;
        }
    }
    if (flag == 0) {
        mydata.push(demo);
        var stringifyData = JSON.stringify(mydata);
        fs.writeFileSync('data.json', stringifyData);
        res.status(200).send(mydata);
    }
});
// this.app
router.delete('/:Id', function (req, res) {
    var Id = req.params.Id;
    var demo = req.body;
    mydata = mydata.filter(function (demo) { return demo.id != Id; });
    var stringifydata = JSON.stringify(mydata);
    fs.writeFileSync('data.json', stringifydata);
    res.status(200).send(mydata);
});
router.patch('/:Id', function (req, res) {
    var Id = req.params.Id;
    var user = req.body;
    for (var i = 0; i < mydata.length; i++) {
        if (mydata[i]["id"] == Id) {
            break;
        }
    }
    // res.send(i)
    // res.send(mydata[i]["firstName"]);
    mydata[i]["firstName"] = user.firstName;
    mydata[i]["middleName"] = user.middleName;
    mydata[i]["lastName"] = user.lastName;
    mydata[i]["email"] = user.email;
    mydata[i]["phoneNo"] = user.phoneNo;
    mydata[i]["role"] = user.role;
    mydata[i]["address"] = user.address;
    var stringifydata = JSON.stringify(mydata);
    fs.writeFileSync('data.json', stringifydata);
    res.send("user updated");
});
exports.default = router;
