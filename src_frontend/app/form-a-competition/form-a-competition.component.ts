import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discipline } from '../model/disciplines';
import { Sport } from '../model/sports';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-form-a-competition',
  templateUrl: './form-a-competition.component.html',
  styleUrls: ['./form-a-competition.component.css']
})
export class FormACompetitionComponent implements OnInit {
  all_sports_in_system:Sport[];
  sport:Sport;
  discipline:Discipline;
  all_disciplines_in_system:Discipline[];
  disciplines_for_sport:Discipline[];

  constructor(private router:Router,
    private sports_service:SportsService) { }

  ngOnInit(): void {
    this.sports_service.find_all_sports().subscribe((data:Sport[])=>{
      this.all_sports_in_system=data;
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
