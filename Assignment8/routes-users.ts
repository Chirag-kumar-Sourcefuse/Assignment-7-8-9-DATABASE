
import express, { Router } from 'express';

const fs=require('fs');
const router=Router();

var mydata =JSON.parse(fs.readFileSync("data.json").toString());

        router.get('/',(req:express.Request,res:express.Response)=>{
            res.status(200).send(mydata);
        })
        router.post('/',(req:express.Request,res:express.Response)=>{
            var flag=0;
            const demo=req.body;
            console.log(demo);
            for(var i=0;i<mydata.length;i++){
                if(mydata[i]["id"]==demo.id){
                    res.status(404);
                    flag=1;
                }
            }
            if(flag==0){
                mydata.push(demo);
                const stringifyData=JSON.stringify(mydata);
                fs.writeFileSync('data.json',stringifyData);
                res.status(200).send(mydata);
            }
            
        });
        // this.app
        router.delete('/:Id',(req:express.Request,res:express.Response)=>{
            const {Id}=req.params;
            const demo:any=req.body;
            mydata=mydata.filter((demo: { id: string; })=>demo.id!=Id);

            
            const stringifydata=JSON.stringify(mydata);
            fs.writeFileSync('data.json',stringifydata);
            res.status(200).send(mydata);
        })
        router.patch('/:Id',(req:express.Request,res:express.Response)=>{
            const {Id}=req.params;

            const user=req.body;
            for(var i=0;i<mydata.length;i++){
                if(mydata[i]["id"]==Id){
                    break
                }
            }
            // res.send(i)
            // res.send(mydata[i]["firstName"]);
            mydata[i]["firstName"]=user.firstName;
            mydata[i]["middleName"]=user.middleName;
            mydata[i]["lastName"]=user.lastName;
            mydata[i]["email"]=user.email;
            mydata[i]["phoneNo"]=user.phoneNo;
            mydata[i]["role"]=user.role;
            mydata[i]["address"]=user.address;

            const stringifydata=JSON.stringify(mydata);
            fs.writeFileSync('data.json',stringifydata);
            res.send("user updated");
        });
        
export default router;        
    
