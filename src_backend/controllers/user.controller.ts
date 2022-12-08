import express from 'express'
import User from '../models/user'
import { CountryController } from './country.controller';

export class UserController{
    
    login=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;

        User.findOne({"username":username,"password":password},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }

    change_pass=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;
        let new_password=req.body.new_password;

        User.findOne({"username":username,"password":password},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                User.collection.updateOne({"username":username,"password":password},{$set:{"password":new_password}});
                res.json({'message':'ok'});
            }
            else {
                res.json({'message':'no user'});
            }
        })
    }

    register=(req:express.Request,res:express.Response)=>{
        let name=req.body.name;
        let lastname=req.body.lastname;
        let username=req.body.username;
        let password=req.body.password;
        let email=req.body.email;
        let nationality=req.body.nationality;
        let type=req.body.type;
        let accepted=req.body.accepted;
        let num_compet=req.body.num_compet;
        let found=0;
        console.log(name);
        console.log(lastname);
        console.log(username);
        console.log(password);
        console.log(email);
        console.log(nationality);
        console.log(type);
        console.log(accepted);
        console.log(num_compet);

        if(type==2){
            User.findOne({"nationality":nationality,"accepted":true},(err,data)=>{
                if(err)console.log(err);
                else if(data){
                    found=1;
                    console.log("There is a leader for this country.");
                    res.json({'message':'There is a leader for this country.'});
                }
            })
        }

        if(found==0){
            let user=new User(req.body);
            console.log("Zaaaa novog:");
        // console.log(user.model.name);
            user.save().then(user=>{
                res.json({'message':'The request has been sent.'})
            }).catch(err=>{
                res.json(err);
            })
        }
    }
    find_non_acc_deleg = (req: express.Request, res: express.Response)=>{
        let type=1;
        let accepted=false;

        User.find({"type":type,"accepted":accepted},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }
    find_non_acc_lead = (req: express.Request, res: express.Response)=>{
        let type=2;
        let accepted=false;

        User.find({"type":type,"accepted":accepted},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }
    find_acc_deleg = (req: express.Request, res: express.Response)=>{
        let type=1;
        let accepted=true;

        User.find({"type":type,"accepted":accepted},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }
    find_acc_and_free_deleg = (req: express.Request, res: express.Response)=>{
        let type=1;
        let accepted=true;

        User.find({"type":type,"accepted":accepted,"num_compet":{$lt: 3 }},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }
    find_acc_lead = (req: express.Request, res: express.Response)=>{
        let type=2;
        let accepted=true;

        User.find({"type":type,"accepted":accepted},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }
    accept=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;

        User.collection.updateOne({"username":username},
        {$set:{"accepted":true}});
        res.json({message:'ok'});
        
    }
    is_there_a_leader=(req:express.Request,res:express.Response)=>{
        let nationality=req.body.nationality;
        let accepted=true;
        let type=2;

        User.findOne({"nationality":nationality,"accepted":accepted,"type":type},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                res.json({'message':'yes'});
            }
            else{
                res.json({'message':'no'});
            }
        });
        
    }
    accept_leader=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let nationality=req.body.nationality;
        let accepted=true;
        let type=2;

        User.findOne({"nationality":nationality,"accepted":accepted,"type":type},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                res.json({'message':'unsuccessfully'});
            }
            else{
                User.collection.updateOne({"username":username},
                {$set:{"accepted":true}});
                res.json({'message':'ok'});
            }
        });
        
    }
    remove_req=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;

        User.collection.remove({"username":username});
        res.json({message:'ok'});
        
    }
    find_deleg_by_name_and_lastname= (req: express.Request, res: express.Response)=>{
        let type=1;
        let name=req.body.name;
        let lastname=req.body.lastname;

        User.findOne({"type":type,"name":name,"lastname":lastname},(err,data)=>{
            if(err)console.log(err);
            else {
                console.log(data);
                res.json(data);
            }
        })
    }
    find_deleg_by_name_and_lastname_for_comp= (req: express.Request, res: express.Response)=>{
        let type=1;
        let name=req.body.name;
        let lastname=req.body.lastname;

        User.collection.updateOne({"type":type,"name":name,"lastname":lastname},{$inc: {'num_compet':1}});

        User.findOne({"type":type,"name":name,"lastname":lastname},(err,data)=>{
            if(err)console.log(err);
            else {
                // console.log(data);
                res.json(data);
            }
        })
    }
    find_user_by_username= (req: express.Request, res: express.Response)=>{
        let username=req.body.username;

        User.findOne({"username":username},(err,data)=>{
            if(err)console.log(err);
            else {
                res.json(data);
            }
        })
    }

}