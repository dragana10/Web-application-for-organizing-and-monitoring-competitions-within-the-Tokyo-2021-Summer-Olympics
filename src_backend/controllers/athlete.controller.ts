import express from 'express'
import Athlete from '../models/athlete';
import Country from "../models/country";
import Medal from "../models/medal"

export class AthleteController{
    search_athletes = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;
        let lastname=req.body.lastname;
        let country=req.body.country;
        let gender=req.body.gender;
        let only_winners=req.body.only_winners;

        let code=0;

        if(name!="" && lastname=="" && country=="" && gender=="" && only_winners==false)code=1;//name
        else if(name=="" && lastname!="" && country==""&& gender=="" && only_winners==false)code=2; //lastname
        else if(name=="" && lastname=="" && country!=""&& gender=="" && only_winners==false)code=3; //country
        else if(name=="" && lastname=="" && country==""&& gender!="" && only_winners==false)code=4; //gender
        else if(name=="" && lastname=="" && country==""&& gender=="" && only_winners==true)code=5; //only winners
        else if(name!="" && lastname!="" && country==""&& gender=="" && only_winners==false)code=6; //name,lastname
        else if(name!="" && lastname=="" && country!=""&& gender=="" && only_winners==false)code=7; //name,country
        else if(name!="" && lastname=="" && country==""&& gender!="" && only_winners==false)code=8; //name,gender
        else if(name!="" && lastname=="" && country==""&& gender=="" && only_winners==true)code=9; //name,winners
        else if(name=="" && lastname!="" && country!=""&& gender=="" && only_winners==false)code=10; //lastname,country
        else if(name=="" && lastname!="" && country==""&& gender!="" && only_winners==false)code=11; //lastname,gender
        else if(name=="" && lastname!="" && country==""&& gender=="" && only_winners==true)code=12; //lastnamme,winners
        else if(name=="" && lastname=="" && country!=""&& gender!="" && only_winners==false)code=13; //country,gender
        else if(name=="" && lastname=="" && country!=""&& gender=="" && only_winners==true)code=14; //country,winners
        else if(name=="" && lastname=="" && country==""&& gender!="" && only_winners==true)code=15; //gender,winners
        else if(name!="" && lastname!="" && country!=""&& gender=="" && only_winners==false)code=16; //name,lastname,country
        else if(name!="" && lastname!="" && country==""&& gender!="" && only_winners==false)code=17; //name,lastname,gender
        else if(name!="" && lastname!="" && country==""&& gender=="" && only_winners==true)code=18; //name,lastname,winners
        else if(name!="" && lastname=="" && country!=""&& gender!="" && only_winners==false)code=19; //name,country,gender
        else if(name!="" && lastname=="" && country!=""&& gender=="" && only_winners==true)code=20; //name,country,winners
        else if(name!="" && lastname=="" && country==""&& gender!="" && only_winners==true)code=21; //name,gender,winers
        else if(name=="" && lastname!="" && country!=""&& gender!="" && only_winners==false)code=22; //lastname,country,gender
        else if(name=="" && lastname!="" && country!=""&& gender=="" && only_winners==true)code=23; //lastname,country,winners
        else if(name=="" && lastname!="" && country==""&& gender!="" && only_winners==true)code=24; //lastname,gender,winners
        else if(name=="" && lastname=="" && country!=""&& gender!="" && only_winners==true)code=25; //country,gender,winners
        else if(name!="" && lastname!="" && country!=""&& gender!="" && only_winners==false)code=26; //name,lastname,country,gender
        else if(name!="" && lastname!="" && country!=""&& gender=="" && only_winners==true)code=27; //name,lastname,country,winners
        else if(name!="" && lastname!="" && country==""&& gender!="" && only_winners==true)code=28; //name,lastname,gender,winners
        else if(name!="" && lastname=="" && country!=""&& gender!="" && only_winners==true)code=39; //name,country,gender,winners
        else if(name=="" && lastname!="" && country!=""&& gender!="" && only_winners==true)code=30; //lastname,country,gender,winners
        else if(name!="" && lastname!="" && country!=""&& gender!="" && only_winners==true)code=30; //all

        if(code==1){
            Athlete.find({"name":name},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==2){
            Athlete.find({"lastname":lastname},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==3){
            Athlete.find({"country":country},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==4){
            Athlete.find({"gender":gender},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==5){
            Athlete.find({$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] },(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==6){
            Athlete.find({"name":name,"lastname":lastname},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==7){
            Athlete.find({"name":name,"country":country},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==8){
            Athlete.find({"name":name,"gender":gender},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==9){
            Athlete.find({$and:[{"name":name},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==10){
            Athlete.find({"lastname":lastname,"country":country},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==11){
            Athlete.find({"lastname":lastname,"gender":gender},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==12){
            Athlete.find({$and:[{"lastname":lastname},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==13){
            Athlete.find({"country":country,"gender":gender},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==14){
            Athlete.find({$and:[{"country":country},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==15){
            Athlete.find({$and:[{"gender":gender},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==16){
            Athlete.find({"name":name,"lastname":lastname,"country":country},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==17){
            Athlete.find({"name":name,"lastname":lastname,"gender":gender},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==18){
            Athlete.find({$and:[{"name":name},{"lastname":lastname},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==19){
            Athlete.find({"name":name,"country":country,"gender":gender},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==20){
            Athlete.find({$and:[{"name":name},{"country":country},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==21){
            Athlete.find({$and:[{"name":name},{"gender":gender},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==22){
            Athlete.find({"lastname":lastname,"country":country,"gender":gender},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==23){
            Athlete.find({$and:[{"lastname":lastname},{"country":country},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==24){
            Athlete.find({$and:[{"lastname":lastname},{"gender":gender},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==25){
            Athlete.find({$and:[{"country":country},{"gender":gender},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==26){
            Athlete.find({"name":name,"lastname":lastname,"country":country,"gender":gender},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==27){
            Athlete.find({$and:[{"name":name},{"lastname":lastname},{"country":country},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==28){
            Athlete.find({$and:[{"name":name},{"lastname":lastname},{"gender":gender},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==29){
            Athlete.find({$and:[{"name":name},{"country":country},{"gender":gender},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==30){
            Athlete.find({$and:[{"lastname":lastname},{"country":country},{"gender":gender},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }
        else if(code==31){
            Athlete.find({$and:[{"name":name},{"lastname":lastname},{"country":country},{"gender":gender},{$or: [{"medals.gold":{ $gt: 0 }},{"medals.silver":{ $gt: 0 }}, {"medals.bronze":{ $gt: 0 }}] }]},(err,data)=>{
                if(err)console.log(err);
                else res.json(data);
            })
        }

    }

    search_athletes_all = (req: express.Request, res: express.Response)=>{
        Athlete.find({},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }

    get_all_athletes_for_country = (req: express.Request, res: express.Response)=>{
        let country=req.body.country;

        Athlete.find({"country":country},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    get_all_athletes_for_country_and_sport = (req: express.Request, res: express.Response)=>{
        let country=req.body.country;
        let sport=req.body.sport;

        Athlete.find({"country":country,"sport":sport},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    get_all_athletes_for_country_and_disc = (req: express.Request, res: express.Response)=>{
        let country=req.body.country;
        let dis=req.body.dis;

        // console.log("disc:");
        // console.log(dis);
        // console.log(country)
        Athlete.find({"country":country,"disciplines":dis},(err,data)=>{
            if(err)console.log(err);
            else {
                // console.log("found:");
                // console.log(data);
                res.json(data);
            }
        });
    }

    set_new_athlete = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let lastname=req.body.lastname;
        let country=req.body.country;
        let gender=req.body.gender;
        let sport=req.body.sport;
        let discipline=req.body.discipline;

        Athlete.findOne({"name":name,"lastname":lastname, "country":country, "gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                //console.log("already exists");
                Athlete.findOne({"name":name,"lastname":lastname, "country":country, "gender":gender,"disciplines":discipline},(err,data)=>{
                    if(err)console.log(data);
                    else if(data){
                        res.json({'message':'already registered'});  
                    }
                    else{
                        Athlete.collection.updateOne({"name":name,"lastname":lastname, "country":country, "gender":gender},{$push:{"disciplines":discipline}});
                        res.json({'message':'already exists'});  
                    }
                })
            }
            else{
                let athl=new Athlete(req.body);
                athl.save().then(athl=>{
                    res.json({'message':'added'})
                }).catch(err=>{
                    res.json(err);
                })
                Country.collection.updateOne({"country":country},{$inc:{"cnt":1}});
            }
        });
    }
    add_medals_to_new_one = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let lastname=req.body.lastname;
        let country=req.body.country;
        let gender=req.body.gender;
        let sport=req.body.sport;

        Athlete.findOne({"name":name,"lastname":lastname, "country":country, "gender":gender,"sport":sport},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let medalg={
                    gold:0,
                    silver:0,
                    bronze:0
                }
                Athlete.collection.updateOne({"name":name,"lastname":lastname, "country":country, "gender":gender,"sport":sport},{$set: {"medals": medalg}});

                
                res.json({'message':'ok'})
            }
        })
    }
    add_medals_all = (req: express.Request, res: express.Response)=>{
        let medalg={
            gold:0,
            silver:0,
            bronze:0
        }
        
        Athlete.collection.updateMany({},{$push: {"medals": medalg}});
        //Athlete.collection.updateMany({},{$push: {"medals": medals}});
        //Athlete.collection.updateMany({},{$push: {"medals": medalb}});
        res.json({'message':'ok'})

    }

    set_first_disc = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let lastname=req.body.lastname;
        let country=req.body.country;
        let gender=req.body.gender;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        console.log("first:")
        console.log(discipline);

        
        Athlete.collection.updateOne({"name":name,"lastname":lastname, "country":country, "gender":gender},{$push:{"disciplines":discipline}});
        res.json({'message':'ok'})

    }


    set_bronze = (req: express.Request, res: express.Response) => {
        let country = req.body.country;
        let name = req.body.name;
        let lastname = req.body.lastname;
        let gender = req.body.gender;
        Athlete.collection.updateOne({ "name": name, "lastname": lastname, "country": country, "gender": gender }, { $inc: { "medals.bronze": 1 } });
        res.json({ "message": "ok" });

    }
    set_silver = (req: express.Request, res: express.Response) => {
        let country = req.body.country;
        let name = req.body.name;
        let lastname = req.body.lastname;
        let gender = req.body.gender;
        Athlete.collection.updateOne({ "name": name, "lastname": lastname, "country": country, "gender": gender }, { $inc: { "medals.silver": 1 } });
        res.json({ "message": "ok" });

    }
    set_gold = (req: express.Request, res: express.Response) => {
        let country = req.body.country;

        let name = req.body.name;
        let lastname = req.body.lastname;
        let gender = req.body.gender;
        Athlete.collection.updateOne({ "name": name, "lastname": lastname, "country": country, "gender": gender }, { $inc: { "medals.gold": 1 } });

        res.json({ "message": "ok" });

    }

    find_athl_by_name_and_lastname_country= (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let lastname=req.body.lastname;
        let country=req.body.country;

        Athlete.findOne({"country":country,"name":name,"lastname":lastname},(err,data)=>{
            if(err)console.log(err);
            else {
                console.log(data);
                res.json(data);
            }
        })
    }
}