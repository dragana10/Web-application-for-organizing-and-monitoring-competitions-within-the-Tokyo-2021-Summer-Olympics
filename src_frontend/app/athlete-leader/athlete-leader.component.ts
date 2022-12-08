import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { Athlete } from '../model/athlete';
import { Discipline } from '../model/disciplines';
import { Sport } from '../model/sports';
import { User } from '../model/user';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-athlete-leader',
  templateUrl: './athlete-leader.component.html',
  styleUrls: ['./athlete-leader.component.css']
})
export class AthleteLeaderComponent implements OnInit {
  all_sports_in_system:Sport[];
  sport:Sport;
  discipline:Discipline;
  all_disciplines_in_system:Discipline[];
  disciplines_for_sport:Discipline[];
  country:string="";
  leader:string="";
  constructor(private route: ActivatedRoute,
    private router:Router,
    private sports_service:SportsService,
    private usser_ser:UserService,
    private athl_ser:AthletesService) {}

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country');
    this.sports_service.find_all_sports().subscribe((data:Sport[])=>{
      this.all_sports_in_system=data;

      this.leader=JSON.parse(localStorage.getItem("leader_username"));
      this.usser_ser.find_user_by_username(this.leader).subscribe((data:User)=>{
        this.country=data.nationality;
        for(let i=0;i<this.all_sports_in_system.length;i++){
          this.athl_ser.get_all_athletes_for_country_and_sport(this.country,this.all_sports_in_system[i].name).subscribe((data:Athlete[])=>{
            this.all_sports_in_system[i].cnt_cmpttrs=data.length;
          })
        }
      })

    })

    this.sports_service.find_all_disciplines().subscribe((data:Discipline[])=>{
      this.all_disciplines_in_system=data;
    })
    
  }

  get_discipline(name){
    this.sports_service.find_disciplines_for_sport(name).subscribe((data:Discipline[])=>{
      this.disciplines_for_sport=data;
    })
  }
}
