import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discipline } from '../model/disciplines';
import { Sport } from '../model/sports';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-sports-input',
  templateUrl: './sports-input.component.html',
  styleUrls: ['./sports-input.component.css']
})
export class SportsInputComponent implements OnInit {
  all_sports_in_system:Sport[];
  name_of_sport:string;
  kind_of_sport:number;
  name_of_discipline:string;
  kind_of_discipline:number;
  has_a_discipline:number=0;
  msg:string='';
  just_discipline:number=0;
  name_of_sport_just:string;
  name_of_discipline_just:string;
  kind_of_discipline_just:number;
  msg_just:string='';

  constructor(private router:Router,
    private sports_service:SportsService) { }

  ngOnInit(): void {
    this.sports_service.find_all_sports().subscribe((data:Sport[])=>{
      this.all_sports_in_system=data;
    })
  }
  enter_discipline(){
    this.sports_service.enter_discipline(this.name_of_discipline,this.name_of_sport,this.kind_of_discipline).subscribe((res=>{
      if(res['message']=='ok'){
        this.msg='Successfully added.';
      }
      else if(res['message']=='no sport'){
        this.sports_service.enter_sport(this.name_of_sport,this.kind_of_sport).subscribe((res)=>{
          if(res['message']=='added'){
            this.sports_service.enter_discipline(this.name_of_discipline,this.name_of_sport,this.kind_of_discipline).subscribe((res=>{
              if(res['message']=='ok'){
                this.msg='Successfully added.';
              };
            }))
          }
        })
      }
    }))
  }
  enter_just_discipline(){
    if(this.name_of_discipline_just==null || this.name_of_sport_just== null || this.kind_of_discipline_just==null){
      alert("All fields are required");
    }
    else{
      this.sports_service.enter_discipline(this.name_of_discipline_just,this.name_of_sport_just,this.kind_of_discipline_just).subscribe((res=>{
        if(res['message']=='ok'){
          this.msg='Successfully added.';
        }
        else if(res['message']=='no sport'){
          this.msg_just='There is no this sport. Enter this sport first.';
        }
        else if(res['message']=='already exists'){
          this.msg_just='This discipline already exists.';
        }
      }))
    }
  }
  enter_sport(){
    this.sports_service.enter_sport(this.name_of_sport,this.kind_of_sport).subscribe((res=>{
      console.log(res);
    }))
  }

}
