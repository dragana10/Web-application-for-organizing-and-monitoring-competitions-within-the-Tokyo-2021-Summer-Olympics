import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { Athlete } from '../model/athlete';
import { Discipline } from '../model/disciplines';
import { Sport } from '../model/sports';
import { User } from '../model/user';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-a-competitor',
  templateUrl: './register-a-competitor.component.html',
  styleUrls: ['./register-a-competitor.component.css']
})
export class RegisterACompetitorComponent implements OnInit {
  name:string;
  lastname:string;
  gender:string;
  country_name:string;
  selected_sport:string;
  all_sports_in_the_sys:Array<Sport>=[];
  all_disc_in_the_sys:Array<Discipline>=[];
  disc_for_display:Array<Discipline>=[];
  choose_disc:number=0;
  selected_discs:string[]=[];
  leader:User;
  username:string;
  all_registered_athletes:Array<Athlete>=[];
  flag1:number=0;
  flag1_msg:string="";
  my_competitors:Array<Athlete>;
  my_competitors_flag:number=0;

  constructor(private route: ActivatedRoute, 
    private ruter: Router,
    private sports_service: SportsService,
    private competitions_service:CompetitionsService,
    private user_service:UserService,
    private athlete_service:AthletesService) { }

  ngOnInit(): void {
    this.username=JSON.parse(localStorage.getItem("leader_username"));

    this.user_service.find_user_by_username(this.username).subscribe((data:User)=>{
      this.leader=data;
      this.country_name=this.leader.nationality;
      this.athlete_service.get_all_athletes_for_country(this.country_name).subscribe((data:Athlete[])=>{
        this.all_registered_athletes=data;
      })
      this.sports_service.find_all_sports().subscribe((data:Sport[])=>{
        this.all_sports_in_the_sys=data;
      })
      this.sports_service.find_all_disciplines().subscribe((data:Discipline[])=>{
        this.all_disc_in_the_sys=data;
        this.disc_for_display=data;
      })
    })
  }

  get_discipline_for_sport(){
    this.sports_service.find_disciplines_for_sport(this.selected_sport).subscribe((data:Discipline[])=>{
      this.disc_for_display=data;
    })
    if(this.selected_sport=="water polo" || this.selected_sport=="volleyball" || this.selected_sport=="basketball"){
      this.flag1=1;
    }
  }

  choose_disc_fun(){
    if(this.flag1==1){
      alert("Selected sport has no disciplines.");
    }
    else{
      if(this.name==null || this.lastname==null || this.gender==null || this.selected_sport==null){
        alert("All fields are required.");
      }
      else{
        this.choose_disc=1;
      }
    }
  }
  hide_disc_fun(){
    for(let i=0;i<this.disc_for_display.length;i++){
      this.disc_for_display[i].msg="";
    }
    this.choose_disc=0;
  }
  register(name_dis) {

    let gndr = "";
    if (this.gender == "m") gndr = "Men";
    else gndr = "Women";
    let comp = this.selected_sport + " " + gndr + " " + name_dis.name;

    this.athlete_service.find_athl_by_name_and_lastname_country(this.name,this.lastname,this.country_name).subscribe((data:Athlete)=>{
      if(data!=null && data.sport!=this.selected_sport){
        alert("This athlete is already registered for another sport.");
      }
      else{
        this.competitions_service.apply_athlete(comp, this.name, this.lastname, this.country_name, this.gender).subscribe((res) => {
          if (res['message'] == 'formed') {
            alert("This competition has been formed. It is not possible to register a competitor now.");
            name_dis.msg = "Formed."
          }
          else if (res['message'] == 'finished') {
            alert("This competition has been finished. It is not possible to register a competitor now.");
            name_dis.msg = "Finished."
          }
          else if (res['message'] == 'already registered') {
            alert("This athlete has already been registered for this competition.");
            name_dis.msg = "Added."
          }
          else if (res['message'] == 'ok') {
            this.athlete_service.set_new_athlete(this.name, this.lastname, this.country_name, this.gender, this.selected_sport, name_dis.name).subscribe((res) => {
              if (res['message'] == 'already exists') {
                alert("This athlete has already been in the system. He was added as a registered competitor for this discipline as well.");
                name_dis.msg = "Added";
              }
              else if (res['message'] == 'added') {
                this.athlete_service.set_first_disc(this.name, this.lastname, this.country_name, this.gender, this.selected_sport, name_dis.name).subscribe((res) => {
                  if (res["message"] == "ok") {
                    alert("This athlete was added as a registered competitor for this discipline.");
                    name_dis.msg = "Added";
                    this.athlete_service.add_medals_to_new_one(this.name, this.lastname, this.country_name, this.gender, this.selected_sport).subscribe((res)=>{
                      if (res['message'] == 'ok'){
                        //alert("")
                        if(name_dis.name=="Single"){
                          this.sports_service.set_holder_in_candidates(name_dis.name,"tennis",this.gender,this.name, this.lastname, this.country_name).subscribe((res)=>{
                            if (res['message'] == 'ok'){
                              
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
              else if (res['message'] == 'already registered') {
                alert("This athlete has already been registered for this competition.");
                name_dis.msg = "Added."
              }
            })
          }
        })
      }
    })
  }
  add(){
    this.athlete_service.add_medals_all().subscribe((res)=>{
      if (res["message"] == "ok") {
        alert("added")
      }
    })
  }
  register_sport(){
    let gndr="";
    if(this.gender=="m")gndr="Men";
    else gndr="Women";
    let comp=this.selected_sport+ " "+gndr;
    this.competitions_service.apply_athlete(comp,this.name,this.lastname,this.country_name,this.gender).subscribe((res)=>{
      if(res['message']=='formed'){
        alert("This competition has been formed. It is not possible to register a competitor now.");
        this.flag1_msg="The competition has been formed.";
      }
      else if(res['message']=='already registered'){
        alert("This athlete has already been registered for this competition.");
        this.flag1_msg="Added.";
      }
      else if(res['message']=='ok'){
        this.athlete_service.set_new_athlete(this.name,this.lastname,this.country_name,this.gender,this.selected_sport,"0").subscribe((res)=>{
          if(res['message']=='already exists'){
            alert("This athlete has already been in the system.");
            this.flag1_msg="Added.";
          }
          else if(res['message']=='added'){
            this.athlete_service.set_first_disc(this.name,this.lastname,this.country_name,this.gender,this.selected_sport,"0").subscribe((res)=>{
              if(res["message"]=="ok"){
                alert("This athlete was added as a registered competitor for this discipline.");
                this.flag1_msg="Added";
                this.athlete_service.add_medals_to_new_one(this.name, this.lastname, this.country_name, this.gender, this.selected_sport).subscribe((res)=>{
                  if (res['message'] == 'ok'){
                    //alert("")
                  }
                })
              }
            })
          }
          else if(res['message']=='already registered'){
            alert("This athlete has already been registered for this competition.");
            this.flag1_msg="Added."
          }
        })
      }
    })
  }

  show_my_competitors(){
    this.athlete_service.get_all_athletes_for_country(this.country_name).subscribe((data:Athlete[])=>{
      this.my_competitors=data;
      this.my_competitors_flag=1;
    })
  }

  hide_my_competitors(){
    this.my_competitors_flag=0;
  }
}
