import express, { Router,Request,Response } from 'express';
import { pool } from "./db";

const router=Router();

router.get("/", (req, res) => {
    pool.query("select m.id,m.firstname, m.middlename, m.lastname,m.email,m.phoneno,m.address,c.customer_name, r.name AS ROLE from mydata m JOIN customer c ON m.id=c.customer_id JOIN role r ON r.role_key=m.role_key;").then((userData) => {
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
router.put('/:Id',(req,res)=>{
    const id = parseInt(req.params.Id);
    console.log(id);
    const { firstname, middlename, lastname, phoneno, email, address,customer_name,role } = req.body;
    console.log(role,customer_name);
    var role_key;
    if (role=='SuperAdmin'){
       role_key='super_admin';
    }
    if (role=='Admin'){
      role_key='admin';
   }
   if (role=='Subscriber'){
    role_key='subscriber';
 }
 console.log(role_key,customer_name);
    pool.query(
        'UPDATE mydata SET firstname = $1,middlename=$2, lastname=$3, email=$4,phoneno=$5,address=$6,role_key=$7 WHERE id=$8',
        [firstname,middlename,lastname,email,phoneno,address,role_key,id],
        (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`User modified with ID: ${id}`)
        }
      );
      pool.query(
        'UPDATE customer SET customer_name=$1 where customer_id=$2',
        [customer_name,id],
        (error, results) => {
          if (error) {
            throw error
          }
          // res.status(200).send(`User modified with ID: ${id}`)
        }
      );
});

router.post('/:Id',(req,res)=>{
    const id = parseInt(req.params.Id);
    const {firstname, middlename, lastname,role_key, phoneno, email, address } = req.body;
    pool.query(
        'INSERT INTO mydata (id,firstname, middlename, lastname,email,phoneno,role_key, address ) VALUES ($1, $2,$3,$4,$5,$6,$7,$8)',
        [id,firstname,middlename,lastname,email,phoneno,role_key,address],
        (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`User modified with ID: ${id}`)
        }
      );
});

router.delete("/:Id", (req, res) => {
    const id = parseInt(req.params.Id);
    pool.query("DELETE FROM mydata WHERE id= $1", [id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
      });
  });
export default router;