import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { Athlete } from '../model/athlete';
import { User } from '../model/user';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-leader-spec-disc',
  templateUrl: './leader-spec-disc.component.html',
  styleUrls: ['./leader-spec-disc.component.css']
})
export class LeaderSpecDiscComponent implements OnInit {
  disc:string="";
  leader:string="";
  country:string="";
  athletes:Array<Athlete>=[];
  constructor(private route: ActivatedRoute, 
    private ruter: Router,
    private user_service: UserService,
    private competitions_service:CompetitionsService,
    private sports_service:SportsService,
    private athlete_service:AthletesService) { }

  ngOnInit(): void {
    this.disc = this.route.snapshot.paramMap.get('disc_name');
    this.leader=JSON.parse(localStorage.getItem("leader_username"));
    this.user_service.find_user_by_username(this.leader).subscribe((data:User)=>{
      this.country=data.nationality;
      this.athlete_service.get_all_athletes_for_country_and_disc(this.country,this.disc).subscribe((data:Athlete[])=>{
        this.athletes=data;
      })
    })
  }

}
