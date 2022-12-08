import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { Athlete } from '../model/athlete';
import { Discipline } from '../model/disciplines';
import { User } from '../model/user';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-athlete-disc-leader',
  templateUrl: './athlete-disc-leader.component.html',
  styleUrls: ['./athlete-disc-leader.component.css']
})
export class AthleteDiscLeaderComponent implements OnInit {
  name:string="";
  disciplines:Discipline[];
  disc_selected:string="";
  flag:number=0;
  leader:string="";
  country:string="";
  athletes:Array<Athlete>=[];
  
  constructor(private route: ActivatedRoute, 
    private ruter: Router,
    private sports_service: SportsService,
    private competitions_service:CompetitionsService,
    private user_service:UserService,
    private athlete_service:AthletesService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.sports_service.find_disciplines_for_sport(this.name).subscribe((disciplines:Discipline[])=>{
      this.disciplines=disciplines;
      if(this.disciplines.length==0){
        this.flag=1;
        this.leader=JSON.parse(localStorage.getItem("leader_username"));
        this.user_service.find_user_by_username(this.leader).subscribe((data:User)=>{
          this.country=data.nationality;
          this.athlete_service.get_all_athletes_for_country_and_sport(this.country,this.name).subscribe((data:Athlete[])=>{
            this.athletes=data;
          })
        })
      }
     })
  }

}
