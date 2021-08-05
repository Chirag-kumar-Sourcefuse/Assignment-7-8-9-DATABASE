import express, { Router,Request,Response } from 'express';
import { pool } from "./db";

const router=Router();

router.get("/", (req, res) => {
    pool.query("SELECT id,firstname,middlename,lastname,email,phoneno,role_key as role,address  FROM mydata").then((userData) => {
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
    const { firstname, middlename, lastname,role_key, phoneno, email, address } = req.body;
    pool.query(
        'UPDATE mydata SET firstname = $1,middlename=$2, lastname=$3, email=$4,phoneno=$5,role_key=$6,address=$7 WHERE id=$8',
        [firstname,middlename,lastname,email,phoneno,role_key,address,id],
        (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`User modified with ID: ${id}`)
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