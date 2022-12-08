import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionsService } from '../competitions.service';
import { Athlete } from '../model/athlete';
import { Competition } from '../model/competition';
import { Discipline } from '../model/disciplines';
import { Level } from '../model/level';
import { Sport } from '../model/sports';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-specified-sport',
  templateUrl: './specified-sport.component.html',
  styleUrls: ['./specified-sport.component.css']
})
export class SpecifiedSportComponent implements OnInit {
  name_of_sport:string;
  kind:number=2;
  kind_of_disc:number=0;
  sport:Sport;
  disciplines:Discipline[];
  choosen_discipline:string="";
  choosen_disc_obj:Discipline;
  gender:string="";
  start_date:Date=null;
  end_date:Date=null;
  lctn_obj:Location=null;
  lctn_name:string="";
  location_name:string=";"
  location_for_this_sport:Location[];
  location_for_this_discipline:Location[];
  has_this_sport_discipline:number=1;
  error:string;
  format:string="yyyy-mm-dd";
  the_disc_is_chosen:number=0;
  msg_about_kind:string="";
  registered_competitors:Athlete[];
  competition:Competition;
  levels:Level[];
  lvl:string="";
  spc:string=" ";
  chosen_competitor:string;
  selected_competitors:Athlete[];
  name:string;
  show_requests:number=0;
  show_requests_msg="";
  num_par:number;
  num:number;

  constructor(private route: ActivatedRoute, 
    private ruter: Router,
    private sports_service: SportsService,
    private competitions_service:CompetitionsService) { }

  ngOnInit(): void {
    this.name_of_sport = this.route.snapshot.paramMap.get('name');
    this.sports_service.get_sport_by_name(this.name_of_sport).subscribe((data:Sport)=>{
      this.sport=data;
      this.kind=this.sport.kind;
    })
    this.sports_service.find_disciplines_for_sport(this.name_of_sport).subscribe((disciplines:Discipline[])=>{
      this.disciplines=disciplines;
    })
    this.sports_service.get_all_locations_for_sport(this.name_of_sport).subscribe((loc:Location[])=>{
      this.location_for_this_sport=loc;
    })
    this.sports_service.get_all_levels_for_sport(this.name_of_sport).subscribe((lvls:Level[])=>{
      this.levels=lvls;
    })
  }

  get_locations_for_discipline(){
    if(this.choosen_discipline){
      this.sports_service.get_all_locations_for_discipline(this.choosen_discipline).subscribe((loc:Location[])=>{
        this.location_for_this_sport=loc;
      })
    }
    this.sports_service.find_discipline_by_name(this.choosen_discipline).subscribe((dis:Discipline)=>{
      this.choosen_disc_obj=dis;
      this.kind_of_disc=this.choosen_disc_obj.kind;
      this.the_disc_is_chosen=1;
      if(this.kind_of_disc==0){
        this.msg_about_kind="This is an exclusively individual sport(discipline).";
      }
      else if(this.kind_of_disc==1){
        this.msg_about_kind="This is exclusively a team sport(discipline).";
      }
    })
  }
  
add(part){
  if(this.selected_competitors.length>=this.competition.num_par){
    let msg="The number of participants for this competition is ";
    msg=msg+this.num_par;
    msg=msg+".(all participants have already been selected)"
    alert(msg);
    this.show_requests_msg=msg;
  }
  else{
    this.competitions_service.set_participant(this.name,part.name,part.lastname,part.country,part.gender,part.disciplines,part.medals).subscribe(res=>{
      if(res['message']=='already exists'){
        alert("This athlete is already added to participants.")
        window.location.reload;

      }
    })
    this.competitions_service.get_competition_by_name(this.name).subscribe((cm:Competition)=>{
      this.competition=cm;
      this.selected_competitors=this.competition.participants;
    })
  }

  this.show();
}

remove(part){
  this.competitions_service.remove_participant(this.name,part.name,part.lastname,part.country,part.gender,part.disciplines,part.medals).subscribe(res=>{
        if(res['message']=='ok'){
          alert("BRAVO")
          window.location.reload;

        }
      })
    
  
  this.competitions_service.get_competition_by_name(this.name).subscribe((cm:Competition)=>{
    this.competition=cm;
    this.selected_competitors=this.competition.participants;
  })
  this.show();
}

show(){
  this.competitions_service.get_competition_by_name(this.name).subscribe((cm:Competition)=>{
    this.competition=cm;
    this.selected_competitors=this.competition.participants;
  })
  window.location.reload;
}

show_req(){
  if(this.choosen_discipline=="" || this.gender=="" || this.start_date==null ||
  this.end_date==null || this.lctn_name=="" || this.lvl==""){
    alert("You need to fill in all the previous fields.");
    this.error="All fields are required";
  }
  else{
    this.error="";
    let gndr;
    if(this.gender=='m')gndr="Men";
    else gndr="Women";
    this.name=this.lvl+" "+gndr;
    this.show_requests=1;
    alert(this.name);
    this.competitions_service.get_competition_by_name(this.name).subscribe((cm:Competition)=>{
      this.competition=cm;
      this.num_par=this.competition.num_par;
      this.registered_competitors=this.competition.to_apply;
    })
  }

}
txt:string;
show_loc(){
  alert("nes");
}
change(val:any){
  this.fun_change(val);
}
fun_change(val:any){
  this.txt=val;
  alert(this.txt);
}

// create(){
//   let nm="";
//   let g;
//   if(this.gender=='m')g="Men";
//   else g="Women";
//   nm=this.lvl+" "+g;

//   let sprt=this.name_of_sport;

//   let dscpl=this.choosen_discipline;

//   let gndr=this.gender;

//   let knd=this.kind;

//   let lev=this.lvl;

//   let start=this.start_date;
//   let end=this.end_date;

//   this.sports_service.get_loc_by_name(this.lctn_name).subscribe((loc:Location)=>{
//     this.lctn_obj=loc;
//   })

//   let status=0;

//   let num=this.num;

//   this.competitions_service.create(nm,sprt,dscpl,gndr,knd,lev,start,end,this.lctn_obj,status,num).subscribe((res=>{
//     if(res['message']=='already exists'){
//       alert("already exists");
//     }
//     else if(res['message']=='ok'){
//       alert("ok");
//     }
//   }))
// }
  
}
