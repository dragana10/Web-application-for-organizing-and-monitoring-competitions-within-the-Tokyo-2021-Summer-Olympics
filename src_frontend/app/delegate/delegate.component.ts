import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { Athlete } from '../model/athlete';
import { Competition } from '../model/competition';
import { Game_Obj } from '../model/game';
import { Holder } from '../model/holders';
import { Level } from '../model/level';
import { Location_Obj } from '../model/location';
import { User } from '../model/user';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delegate',
  templateUrl: './delegate.component.html',
  styleUrls: ['./delegate.component.css']
})
export class DelegateComponent implements OnInit {
  competition_name:string;
  competition_obj:Competition;
  competitions:Competition[];
  flag:number=0;
  delegate_username:string;
  delegate:User;
  date_start:Date;
  date_end:Date;
  time_start:Time;
  location_obj:Location_Obj;
  location_name:string="";
  discipline_name:string="";
  sport_name:string="";
  gender_name:string="";
  levels_of_comp:Array<String>=[];
  kind:number;


  constructor(private route: ActivatedRoute, 
    private ruter: Router,
    private user_service: UserService,
    private competitions_service:CompetitionsService,
    private sports_service:SportsService,
    private athlete_service:AthletesService) { }

  ngOnInit(): void {
    this.delegate_username=JSON.parse(localStorage.getItem("delegate_username"));

    this.user_service.find_user_by_username(this.delegate_username).subscribe((data:User)=>{
      this.delegate=data;
    })

    this.competitions_service.get_all_compet_for_delegate(this.delegate_username).subscribe((data:Competition[])=>{
      this.competitions=data;
    })

  }

  get_competition_by_name(){
    this.competitions_service.get_competition_by_name(this.competition_name).subscribe((data:Competition)=>{
      this.competition_obj=data;
      this.sport_name=this.competition_obj.sport;
      this.discipline_name=this.competition_obj.discipline;
      this.gender_name=this.competition_obj.gender;
      this.kind=this.competition_obj.kind;
      this.date_start=this.competition_obj.date_start;
      this.date_end=this.competition_obj.date_end;
      this.location_name=this.competition_obj.location;
      this.levels_of_comp=this.competition_obj.level;

      let sec=this.discipline_name.split(" ",2);
      let sec_word=sec[1];
      //alert(this.discipline_name)
      if(this.sport_name=='cycling' || this.sport_name=='swimming' || (this.sport_name=="athletics" && (this.discipline_name=="Marathon" || sec_word=="Race" ||sec_word=="Running" || sec_word=="Relay"))){
        let url="delegate/delegate-runn/"+this.competition_name;
        this.ruter.navigate([url]);
      }
      else if(this.sport_name=="athletics"){
        let url="delegate/delegate-jump/"+this.competition_name;
        this.ruter.navigate([url]);
      }

      if(this.sport_name=="shooting"){
        let url="delegate/delegate-shoot/"+this.competition_name;
        this.ruter.navigate([url]);
      }

      if(this.sport_name=="tennis"){
        let url="delegate/delegate-tennis/"+this.competition_name;
        this.ruter.navigate([url]);
      }

    })
  }

  logout(){
    localStorage.removeItem("delegate_username");
    this.ruter.navigate([''])
  }

}
