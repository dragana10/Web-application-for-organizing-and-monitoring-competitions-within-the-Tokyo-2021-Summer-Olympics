import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {
  leader_username:string="";
  country:string="";
  constructor(private route: ActivatedRoute, 
    private ruter: Router,
    private user_service: UserService,
    private competitions_service:CompetitionsService,
    private sports_service:SportsService,
    private athlete_service:AthletesService) { }

  ngOnInit(): void {
    this.leader_username=JSON.parse(localStorage.getItem("leader_username"));
    // this.user_service.find_user_by_username(this.leader_username).subscribe((data:User)=>{
    //   this.country=data.nationality;
    // })
  }

  logout(){
    localStorage.removeItem("leader_username");
    this.ruter.navigate([''])
  }

}
