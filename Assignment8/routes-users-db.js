"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("./db");
var router = express_1.Router();
router.get("/", function (req, res) {
    db_1.pool.query("select m.id,m.firstname, m.middlename, m.lastname,m.email,m.phoneno,m.address,c.customer_name, r.name AS ROLE from mydata m JOIN customer c ON m.id=c.customer_id JOIN role r ON r.role_key=m.role_key;").then(function (userData) {
        res.status(200).send(userData.rows);
    });
});
// router.get("/customertable", (req, res) => {
//   pool.query("SELECT * FROM customer").then((userData) => {
//     res.status(200).send(userData.rows);
//   });
// });
// router.get("/roletable", (req, res) => {
//   pool.query("SELECT * FROM role").then((userData) => {
//     res.status(200).send(userData.rows);
//   });
// });
router.put('/:Id', function (req, res) {
    var id = parseInt(req.params.Id);
    console.log(id);
    var _a = req.body, firstname = _a.firstname, middlename = _a.middlename, lastname = _a.lastname, phoneno = _a.phoneno, email = _a.email, address = _a.address, customer_name = _a.customer_name, role = _a.role;
    console.log(role, customer_name);
    var role_key;
    if (role == 'SuperAdmin') {
        role_key = 'super_admin';
    }
    if (role == 'Admin') {
        role_key = 'admin';
    }
    if (role == 'Subscriber') {
        role_key = 'subscriber';
    }
    console.log(role_key, customer_name);
    db_1.pool.query('UPDATE mydata SET firstname = $1,middlename=$2, lastname=$3, email=$4,phoneno=$5,address=$6,role_key=$7 WHERE id=$8', [firstname, middlename, lastname, email, phoneno, address, role_key, id], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send("User modified with ID: " + id);
    });
    db_1.pool.query('UPDATE customer SET customer_name=$1 where customer_id=$2', [customer_name, id], function (error, results) {
        if (error) {
            throw error;
        }
        // res.status(200).send(`User modified with ID: ${id}`)
    });
});
router.post('/:Id', function (req, res) {
    var id = parseInt(req.params.Id);
    var _a = req.body, firstname = _a.firstname, middlename = _a.middlename, lastname = _a.lastname, role_key = _a.role_key, phoneno = _a.phoneno, email = _a.email, address = _a.address;
    db_1.pool.query('INSERT INTO mydata (id,firstname, middlename, lastname,email,phoneno,role_key, address ) VALUES ($1, $2,$3,$4,$5,$6,$7,$8)', [id, firstname, middlename, lastname, email, phoneno, role_key, address], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send("User modified with ID: " + id);
    });
});
router.delete("/:Id", function (req, res) {
    var id = parseInt(req.params.Id);
    db_1.pool.query("DELETE FROM mydata WHERE id= $1", [id], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send("User deleted with ID: " + id);
    });
});
exports.default = router;
