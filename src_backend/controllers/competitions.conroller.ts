import express from 'express'
import Competition from '../models/competition'
import Athlete from '../models/athlete'
import Game from '../models/game'
import Country from '../models/country'
import Medal from "../models/medal"

// let medalg={
//     gold:0,
//     silver:0,
//     bronze:0
// }
// Athlete.collection.updateMany({},{$set: {"medals": medalg}}); ubaci skroz novo polje
// Athlete.collection.updateMany({},{ $unset: {'medals':1}}) skroz svima ukloni polje medals


export class CompetitionsController{


    get_competition_by_name = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;

        Competition.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else {
                console.log(data);
                res.json(data);
            }
        });
    }

    
    set_participant=(req: express.Request, res: express.Response)=>{
        let name_of_comp=req.body.name_of_comp;

        Competition.findOne({"name":name_of_comp},(err,data)=>{
            if(err)console.log(err);
            else {
                let name_par=req.body.name;
                let lastname=req.body.lastname;
                let country=req.body.country;
                
                Competition.findOne({"name":name_of_comp,"participants.name":name_par,"participants.lastname":lastname,"participants.country":country},(err,data)=>{
                    if(err)console.log(err);
                    else if(data) {
                        //participant already exists
                        res.json({"message":"already exists"});
                    }
                    else{
                        let nw=new Athlete(req.body);
                        Competition.collection.updateOne({"name":name_of_comp},{$push:{"participants":nw}});
                        res.json({"message":"ok"});
                    }
                });
            }
        });
    }
    remove_participant=(req: express.Request, res: express.Response)=>{
        let name_of_comp=req.body.name_of_comp;

        Competition.findOne({"name":name_of_comp},(err,data)=>{
            if(err)console.log(err);
            else {
                let name_par=req.body.name;
                let lastname=req.body.lastname;
                let country=req.body.country;
                Competition.collection.updateOne({"name":name_of_comp},{$pull:{"participants":{"name":name_par,"lastname":lastname,"country":country}}});
                res.json({"message":"ok"});
            }
        });
    }
    apply_athlete=(req: express.Request, res: express.Response)=>{
        let name_of_comp=req.body.name_of_comp;
        let name=req.body.name;
        let lastname=req.body.lastname;
        let country=req.body.country;
        let gender=req.body.gender;

        Competition.findOne({"name":name_of_comp},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.findOne({"name":name_of_comp,"status":1},(err,data)=>{
                    if(err)console.log(err);
                    else if(data) {
                        res.json({"message":"formed"});
                    }
                    else{
                        Competition.findOne({"name":name_of_comp,"status":2},(err,data)=>{
                            if(err)console.log(err);
                            else if(data){
                                res.json({"message":"finished"});
                            }
                            else {
                                Competition.findOne({"name":name_of_comp,"to_apply.name":name,"to_apply.lastname":lastname,"to_apply.country":country},(err,data)=>{
                                    if(err)console.log(err);
                                    else if(data){
                                        res.json({"message":"already registered"});
                                    }
                                    else{
                                        let nw=new Athlete(req.body);
                                        Competition.collection.updateOne({"name":name_of_comp},{$push:{"to_apply":nw}});
                                        res.json({"message":"ok"});
                                    }
                                })                            }
                        })
                    }
                });
            }
        });
    }

    set_delegate=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let username=req.body.username;

        Competition.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.collection.updateOne({"name":name},{$set:{"delegate":username}});
                res.json({"message":"ok"});
            }
        });
    }

    remove_delegate=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let username=req.body.username;

        Competition.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.collection.updateOne({"name":name},{$pull:{"delegate":username}});
                res.json({"message":"ok"});
            }
        });
    }

    set_date_start=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let date=req.body.date;

        Competition.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.collection.updateOne({"name":name},{$set:{"date_start":date}});
                res.json({"message":"ok"});
            }
        });
    }

    set_date_end=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let date=req.body.date;

        Competition.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.collection.updateOne({"name":name},{$set:{"date_end":date}});
                res.json({"message":"ok"});
            }
        });
    }

    get_all_compet_for_delegate=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;

        Competition.find({"delegate":username},(err,data)=>{
            if(err)console.log(err);
            else {
                // console.log(data);
                res.json(data);
            }
        });
    }

    set_time_start=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let time=req.body.time;

        Competition.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else {
                //console.log(time);
                Competition.collection.updateOne({"name":name},{$set:{"time_start":time}});
                res.json({"message":"ok"});
            }
        });
    }

    set_time_end=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let time=req.body.time;

        Competition.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.collection.updateOne({"name":name},{$set:{"time_end":time}});
                res.json({"message":"ok"});
            }
        });
    }
    set_result=(req: express.Request, res: express.Response)=>{
        // let name=req.body.name;

        // Competition.findOne({"name":name},(err,data)=>{
        //     if(err)console.log(err);
        //     else {
        //         let result=req.body.result;
        //         console.log(result);

        //         Competition.collection.updateOne({"name":name},{$set:{"result":result}});
        //         res.json({"message":"ok"});

        //     }
        // });
    }
    set_winner=(req: express.Request, res: express.Response)=>{
        let name_com=req.body.name_com;

        Competition.findOne({"name":name_com},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.findOne({"name":name_com},(err,data)=>{
                    if(err)console.log(err);
                    else{
                        let nw=new Athlete(req.body);

                        console.log(nw);
                        Competition.collection.updateOne({"name":name_com},{$set:{"winner":nw}});
                        Competition.collection.updateOne({"name":name_com},{$set:{"status":2}});

                        res.json({"message":"ok"});
                    
                    }
                });
            }
        });
    }
    set_bronze=(req: express.Request, res: express.Response)=>{
        let name_com=req.body.name_com;
        let country=req.body.country;

        Competition.findOne({"name":name_com},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.findOne({"name":name_com},(err,data)=>{
                    if(err)console.log(err);
                    else{
                        let name=req.body.name;
                        let lastname=req.body.lastname;
                        let gender=req.body.gender;

                        let nw=new Athlete(req.body);

                        console.log(nw);
                        Competition.collection.updateOne({"name":name_com},{$set:{"bronze":nw}});
                        Medal.collection.updateOne({"country":country},{$inc:{"bronze":1,"total":1}});
                        //Athlete.collection.updateOne({"name":name,"lastname":lastname, "country":country, "gender":gender},{$inc:{"medals.bronze":1}});
                        
                        res.json({"message":"ok"});
                    
                    }
                });
            }
        });
    }
    set_silver=(req: express.Request, res: express.Response)=>{
        let name_com=req.body.name_com;
        let country=req.body.country;

        Competition.findOne({"name":name_com},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.findOne({"name":name_com},(err,data)=>{
                    if(err)console.log(err);
                    else{
                        let name=req.body.name;
                        let lastname=req.body.lastname;
                        let gender=req.body.gender;

                        let nw=new Athlete(req.body);

                        console.log(nw);
                        
                        Competition.collection.updateOne({"name":name_com},{$set:{"silver":nw}});
                        Medal.collection.updateOne({"country":country},{$inc:{"silver":1,"total":1}});
                        //Athlete.collection.updateOne({"name":name,"lastname":lastname, "country":country, "gender":gender},{$inc:{"medals.silver":1}});

                        res.json({"message":"ok"});
                    
                    }
                });
            }
        });
    }
    set_gold=(req: express.Request, res: express.Response)=>{
        let name_com=req.body.name_com;
        let country=req.body.country;

        Competition.findOne({"name":name_com},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.findOne({"name":name_com},(err,data)=>{
                    if(err)console.log(err);
                    else{
                        let name=req.body.name;
                        let lastname=req.body.lastname;
                        let gender=req.body.gender;

                        let nw=new Athlete(req.body);

                        console.log(nw);
                        Competition.collection.updateOne({"name":name_com},{$set:{"gold":nw}});
                        Competition.collection.updateOne({"name":name_com},{$set:{"status":2}});
                        Medal.collection.updateOne({"country":country},{$inc:{"gold":1,"total":1}});
                        //Athlete.collection.updateOne({"name":name,"lastname":lastname, "country":country, "gender":gender},{$inc:{"medals.gold":1}});

                        res.json({"message":"ok"});
                    
                    }
                });
            }
        });
    }

    set_status=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let status=req.body.status;

        Competition.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else {
                Competition.collection.updateOne({"name":name},{$set:{"status":status}});
                res.json({"message":"ok"});
            }
        });
    }


    get_game = (req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;
        // console.log("za get_game------------------");
        // console.log(level);
        // console.log(sport);
        // console.log(discipline);
        // console.log(gender);
        // console.log(group);
        // console.log("------------------");


        Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
            if(err)console.log(err);
            else {
                //console.log(data);
                res.json(data);
            }
        });
    }
    get_game_simply = (req: express.Request, res: express.Response)=>{
        let level_num=req.body.level_num;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group_num=req.body.group;
        // console.log("za get_game------------------");
        // console.log(level);
        // console.log(sport);
        // console.log(discipline);
        // console.log(gender);
        // console.log(group);
        // console.log("------------------");


        Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},(err,data)=>{
            if(err)console.log(err);
            else {
                //console.log(data);
                res.json(data);
            }
        });
    }

    get_games_for_level = (req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;


        Game.find({"level":level,"sport":sport,"discipline":discipline,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else {
                console.log(data);
                res.json(data);
            }
        });
    }

    set_participant_in_game=(req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;
        // console.log(level);
        // console.log(sport);
        // console.log(discipline);
        // console.log(group);


        Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group, "curr_par":{$lt:2}},(err,data)=>{
            if(err)console.log(err);
            else if(data) {
                let name_par=req.body.name;
                let lastname=req.body.lastname;
                let country=req.body.country;
                let team=req.body.team;
                // console.log("SAD");
                // console.log(country);
                // console.log(team);
                
                Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group,"participants.name":name_par,"participants.lastname":lastname,"participants.country":country},(err,data)=>{
                    if(err)console.log(err);
                    else if(data) {
                        //participant already exists
                        res.json({"message":"already exists"});
                    }
                    else{
                        let nw=new Athlete(req.body);
                        Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$push:{"participants":nw}});
                        if(team=="team_A"){
                            Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"team_A":nw}});
                            Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$inc:{"curr_par":1}});

                        }
                        else{
                            Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"team_B":nw}});
                            Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$inc:{"curr_par":1}});
                        }

                        res.json({"message":"ok"});
                    }
                });
            }
            else{
                res.json({"message":"there are max participants"});
            }
        });
    }

    //this is simply
    inc_curr_par_in_game=(req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let ser=req.body.ser;
        console.log(level);
        console.log(sport);
        console.log(discipline);
        console.log(gender);
        console.log(ser);

        
        Game.collection.updateOne({"level_num":level,"sport":sport,"discipline":discipline,"gender":gender,"serial_num":ser},{$inc:{'curr_par':1}});
        res.json({"message":"ok"});


    }
    set_participant_in_game_simply=(req: express.Request, res: express.Response)=>{
        let level_num=req.body.level_num;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let next=req.body.next;
        // console.log(level_num);
        // console.log(sport);
        // console.log(discipline);
        // console.log(group);


        Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"serial_num":next},(err,data)=>{
            if(err)console.log(err);
            else {
                let name_par=req.body.name;
                let lastname=req.body.lastname;
                let country=req.body.country;
                let team=req.body.team;
                // console.log("SAD");
                // console.log(country);
                // console.log(team);
                
                Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"serial_num":next,"participants.name":name_par,"participants.lastname":lastname,"participants.country":country},(err,data)=>{
                    if(err)console.log(err);
                    else if(data) {
                        //participant already exists
                        res.json({"message":"already exists"});
                    }
                    else{
                        let nw=new Athlete(req.body);
                        Game.collection.updateOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"serial_num":next},{$push:{"participants":nw}});
                        if(team=="team_A"){
                            Game.collection.updateOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"serial_num":next},{$set:{"team_A":nw}});
                        }
                        else{
                            Game.collection.updateOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"serial_num":next},{$set:{"team_B":nw}});
                        }

                        res.json({"message":"ok"});
                    }
                });
            }
        });
    }

    set_date_start_in_game=(req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;
        let date=req.body.date;

        Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
            if(err)console.log(err);
            else {
                Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"date_start":date}});
                res.json({"message":"ok"});
            }
        });
    }
    set_date_start_in_game_simply=(req: express.Request, res: express.Response)=>{
        let level_num=req.body.level_num;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group_num=req.body.group;
        let date=req.body.date;

        Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},(err,data)=>{
            if(err)console.log(err);
            else {
                Game.collection.updateOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},{$set:{"date_start":date}});
                res.json({"message":"ok"});
            }
        });
    }

    set_date_end_in_game=(req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;
        let date=req.body.date;

        Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
            if(err)console.log(err);
            else {
                Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"date_end":date}});
                res.json({"message":"ok"});
            }
        });
    }
    set_date_end_in_game_simply=(req: express.Request, res: express.Response)=>{
        let level_num=req.body.level_num;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group_num=req.body.group;
        let date=req.body.date;

        Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},(err,data)=>{
            if(err)console.log(err);
            else {
                Game.collection.updateOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},{$set:{"date_end":date}});
                res.json({"message":"ok"});
            }
        });
    }
    set_time_start_in_game=(req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;
        let time=req.body.time;

        Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
            if(err)console.log(err);
            else {
                //console.log(time);
                Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"time_start":time}});
                res.json({"message":"ok"});
            }
        });
    }   
    set_time_start_in_game_simply=(req: express.Request, res: express.Response)=>{
        let level_num=req.body.level_num;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group_num=req.body.group;
        let time=req.body.time;

        Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},(err,data)=>{
            if(err)console.log(err);
            else {
                //console.log(time);
                Game.collection.updateOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},{$set:{"time_start":time}});
                res.json({"message":"ok"});
            }
        });
    }  

    get_all_games_for_competition=(req: express.Request, res: express.Response)=>{
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;

        //Game.collection.updateMany({"sport":sport,"discipline":discipline,"gender":gender},{$sort:{"level_num":-1}});
        Game.find({"sport":sport,"discipline":discipline,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else {
               // console.log(data);
                res.json(data);
            }
        });
    }

    set_result_in_game=(req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;


        Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
            if(err)console.log(err);
            else {
                let result=req.body.result;
                console.log(result);

                Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"result":result}});
                res.json({"message":"ok"});

            }
        });
    }
    set_status_in_game=(req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;
        let status=req.body.status;


        Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
            if(err)console.log(err);
            else {

                Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"status":status}});
                res.json({"message":"ok"});

            }
        });
    }
    set_result_in_game_simply=(req: express.Request, res: express.Response)=>{
        let level_num=req.body.level_num;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group_num=req.body.group;


        Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},(err,data)=>{
            if(err)console.log(err);
            else {
                let result=req.body.result;
                console.log(result);

                Game.collection.updateOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group_num},{$set:{"result":result}});
                res.json({"message":"ok"});

            }
        });
    }

    set_winner_in_game=(req: express.Request, res: express.Response)=>{
        let level=req.body.level;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;
        console.log("u metodi jeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");


        Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
            if(err)console.log(err);
            else {
                let name=req.body.name;
                let lastname=req.body.lastname;
                let country=req.body.country;
                
                Game.findOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
                    if(err)console.log(err);
                    else{
                        console.log("jojojojojojoojooo");
                        console.log(name);
                        let nw=new Athlete(req.body);

                        console.log(nw);
                        Game.collection.updateOne({"level":level,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"winner":nw}});
                        
                        res.json({"message":"ok"});
                    
                    }
                });
            }
        });
    }

    set_winner_in_game_simply=(req: express.Request, res: express.Response)=>{
        let level_num=req.body.level_num;
        let sport=req.body.sport;
        let discipline=req.body.discipline;
        let gender=req.body.gender;
        let group=req.body.group;
        console.log("u metodi jeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");


        Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
            if(err)console.log(err);
            else {
                let name=req.body.name;
                let lastname=req.body.lastname;
                let country=req.body.country;
                
                Game.findOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group},(err,data)=>{
                    if(err)console.log(err);
                    else{
                        console.log("jojojojojojoojooo");
                        console.log(name);
                        let nw=new Athlete(req.body);

                        console.log(nw);
                        Game.collection.updateOne({"level_num":level_num,"sport":sport,"discipline":discipline,"gender":gender,"group":group},{$set:{"winner":nw}});
                        
                        res.json({"message":"ok"});
                    
                    }
                });
            }
        });
    }

}
