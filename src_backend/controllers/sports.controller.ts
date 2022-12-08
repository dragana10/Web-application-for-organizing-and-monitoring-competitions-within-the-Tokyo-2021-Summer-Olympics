import express from 'express'
import Sport from '../models/sports';
import Discipline from '../models/disciplines';
import Location from '../models/location';
import Level from '../models/level';
import Holder from '../models/holders';
import Athlete from '../models/athlete';



export class SportsController{

    find_all_sports = (req: express.Request, res: express.Response)=>{
        Sport.find({},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    get_sport_by_name = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        Sport.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    find_sports_with_disciplines= (req: express.Request, res: express.Response)=>{
        let has=1;
        Sport.find({"has_a_discipline":has},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    find_sports_without_disciplines= (req: express.Request, res: express.Response)=>{
        let has=0;
        Sport.find({"has_a_discipline":has},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    find_all_disciplines = (req: express.Request, res: express.Response)=>{
        Discipline.find({},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    find_disciplines_for_sport = (req: express.Request, res: express.Response)=>{
        let sport=req.body.name;
        Discipline.find({"sport":sport},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    find_discipline_by_name = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        Discipline.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    enter_discipline = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let sport=req.body.sport;
        let kind=req.body.kind;
        //console.log(name);
        Discipline.findOne({"name":name,"sport":sport,"kind":kind},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                res.json({'message':'already exists'})
                //console.log("already exists");
            }
            else{
                //there are not this discipline
                //we need to check is there this sport
                Sport.findOne({"name":sport},(err,data)=>{
                    if(err)console.log(err);
                    else if(data){
                        //there is this sport, we need to
                        //add thid discipline to this sport
                        let new_dis=new Discipline(req.body);
                        //console.log(new_dis);

                        new_dis.save();
                        
                        Sport.collection.updateOne({"name":sport},
                        {$push:{'disciplines':new_dis}});

                        //also,we need to check 
                        //is there discipline which has 
                        //different kind and change kind of sport
                        Sport.findOne({'name':sport,'disciplines.kind':{$ne:kind}},(err,data)=>{
                            if(err)console.log(err);
                            else if(data){
                                Sport.collection.updateOne({"name":sport},
                                {$set:{"kind":2}});
                            }
                        })
                        res.json({'message':'ok'});
                    }
                    else{
                        res.json({'message':'no sport'});
                    }
                })

            }
        })
        
    }

    enter_sport = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let kind=req.body.sport;

        Sport.findOne({"name":name,"kind":kind},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                res.json({'message':'already exists'})
            }
            else{
                let new_sp=new Sport(req.body);
                new_sp.save().then(new_sp=>{
                    console.log('added');
                    res.json({'message':'added'})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }
    get_all_locations_for_sport = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        Location.find({"sports":name},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        });
    }
    get_all_locations_for_discipline = (req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        Location.find( { "disciplines.":name} ,(err,data)=>{
            if(err)console.log(err);
            else {
                // console.log(name);
                // console.log(data);
                res.json(data);
            }
        });
    }
    get_all_levels_for_sport = (req: express.Request, res: express.Response)=>{
        let sport=req.body.sport;
        Level.find({"sport":sport},(err,data)=>{
            if(err)console.log(err);
            else{
                res.json(data);
            }
        })
    }
    get_loc_by_name=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        Location.findOne({"name":name},(err,data)=>{
            if(err)console.log(err);
            else{
                // console.log(name);
                // console.log(data);
                res.json(data);
            }
        })
    }
    get_lev_by_name=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        Level.findOne({"level":name},(err,data)=>{
            if(err)console.log(err);
            else{
                res.json(data);
            }
        })
    }
    set_time_for_loc=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let time=req.body.time;
        Location.collection.updateOne({'name': name},{$push: {'time_scheduled': time}});
        res.json({'message':'ok'})
    }
    remove_time_for_loc=(req: express.Request, res: express.Response)=>{
        let name=req.body.name;
        let time=req.body.time;
        console.log(time);
        Location.collection.updateOne({'name': name},{$pull: {'time_scheduled': time}});
        res.json({'message':'ok'});
    }
    get_holder_table=(req: express.Request, res: express.Response)=>{
        let name=req.body.discipline;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":name,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else {
                console.log(name);
                console.log(sport);
                console.log(gender);
               // console.log(data);
                res.json(data);
            }
        })
    }
    set_holder_in_candidates=(req: express.Request, res: express.Response)=>{
        let discipline=req.body.discipline;
        let sport=req.body.sport;
        let gender=req.body.gender;
        let name=req.body.name;
        let lastname=req.body.lastname;
        let country=req.body.lastname;

        Holder.findOne({"name":discipline,"sport":sport,"gender":gender,"candidates.name":name,"candidates.lastname":lastname,"candidates.country":country},(err,data)=>{
            if(err)console.log(err);
            else if(data) {
                        res.json({"message":"formed"});
            }
            else{
                let nw=new Athlete(req.body);
                Holder.collection.updateOne({"name":discipline,"sport":sport,"gender":gender},{$push:{"candidates":nw}});
                res.json({"message":"ok"});
            }
        })
    }

    set_first_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"first":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_second_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"second":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_third_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
               // console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"third":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_fourth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"fourth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_fifth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"fifth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_sixth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"sixth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_seventh_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"seventh":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_eighth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"eighth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_ninth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"ninth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_tenth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"tenth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_eleventh_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"eleventh":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_twelfth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"twelfth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_thirteenth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"thirteenth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_fourteenth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"fourteenth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_fifteenth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"fifteenth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    set_sixteenth_holder=(req: express.Request, res: express.Response)=>{
        let discipline_hold=req.body.discipline_hold;
        let sport=req.body.sport;
        let gender=req.body.gender;

        Holder.findOne({"name":discipline_hold,"sport":sport,"gender":gender},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                let nw=new Athlete(req.body);
                //console.log(nw);

                Holder.collection.updateOne({"name":discipline_hold,"sport":sport,"gender":gender},{$push:{"sixteenth":nw}});
                res.json({"message":"ok"});
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    get_holder_by_id=(req: express.Request, res: express.Response)=>{
        let id=req.body.id;

        Holder.find({"first.id":id},(err,data)=>{
            if(err)console.log(err);
            else if(data){
                console.log(data);
                res.json(data);
            }
            else{
                res.json({'message':'no holder table'})
            }
        })
    }
    
    
}