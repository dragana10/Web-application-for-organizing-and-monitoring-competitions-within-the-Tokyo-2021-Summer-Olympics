import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionsService } from '../competitions.service';
import { Athlete } from '../model/athlete';
import { Competition } from '../model/competition';
import { Discipline } from '../model/disciplines';
import { Holder } from '../model/holders';
import { Level } from '../model/level';
import { Location_Obj } from '../model/location';
import { Sport } from '../model/sports';
import { User } from '../model/user';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  bronze:Athlete;
  silver:Athlete;
  gold:Athlete;
  there_are_medals: number = 0;
  has_rqsts: number = 0;
  msg_has_rqsts: string = "";
  name: string;
  competition: Competition;
  num_par: number;
  registered_competitors: Athlete[];
  selected_competitors: Athlete[]=[];
  name_of_sport: string = "";
  sport: Sport;
  kind: number;
  disciplines: Discipline[];
  location_name: string = "";
  location_obj: Location_Obj;
  locations: Location_Obj[];
  level_name: string = "";
  level_obj: Level;
  levels: Level[];
  selected_discipline: string;
  selected_discipline_obj: Discipline;
  kind_disc: number;
  the_disc_is_chosen: number = 0;
  msg_kind: string = "";
  gender: string;
  start_date: Date;
  end_date: Date;
  error: string = "";
  spc: string = " ";
  delegate_name: string;
  delegate_obj: User;
  delegates: User[];
  username: string;
  flag: number = 0;
  msg_req: string = "";
  holder_table: Holder;
  candidates: Athlete[];
  is_tennis: number = 0;
  show_candidates: number = 0;
  msg_candidates: string = "";
  first: string = "";
  second: string = "";
  third: string = "";
  fourth: string = "";
  fifth: string = "";
  sixth: string = "";
  seventh: string = "";
  eighth: string = "";
  ninth: string = "";
  tenth: string = "";
  eleventh: string = "";
  twelfth: string = "";
  thirteenth: string = "";
  fourteenth: string = "";
  fifteenth: string = "";
  sixteenth: string = "";
  set_holders: number = 0;
  msg_set_holders: string = "All fields have to be different";
  show_req_flag: number = 0;
  show_selected: number = 0;
  url: string = 'organization/form_a_competition/competition/:name/:name1';
  msg_ab_time_to_dis: string = "";
  msg_about_delegate: string = "";
  flag_about_delegate: number = 0;
  finished: number = 0;
  formed: number = 0;

  constructor(private route: ActivatedRoute,
    private ruter: Router,
    private sports_service: SportsService,
    private competitions_service: CompetitionsService,
    private user_service: UserService) { }

  ngOnInit(): void {
    this.name_of_sport = this.route.snapshot.paramMap.get('name');
    if (this.name_of_sport == "tennis") {
      this.is_tennis = 1;
    }
    this.sports_service.get_sport_by_name(this.name_of_sport).subscribe((data: Sport) => {
      this.sport = data;
      this.kind = this.sport.kind;
    })
    this.sports_service.find_disciplines_for_sport(this.name_of_sport).subscribe((disciplines: Discipline[]) => {
      this.disciplines = disciplines;
    })
    this.sports_service.get_all_locations_for_sport(this.name_of_sport).subscribe((loc: Location_Obj[]) => {
      this.locations = loc;
    })
    this.sports_service.get_all_levels_for_sport(this.name_of_sport).subscribe((lvls: Level[]) => {
      this.levels = lvls;
    })
    this.user_service.find_acc_and_free_deleg().subscribe((data: User[]) => {
      this.delegates = data;
    })
  }


  get_locations_for_discipline() {

    if (this.selected_discipline) {
      this.sports_service.get_all_locations_for_discipline(this.selected_discipline).subscribe((loc: Location_Obj[]) => {
        this.locations = loc;
      })
    }
    this.sports_service.find_discipline_by_name(this.selected_discipline).subscribe((dis: Discipline) => {
      this.selected_discipline_obj = dis;
      this.kind_disc = this.selected_discipline_obj.kind;
      this.the_disc_is_chosen = 1;
      if (this.kind_disc == 0) {
        this.msg_kind = "This is an exclusively individual sport(discipline).";
      }
      else if (this.kind_disc == 1) {
        this.msg_kind = "This is exclusively a team sport(discipline).";
      }
    })
  }

  get_location_by_name() {
    this.sports_service.get_loc_by_name(this.location_name).subscribe((data: Location_Obj) => {
      this.location_obj = data;
    })
  }
  get_level_by_name() {
    this.sports_service.get_lev_by_name(this.level_name).subscribe((data: Level) => {
      this.level_obj = data;
    })
  }

  enter_data() {
    if (this.name_of_sport!='tennis' &&  (this.selected_discipline == "" || this.gender == "" || this.location_name == "" || this.level_name == "")) {
      alert("All fields are required");
      this.error = "All fields are required";
    }
    else if(this.name_of_sport=='tennis' && (this.selected_discipline == "" || this.gender == "" || this.location_name == "")){
      alert("All fields are required");
      this.error = "All fields are required";
    }
    else {
      this.flag = 1;
      this.error = " ";
      let nm;
      let gndr;
      if (this.gender == 'm') gndr = "Men";
      else gndr = "Women";
      this.name = this.name_of_sport + " " + gndr + " " + this.selected_discipline;
      this.competitions_service.get_competition_by_name(this.name).subscribe((cm: Competition) => {
        this.competition = cm;
        this.num_par = this.competition.num_par;
        this.registered_competitors = this.competition.to_apply;
        if (cm.date_start != null && cm.status == 0) {
          let str = cm.date_start + "";
          let str1: string[];
          str1 = str.split("T", 2);
          str = str1[0];
          this.msg_ab_time_to_dis = "This competition is already scheduled for " + str + ", but you are able to change that.";
        }
        if (this.registered_competitors.length == 0) {
          this.has_rqsts = 0;
          this.msg_has_rqsts = "There are no requests for this competition yet.";
        }
        else {
          this.has_rqsts = 1;
        }

        if (this.competition.delegate != "") {
          this.msg_about_delegate = "Delegate for this competition is already set. Delegate's username is " + this.competition.delegate + ".";
          this.flag_about_delegate = 1;
        }

        if (this.competition.status == 2) {
          this.finished = 1;
          this.there_are_medals=1;
          this.bronze=this.competition.bronze;
          this.silver=this.competition.silver;
          this.gold=this.competition.gold;
        }
        if (this.competition.status == 1) {
          this.formed = 1;
        }

      })
      if (this.name_of_sport == "tennis") {
        this.sports_service.get_holder_table(this.selected_discipline, this.name_of_sport, this.gender).subscribe((res: Holder) => {
          this.holder_table = res;
          this.candidates = this.holder_table.candidates;
        })
      }
      this.url = this.url + "" + this.name_of_sport + "/" + this.name;
    }
  }

  add_delegate_to_compet() {
    if (this.finished == 1 || this.formed == 1) {
      alert("You are not able to set a delegate.");
    }
    else {
      var name_and_lastname = this.delegate_name.split(" ", 2);
      var name = name_and_lastname[0];
      var lastname = name_and_lastname[1];
      let comp: Competition;
      let del: User;
      this.user_service.find_deleg_by_name_and_lastname(name, lastname).subscribe((data: User) => {
        del = data;

        this.competitions_service.get_competition_by_name(this.name).subscribe((data: Competition) => {
          comp = data;
          if (comp.delegate == del.username) {
            alert("This delegate was already chosen for this competition.");
          }
          else if (comp.delegate != "") {
            alert("There is delegate for this competition.");
          }
          else {
            this.user_service.find_deleg_by_name_and_lastname_for_comp(name, lastname).subscribe((data: User) => {
              if (data.num_compet > 3) {
                alert("This delegate has 3 or more competitions. Please, chose another one.");
              }
              else {
                this.delegate_obj = data;
                this.username = this.delegate_obj.username;
                this.competitions_service.set_delegate(this.name, this.username).subscribe(res => {
                  if (res['message'] == 'ok') {
                    alert("Delegate is set.");
                  }
                })
              }
            })
          }
        })


      })
    }
  }

  set_date_start() {
    if (this.formed == 1 || this.finished == 1) {
      alert("You are not able to set a start date.");
    }
    else {
      this.competitions_service.set_date_start(this.name, this.start_date).subscribe(res => {
        if (res['message'] == 'ok') {
          //alert("ok");
        }
      })
    }
  }
  set_date_end() {
    if (this.formed == 1 || this.finished == 1) {
      alert("You are not able to set a end date.");
    }
    else {
      this.competitions_service.set_date_end(this.name, this.end_date).subscribe(res => {
        if (res['message'] == 'ok') {
          //alert("ok");
        }
      })
    }
  }

  show_req() {
    this.show_req_flag = 1;
    this.competitions_service.get_competition_by_name(this.name).subscribe((cm: Competition) => {
      this.competition = cm;
      this.num_par = this.competition.num_par;
      this.msg_req = "(max competitors are " + this.num_par+" )";
      this.registered_competitors = this.competition.to_apply;
    })
  }
  hide_req() {
    this.show_req_flag = 0;
  }

  add(part) {
    if (this.formed == 1 || this.finished == 1) {
      alert("You are not able to add a participant.");
    }
    else {
      if (this.selected_competitors.length >= this.competition.num_par) {
        let msg = "The number of participants for this competition is ";
        msg = msg + this.num_par;
        msg = msg + ".(all participants have already been selected)"
        alert(msg);
        this.msg_req = msg;
      }
      else {
        this.competitions_service.set_participant(this.name, part.name, part.lastname, part.country, part.gender, part.disciplines, part.medals).subscribe(res => {
          if (res['message'] == 'already exists') {
            alert("This athlete is already added to participants.")
          }
        })
        this.competitions_service.get_competition_by_name(this.name).subscribe((cm: Competition) => {
          this.competition = cm;
          this.selected_competitors = this.competition.participants;
        })
      }
    }
  }

  remove(part) {
    if (this.formed == 1 || this.finished == 1) {
      alert("You are not able to remove a participant.");
    }
    else {
      this.competitions_service.remove_participant(this.name, part.name, part.lastname, part.country, part.gender, part.disciplines, part.medals).subscribe(res => {
        if (res['message'] == 'ok') {
          alert("removed")
        }
      })


      this.competitions_service.get_competition_by_name(this.name).subscribe((cm: Competition) => {
        this.competition = cm;
        this.selected_competitors = this.competition.participants;
      })
    }
  }

  show() {
    this.show_selected = 1;
    this.competitions_service.get_competition_by_name(this.name).subscribe((cm: Competition) => {
      this.competition = cm;
      this.selected_competitors = this.competition.participants;
    })
    window.location.reload;
  }

  hide() {
    this.show_selected = 0;
  }

  form_a_compet(){
    if(this.finished==1 || this.formed==1){
      alert("You are not able to form a competition.");
    }
    else{
      this.competitions_service.get_competition_by_name(this.name).subscribe((cm: Competition) => {
        this.competition = cm;
        if(this.name_of_sport!='tennis' &&  (this.competition.participants.length<this.competition.num_par || this.competition.date_end==null || this.competition.date_start==null || this.competition.delegate=="")){
          alert("You have to enter all required data before forming a competition.");
        }
        else if(this.name_of_sport=='tennis' &&  (this.competition.date_end==null || this.competition.date_start==null || this.competition.delegate=="")){
          alert("You have to enter all required data before forming a competition.");
        }

        else{
          this.competitions_service.set_status(this.name,1).subscribe((res)=>{
            if (res['message'] == 'ok') {
              this.formed=1;
              alert("This competition is formed.")
            }
          })
        }
      })
    }
  }

  set_holder_first() {
    if (this.formed == 1 || this.finished == 1) {
      alert("You are not able to set a delegate.");
    }
    else{
      // this.sports_service.set_first_holder(this.selected_discipline, this.name_of_sport, this.gender, "Novak", "DJOKOVIC", "Serbia").subscribe(res => {
      //   if (res['message'] == 'ok') {
      //     alert("added")
      //   }
      // })
    }
  }

  are_there_2_the_same(arr:string[]){
    let temp="";
    let found=0;
    for(let i=0;i<arr.length;i++){
      temp=arr[i];
      for(let j=i+1;j<arr.length;j++){
        if(temp==arr[j]){
          found=1;
        }
      }
    }
    return found;
  }

  enter_holders() {
    if (this.formed == 1 || this.finished == 1) {
      alert("You are not able to set a holders.");
    }
    else if(this.holder_table.candidates.length<this.holder_table.num_of_hldrs){
      alert("You are not able to enter a holders. Insufficient number of registered competitors.")
    }
    else if(this.holder_table.first!=null){
      alert("You are not able to set a holders. They are already set.");
    }
    else{
      let arr=[this.first,this.second,this.third,this.fourth,this.fifth,this.sixth,this.seventh,this.eighth,this.ninth,this.tenth,this.eleventh,this.twelfth,this.thirteenth,this.fourteenth,this.fifteenth,this.sixteenth];
      if(this.are_there_2_the_same(arr)==1){
        alert("All fields have to be different.");
      }
      else{
        var full_name = this.first.split(" ", 3);
        var lstnm = full_name[0];
        var nm = full_name[1];
        var cntr = this.first.substr((nm.length+lstnm.length+2));
    
        this.sports_service.set_first_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.second.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.second.substr((nm.length+lstnm.length+2));
        this.sports_service.set_second_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            // alert("added")
          }
        })
    
        full_name = this.third.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.third.substr((nm.length+lstnm.length+2));
        this.sports_service.set_third_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.fourth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.fourth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_fourth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.fifth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.fifth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_fifth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.sixth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.sixth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_sixth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.seventh.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.seventh.substr((nm.length+lstnm.length+2));
        this.sports_service.set_seventh_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.eighth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.eighth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_eighth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            // alert("added")
          }
        })
    
        full_name = this.ninth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.ninth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_ninth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.tenth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.tenth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_tenth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.eleventh.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.eleventh.substr((nm.length+lstnm.length+2));
        this.sports_service.set_eleventh_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.twelfth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.twelfth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_twelfth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.thirteenth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.thirteenth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_thirteenth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            //alert("added")
          }
        })
    
        full_name = this.fourteenth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.fourteenth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_fourteenth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            // alert("added")
          }
        })
    
        full_name = this.fifteenth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.fifteenth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_fifteenth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            // alert("added")
          }
        })
    
        full_name = this.sixteenth.split(" ", 3);
        lstnm = full_name[0];
        nm = full_name[1];
        var cntr = this.sixteenth.substr((nm.length+lstnm.length+2));
        this.sports_service.set_sixteenth_holder(this.selected_discipline, this.name_of_sport, this.gender, nm, lstnm, cntr).subscribe(res => {
          if (res['message'] == 'ok') {
            alert("Holders are set.")
          }
        })

      }
    }
  }

  show_candidates_fun() {
    if (this.flag == 0) {
      this.msg_candidates = "All previously fields are required";
    }
    else {
      this.msg_candidates = "";
      this.show_candidates = 1;
    }
  }
  hide_candidates_fun() {
    this.show_candidates = 0;
  }
  set_holders_fun() {
    this.set_holders = 1;
  }

  change(val: any) {
    let vl = val;
    alert(vl);
    var str = vl;
    var splitted = str.split(" ", 2);
    var prvi = splitted[0];
    var drugi = splitted[1];
    alert(prvi);
    alert(drugi);
  }

}
