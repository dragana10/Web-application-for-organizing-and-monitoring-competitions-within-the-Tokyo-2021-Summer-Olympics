import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionsService } from '../competitions.service';
import { Athlete } from '../model/athlete';
import { Competition } from '../model/competition';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inf-comp',
  templateUrl: './inf-comp.component.html',
  styleUrls: ['./inf-comp.component.css']
})
export class InfCompComponent implements OnInit {
  name:string;
  level:String;
  date_start_to_display:string="";
  date_end_to_display:string="";
  loc:string;
  delegate:string;
  status:number;
  compA:Athlete;
  compB:Athlete;
  to_app:Array<Athlete>;
  parts:Array<Athlete>;
  bronze:Athlete;
  silver:Athlete;
  gold:Athlete;
  winn:Athlete;
  competition:Competition;
  registered_competitors:Array<Athlete>;
  has_rqsts:number=0;
  msg_has_rqsts:string="";
  has_parts:number=0;
  msg_has_parts:string="";
  has_dates:number=0;
  msg_dates:string="";
  has_br:number=0;
  msg_br:string="";
  has_sil:number=0;
  msg_sil:string="";
  has_gld:number=0;
  msg_gld:string="";
  has_del:number=0;
  msg_del:string="";
  sport_name:string="";
  lvls:String[]=[];

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private sports_service: SportsService,
    private competitions_service:CompetitionsService,
    private user_service:UserService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name1');
    this.competitions_service.get_competition_by_name(this.name).subscribe((cm:Competition)=>{
      this.competition=cm;
      this.sport_name=(this.name.split(" ",2))[0];
      this.lvls=this.competition.level;
      //alert(this.lvls.length)
      this.level=this.competition.level[0];
      if(cm.date_start==null || cm.date_end==null){
        this.has_dates=0;
        this.msg_dates="There is not set start date and end date."
      }
      else{
        this.has_dates=1;
        this.date_to_display_fun(cm.date_start,cm.date_end);
      }
      this.loc=this.competition.location;
      if(this.competition.delegate=="" || this.competition.delegate==null){
        this.has_del=0;
        this.msg_del="There is not set a delegate yet.";
      }
      else{
        this.has_del=1;
      }
      this.delegate=this.competition.delegate;
      this.registered_competitors=this.competition.to_apply;
      if(this.registered_competitors.length==0){
        this.has_rqsts=0;
        this.msg_has_rqsts="There are no requests for this competition yet.";
      }
      else{
        this.has_rqsts=1;
      }
      this.status=this.competition.status;
      this.parts=this.competition.participants;
      if(this.parts.length==0){
        this.has_parts=0;
        this.msg_has_parts="There are no participants for this competition yet.";
      }
      else{
        this.has_parts=1;
      }
      this.bronze=this.competition.bronze;
      if(this.bronze==null){
        this.has_br=0;
        this.msg_br="There is no bronze medal for this competition yet.";
      }
      else{
        this.has_br=1;
      }
      this.silver=this.competition.silver;
      if(this.silver==null){
        this.has_sil=0;
        this.msg_sil="There is no silver medal for this competition yet.";
      }
      else{
        this.has_sil=1;
      }
      this.gold=this.competition.gold;
      if(this.gold==null){
        this.has_gld=0;
        this.msg_gld="There is no gold medal for this competition yet.";
      }
      else{
        this.has_gld=1;
      }
    })
  }

  date_to_display_fun(date_s,date_e){
    let str=date_s+"";
    let str_1=str.split("T",2);
    this.date_start_to_display=str_1[0];
    str=date_e+"";
    str_1=str.split("T",2);
    this.date_end_to_display=str_1[0];
  }
}
