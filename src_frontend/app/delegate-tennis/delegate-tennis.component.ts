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
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delegate-tennis',
  templateUrl: './delegate-tennis.component.html',
  styleUrls: ['./delegate-tennis.component.css']
})
export class DelegateTennisComponent implements OnInit {

  msg_about_time_start: string = "";
  finished: number = 0;
  formed: number = 0;

  new_bronze_array: Athlete[] = []
  new_silver_array: Athlete[] = []
  new_gold_array: Athlete[] = []
  gold: Athlete = null;
  silver: Athlete = null;
  bronze: Athlete = null;
  awarded_bronze: number = 0;
  awarded_silver: number = 0;
  awarded_gold: number = 0;
  awarded_medals: number = 0;
  flag: number = 0;
  games_fir_round: Array<Game_Obj> = [];
  games_quarter:Array<Game_Obj>=[];
  games_semi:Array<Game_Obj>=[];
  games_bronze:Array<Game_Obj>=[];
  games_gold:Array<Game_Obj>=[];
  want_quarterfinal:number=0;
  want_semifinal:number=0;
  want_bronze:number=0;
  want_gold:number=0;

  date_start: Date;
  date_end: Date;
  date_start_to_display: string = "";
  date_end_to_display: string = "";
  time_start: Time;
  location_obj: Location_Obj;
  location_name: string = "";
  time_sheduled: Time[];
  time_to_display: string[] = ["", ""];
  date_to_display: string[] = ["", ""];
  time_date_to_display: string[] = ["", ""];
  msg_time: string = "";
  flag2: number = 0;
  kind: number;
  all_games: Array<Game_Obj> = [];
  sport_name: string = "tennis";
  discipline_name: string;
  gender_name: string;
  holder_table: Holder;
  first: Array<Athlete> = [];
  second: Array<Athlete> = [];
  third: Array<Athlete> = [];
  fourth: Array<Athlete> = [];
  fifth: Array<Athlete> = [];
  sixth: Array<Athlete> = [];
  seventh: Array<Athlete> = [];
  eighth: Array<Athlete> = [];
  ninth: Array<Athlete> = [];
  tenth: Array<Athlete> = [];
  eleventh: Array<Athlete> = [];
  twelfth: Array<Athlete> = [];
  thirteenth: Array<Athlete> = [];
  fourteenth: Array<Athlete> = [];
  fifteenth: Array<Athlete> = [];
  sixteenth: Array<Athlete> = [];
  players_to_enter: Array<Athlete> = [];
  first_player: Athlete;
  second_player: Athlete;
  third_player: Athlete;
  fourth_player: Athlete;
  fifth_player: Athlete;
  sixth_player: Athlete;
  seventh_player: Athlete;
  eighth_player: Athlete;
  ninth_player: Athlete;
  tenth_player: Athlete;
  eleventh_player: Athlete;
  twelfth_player: Athlete;
  thirteenth_player: Athlete;
  fourteenth_player: Athlete;
  fifteenth_player: Athlete;
  sixteenth_player: Athlete;
  my_array_of_hldrs: Array<Athlete> = [];
  levels_of_comp: Level[] = [];
  flag_holders: number = 0;
  flag_to_set_players = 1;
  msg_to_set_players: string = "";
  show_games_flag: number = 0;
  want_to_show_games: number = 0;
  initialized: number = 0;
  players_scheduled: number = 0;
  result: string;
  indx: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  competition_name: string;
  competition_obj: Competition;
  msg_regex: string = "num:num";
  max_num: number = 0;
  finished_games:number[]=[1,1,2,4,8];
  can_next:number[]=[0,0,0,0];//final,bronze,semi,quarter

  constructor(private route: ActivatedRoute,
    private ruter: Router,
    private user_service: UserService,
    private competitions_service: CompetitionsService,
    private sports_service: SportsService,
    private athlete_service: AthletesService) { }

  ngOnInit(): void {
    this.competition_name = this.route.snapshot.paramMap.get('disc_name');
    let inf = this.competition_name.split(" ", 3);
    this.sport_name = inf[0];
    this.discipline_name = inf[2];
    if (inf[1] == "Men") this.gender_name = "m";
    else this.gender_name = "f";

    this.sports_service.get_all_levels_for_sport(this.sport_name).subscribe((data: Level[]) => {
      this.levels_of_comp = data;
    })

    this.sports_service.get_holder_table(this.discipline_name, this.sport_name, this.gender_name).subscribe((data: Holder) => {
      this.holder_table = data;
      this.first = this.holder_table.first;
      this.second = this.holder_table.second;
      this.third = this.holder_table.third;
      this.fourth = this.holder_table.fourth;
      this.fifth = this.holder_table.fifth;
      this.sixth = this.holder_table.sixth;
      this.seventh = this.holder_table.seventh;
      this.eighth = this.holder_table.eighth;
      this.ninth = this.holder_table.ninth;
      this.tenth = this.holder_table.tenth;
      this.eleventh = this.holder_table.eleventh;
      this.twelfth = this.holder_table.twelfth;
      this.thirteenth = this.holder_table.thirteenth;
      this.fourteenth = this.holder_table.fourteenth;
      this.fifteenth = this.holder_table.fifteenth;
      this.sixteenth = this.holder_table.sixteenth;
      this.my_array_of_hldrs[0] = this.first[0];
      this.my_array_of_hldrs[1] = this.second[0];
      this.my_array_of_hldrs[2] = this.third[0];
      this.my_array_of_hldrs[3] = this.fourth[0];
      this.my_array_of_hldrs[4] = this.fifth[0];
      this.my_array_of_hldrs[5] = this.sixth[0];
      this.my_array_of_hldrs[6] = this.seventh[0];
      this.my_array_of_hldrs[7] = this.eighth[0];
      this.my_array_of_hldrs[8] = this.ninth[0];
      this.my_array_of_hldrs[9] = this.tenth[0];
      this.my_array_of_hldrs[10] = this.eleventh[0];
      this.my_array_of_hldrs[11] = this.twelfth[0];
      this.my_array_of_hldrs[12] = this.thirteenth[0];
      this.my_array_of_hldrs[13] = this.fourteenth[0];
      this.my_array_of_hldrs[14] = this.fifteenth[0];
      this.my_array_of_hldrs[15] = this.sixteenth[0];
      this.initialized = 1;
    })

    this.competitions_service.get_competition_by_name(this.competition_name).subscribe((data: Competition) => {
      this, this.competition_obj = data;
      this.date_start = this.competition_obj.date_start;
      this.date_start_to_display = ((this.date_start + "").split("T", 2))[0];
      this.date_end = this.competition_obj.date_end;
      this.date_end_to_display = ((this.date_end + "").split("T", 2))[0];
      this.location_name = this.competition_obj.location;
      this.sports_service.get_loc_by_name(this.location_name).subscribe((res: Location_Obj) => {
        this.location_obj = res;
        this.time_sheduled = this.location_obj.time_scheduled;
        if (this.time_sheduled.length != 0) this.flag2 = 1;
        for (let i = 0; i < this.time_sheduled.length; i++) {
          let str = (this.time_sheduled[i]) + "";
          let str_1 = str.split("T", 2);
          this.time_to_display[i] = str_1[0];
          let str_2 = str_1[1];
          let str_3 = str_2.split("Z", 1);
          this.date_to_display[i] = str_3[0];
          this.time_date_to_display[i] = this.time_to_display[i] + " " + this.date_to_display[i];
        }
      })
      if (this.competition_obj.status == 2) {
        this.finished = 1;
        this.awarded_medals = 1;
        this.bronze = this.competition_obj.bronze;
        this.silver = this.competition_obj.silver;
        this.gold = this.competition_obj.gold;
      }

      if(this.competition_obj.status==1){
        this.formed=1;
      }
      else{
        this.formed=0;
      }

      this.flag = 1;

    })


  }

  set_silver(){
    if(this.silver!=null){
      this.athlete_service.set_silver(this.silver.name,this.silver.lastname,this.silver.country,this.gender_name).subscribe((res)=>{
        if (res['message'] == 'ok'){
          alert("A silver medal was awarded.")
        }
      })
    }
    else{
      alert("You are not able to increment medals.");
    }
  }
  set_bronze(){
    if(this.bronze!=null){
      this.athlete_service.set_bronze(this.bronze.name,this.bronze.lastname,this.bronze.country,this.gender_name).subscribe((res)=>{
        if (res['message'] == 'ok'){
          alert("A bronze medal was awarded.")
        }
      })
    }
    else{
      alert("You are not able to increment medals.");
    }
  }
  set_gold(){
    if(this.gold!=null){
      this.athlete_service.set_gold(this.gold.name,this.gold.lastname,this.gold.country,this.gender_name).subscribe((res)=>{
        if (res['message'] == 'ok'){
          alert("A gold medal was awarded.")
        }
      })
    }
    else{
      alert("You are not able to increment medals.");
    }
  }

  sort_games_all(gm) {
    //new Date() kreira trenutni datum i vreme
    let all = gm;
    return all.sort((a, b) => {
      if (b.level_num > a.level_num) return 1;
      else {
        if (b.level_num < a.level_num) return -1;
        else 0;
      }
    })
  }


  show_holders_fun() {
    this.flag_holders = 1;
  }
  hide_holders_fun() {
    this.flag_holders = 0;
  }

  set_time(gm) {
    if (this.finished == 1) {
      alert("This competition is finished. You are not able to enter a data.");
    }
    else if(this.formed == 0){
      alert("This competition is not formed. You are not able to enter a data.");
    }
    else {

      if(gm.date_to_enter==null || gm.time_to_enter==null){
        alert("All fields are required.")
      }
      else{
        if(this.date_start>gm.date_to_enter && this.date_start_to_display!=(gm.date_to_enter+"")){
          let msg="This competition have to held between "+this.date_start_to_display+" and "+this.date_end_to_display+".";
          alert(msg);
        }
        else if(this.date_end<gm.date_to_enter){
          let msg="This competition have to held between "+this.date_start_to_display+" and "+this.date_end_to_display+".";
          alert(msg);
        }
        else{
          if (gm.time_start+"" != "") {
            let str = this.date_start + "";
            str = (str.split("T", 2))[0];
            gm.msg_about_time_start = "This game is already scheduled for " + str + " at " + gm.time_start + ".";
            if (gm.status != 2) gm.msg_about_time_start = gm.msg_about_time_start + "You are able to change that."
            gm.old_datatime_flag=1;
            gm.old_datatime= gm.date_start+"T"+gm.time_start+"Z";
          }
          let flag = 0;
          for (let i = 0; i < this.time_sheduled.length; i++) {
            let date_t = gm.date_to_enter + "";
            let time_sel = date_t + " " + gm.time_to_enter + "";
            if (time_sel == this.time_date_to_display[i]) {
              flag = 1;
              alert("Location is not available in that term.");
            }
          }
          if (flag == 0) {
            let for_loc = gm.date_to_enter + "T" + gm.time_to_enter + "Z";
            //alert(for_loc)
            this.sports_service.set_time_for_loc(this.location_name, for_loc).subscribe((res) => {
              if (res["message"] == "ok") {
    
                this.competitions_service.set_time_start_in_game(gm.level, this.sport_name, this.discipline_name, this.gender_name, gm.group, gm.time_to_enter).subscribe((res) => {
                  if (res['message'] == 'ok') {
    
                    this.competitions_service.set_date_start_in_game(gm.level, this.sport_name, this.discipline_name, this.gender_name, gm.group, gm.date_to_enter).subscribe((res) => {
                      if (res['message'] == 'ok') {
                        alert("Date and time is set.")
                        if(gm.old_datatime_flag==1){
                          this.sports_service.remove_time_for_loc(this.location_name,gm.old_datatime).subscribe((res)=>{
                            if (res['message'] == 'ok'){
                              alert("Time is removed from location");
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            })
    
          }
        }
      }
    }
  }


  randomNumber_first_round(min, max) {
    let curr;
    while (true) {
      curr = Math.floor(Math.random() * (max - min + 1)) + min;
      if (curr == 1 || curr == 3 || curr == 5 || curr == 7 || curr == 9 || curr == 11 || curr == 13 || curr == 15) return curr;
    }
  }
  randomNumber_second_round(min, max) {
    let curr;
    while (true) {
      curr = Math.floor(Math.random() * (max - min + 1)) + min;
      if (curr == 2 || curr == 4 || curr == 6 || curr == 8 || curr == 10 || curr == 12 || curr == 14 || curr == 16) return curr;
    }
  }
  set_first_round() {
    let fir = 0;
    let sec = 0;
    let thrd = 0;
    let fou = 0;
    let fift = 0;
    let six = 0;
    let sev = 0;
    let eigh = 0;
    let curr = 0;
    while (fir == 0) {
      curr = this.randomNumber_first_round(1, 16);
      fir = curr;
    }
    while (sec == 0) {
      curr = this.randomNumber_first_round(1, 16);
      if (curr != fir) {
        sec = curr;
      }
    }
    while (thrd == 0) {
      curr = this.randomNumber_first_round(1, 16);
      if (curr != fir && curr != sec) {
        thrd = curr;
      }
    }
    while (fou == 0) {
      curr = this.randomNumber_first_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd) {
        fou = curr;
      }
    }
    while (fift == 0) {
      curr = this.randomNumber_first_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd && curr != fou) {
        fift = curr;
      }
    }
    while (six == 0) {
      curr = this.randomNumber_first_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd && curr != fou && curr != fift) {
        six = curr;
      }
    }
    while (sev == 0) {
      curr = this.randomNumber_first_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd && curr != fou && curr != fift && curr != six) {
        sev = curr;
      }
    }
    while (eigh == 0) {
      curr = this.randomNumber_first_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd && curr != fou && curr != fift && curr != six && curr != sev) {
        eigh = curr;
      }
    }
    this.first_player = this.my_array_of_hldrs[fir - 1];
    this.second_player = this.my_array_of_hldrs[sec - 1];
    this.third_player = this.my_array_of_hldrs[thrd - 1];
    this.fourth_player = this.my_array_of_hldrs[fou - 1];
    this.fifth_player = this.my_array_of_hldrs[fift - 1];
    this.sixth_player = this.my_array_of_hldrs[six - 1];
    this.seventh_player = this.my_array_of_hldrs[sev - 1];
    this.eighth_player = this.my_array_of_hldrs[eigh - 1];

  }
  set_second_round() {
    let fir = 0;
    let sec = 0;
    let thrd = 0;
    let fou = 0;
    let fift = 0;
    let six = 0;
    let sev = 0;
    let eigh = 0;
    let curr = 0;
    while (fir == 0) {
      curr = this.randomNumber_second_round(1, 16);
      fir = curr;
    }
    while (sec == 0) {
      curr = this.randomNumber_second_round(1, 16);
      if (curr != fir) {
        sec = curr;
      }
    }
    while (thrd == 0) {
      curr = this.randomNumber_second_round(1, 16);
      if (curr != fir && curr != sec) {
        thrd = curr;
      }
    }
    while (fou == 0) {
      curr = this.randomNumber_second_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd) {
        fou = curr;
      }
    }
    while (fift == 0) {
      curr = this.randomNumber_second_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd && curr != fou) {
        fift = curr;
      }
    }
    while (six == 0) {
      curr = this.randomNumber_second_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd && curr != fou && curr != fift) {
        six = curr;
      }
    }
    while (sev == 0) {
      curr = this.randomNumber_second_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd && curr != fou && curr != fift && curr != six) {
        sev = curr;
      }
    }
    while (eigh == 0) {
      curr = this.randomNumber_second_round(1, 16);
      if (curr != fir && curr != sec && curr != thrd && curr != fou && curr != fift && curr != six && curr != sev) {
        eigh = curr;
      }
    }
    this.ninth_player = this.my_array_of_hldrs[fir - 1];
    this.tenth_player = this.my_array_of_hldrs[sec - 1];
    this.eleventh_player = this.my_array_of_hldrs[thrd - 1];
    this.twelfth_player = this.my_array_of_hldrs[fou - 1];
    this.thirteenth_player = this.my_array_of_hldrs[fift - 1];
    this.fourteenth_player = this.my_array_of_hldrs[six - 1];
    this.fifteenth_player = this.my_array_of_hldrs[sev - 1];
    this.sixteenth_player = this.my_array_of_hldrs[eigh - 1];

  }
  schedule_fun() {
    this.set_first_round();
    this.set_second_round();
    this.players_to_enter[0] = this.first_player;
    this.players_to_enter[1] = this.second_player;
    this.players_to_enter[2] = this.third_player;
    this.players_to_enter[3] = this.fourth_player;
    this.players_to_enter[4] = this.fifth_player;
    this.players_to_enter[5] = this.sixth_player;
    this.players_to_enter[6] = this.seventh_player;
    this.players_to_enter[7] = this.eighth_player;
    this.players_to_enter[8] = this.ninth_player;
    this.players_to_enter[9] = this.tenth_player;
    this.players_to_enter[10] = this.eleventh_player;
    this.players_to_enter[11] = this.twelfth_player;
    this.players_to_enter[12] = this.thirteenth_player;
    this.players_to_enter[13] = this.fourteenth_player;
    this.players_to_enter[14] = this.fifteenth_player;
    this.players_to_enter[15] = this.sixteenth_player;

    this.players_scheduled = 1;
  }

  set_plyrs_first_round() {
    if (this.players_scheduled == 0) {
      alert("You have to schedule the players first.");
    }
    else if (this.flag_to_set_players == 1) {
      let lev = this.levels_of_comp[4].level
      let sp = this.sport_name
      let dis = this.discipline_name
      let gen = this.gender_name
      let tm = ["team_A", "team_B", "team_A", "team_B", "team_A", "team_B", "team_A", "team_B", "team_A", "team_B", "team_A", "team_B", "team_A", "team_B", "team_A", "team_B"]
      let grp = ["left_A","left_A","left_B","left_B","left_C","left_C","left_D","left_D","right_A","right_A","right_B","right_B","right_C","right_C","right_D","right_D"]

      for (let i = 0; i < 16; i++) {
        this.competitions_service.set_participant_in_game(lev, sp, dis, gen, grp[i % 16], this.players_to_enter[i].name, this.players_to_enter[i].lastname, this.players_to_enter[i].country, tm[i % 16]).subscribe((res) => {
          if (res['message'] == 'there are max participants') {
            alert("It is not possible to set participant, because there are the maximum number of participants already set.")
          }
          else {
            this.competitions_service.inc_curr_par_in_game(4, sp, dis, gen, grp[i % 16]);
          }
        })
      }
      alert("Participants are set for first round.")
    }
    else {
      alert("Players for first round are selected and entered into the system, it is not possible to enter data now.");
      this.msg_to_set_players = "Players for first round are selected and entered into the system.";
    }
  }
  show_games_next(id:number){

      let sp = this.sport_name
      let dis = this.discipline_name
      let gen = this.gender_name
      let flg=0;
      let tmp:Game_Obj[]=[];
      this.competitions_service.get_games_for_level(this.levels_of_comp[id+1].level, sp, dis, gen).subscribe((data:Game_Obj[])=>{
        tmp=data;
        for(let i=0;i<tmp.length;i++){
          if(tmp[i].result+"" ==""){
            flg=1;
          }
        }
        if(flg==0){
          if(id==3){
            this.want_quarterfinal=1;
          }
          else if(id==2){
            this.want_semifinal=1;
          }
          else if(id==1){
            this.want_bronze=1;
          }
          else if(id==0){
            this.want_gold=1;
          }
          let lev = this.levels_of_comp[id].level
          let array:Array<Game_Obj>=[];
      
          this.competitions_service.get_games_for_level(lev, sp, dis, gen).subscribe((data: Game_Obj[]) => {
            if(id==3){
              this.games_quarter = data;
              array=this.games_quarter;
            }
            else if(id==2){
              this.games_semi = data;
              array=this.games_semi;
            }
            else if(id==1){
              this.games_bronze=data;
              array=this.games_bronze;
            }
            else if(id==0){
              this.games_gold=data;
              array=this.games_gold;
            }
            for(let i=0;i<array.length;i++){
              if (array[i].time_start+"" != "") {
                let str = this.date_start + "";
                str = (str.split("T", 2))[0];
      
                if(id==3){
                  this.games_quarter[i].msg_about_time_start = "This game is already scheduled for " + str + " at " + this.games_quarter[i].time_start + ".";
                  if (this.games_quarter[i].status != 2) this.games_quarter[i].msg_about_time_start = this.games_quarter[i].msg_about_time_start + "You are able to change that."
                }
                else if(id==2){
                  this.games_semi[i].msg_about_time_start = "This game is already scheduled for " + str + " at " + this.games_semi[i].time_start + ".";
                  if (this.games_semi[i].status != 2) this.games_semi[i].msg_about_time_start = this.games_semi[i].msg_about_time_start + "You are able to change that."
                }
                else if(id==1){
                  this.games_bronze[i].msg_about_time_start = "This game is already scheduled for " + str + " at " + this.games_bronze[i].time_start + ".";
                  if (this.games_bronze[i].status != 2) this.games_bronze[i].msg_about_time_start = this.games_bronze[i].msg_about_time_start + "You are able to change that."
                }
                else if(id==0){
                  this.games_gold[i].msg_about_time_start = "This game is already scheduled for " + str + " at " + this.games_gold[i].time_start + ".";
                  if (this.games_gold[i].status != 2) this.games_gold[i].msg_about_time_start = this.games_gold[i].msg_about_time_start + "You are able to change that."
                }
              }
             }
             this.can_next[id]=1;
          })
  
        }
        else{
          alert("You are not able to see another round, because previous round are not finished");
        }
      })

  }
  hide_games_next(id:number){
    if(id==3){
      this.want_quarterfinal=0;
    }
    else if(id==2){
      this.want_semifinal=0;
    }
    else if(id==1){
      this.want_bronze=0;
    }
    else if(id==0){
      this.want_gold=0;
    }
  }

  show_games() {
    let lev1 = this.levels_of_comp[4].level
    let sp = this.sport_name
    let dis = this.discipline_name
    let gen = this.gender_name

    this.competitions_service.get_games_for_level(lev1, sp, dis, gen).subscribe((data: Game_Obj[]) => {
      this.games_fir_round = data;
      this.want_to_show_games = 1;
       for(let i=0;i<this.games_fir_round.length;i++){
        if (this.games_fir_round[i].time_start+"" != "") {
          let msg=i+" "+this.games_fir_round[i].time_start;
          //alert(msg)
          let msg2=this.games_fir_round[i].date_start+"T"+this.games_fir_round[i].time_start+"Z";
          //alert(msg2)
          let str = this.date_start + "";
          str = (str.split("T", 2))[0];
          this.games_fir_round[i].msg_about_time_start = "This game is already scheduled for " + str + " at " + this.games_fir_round[i].time_start + ".";
          if (this.games_fir_round[i].status != 2) this.games_fir_round[i].msg_about_time_start = this.games_fir_round[i].msg_about_time_start + "You are able to change that."
        }
       }
    })
  }
  hide_games() {
    this.want_to_show_games = 0;
  }

  enter(curr_game:Game_Obj) {

    if(this.finished==1){
      alert("This competition is finished. You are not able to enter a data.");
    }
    else if(this.formed == 0){
      alert("This competition is not formed. You are not able to enter a data.");
    }
    else{

      let tmp:Game_Obj;

      this.competitions_service.get_game(curr_game.level,curr_game.sport,curr_game.discipline,curr_game.gender,curr_game.group).subscribe((data:Game_Obj)=>{
        tmp=data;
        if(tmp.date_start+"" =="" || tmp.time_start+""==""){
          alert("You have to enter date and time first.");
        }
        else if( curr_game.curr_res==null){
          alert("You have to enter a result.");
        }
        else{
  
          if(tmp.result+""==""){
  
            let ar:string[];
            let strg = curr_game.curr_res;
            ar = strg.split(":", 2);
            let a = ar[0];
            let b = ar[1];
            let a_res = this.string_to_int(a);
            let b_res = this.string_to_int(b);
            let name = "";
            let lastname = "";
            let country = "";
            let nameb = "";
            let lastnameb = "";
            let countryb = "";
            this.competitions_service.set_result_in_game(curr_game.level, curr_game.sport, curr_game.discipline, curr_game.gender, curr_game.group, curr_game.curr_res).subscribe((res) => {
              if (res["message"] == "ok") {
                
                this.competitions_service.set_status_in_game(curr_game.level,this.sport_name,this.discipline_name,this.gender_name,curr_game.group,2).subscribe((res)=>{
                  if (res["message"] == "ok"){
                    alert("This match is finished.");
                  }
                })
              }
            })
            if (a_res > b_res) {
              curr_game.winn_num = 1;
              name = curr_game.team_A.name;
              lastname = curr_game.team_A.lastname;
              country = curr_game.team_A.country;
              nameb = curr_game.team_B.name;
              lastnameb = curr_game.team_B.lastname;
              countryb = curr_game.team_B.country;
              // alert(name);
              // alert(lastname);
              // alert(country);
              this.competitions_service.set_winner_in_game(curr_game.level, curr_game.sport, curr_game.discipline, curr_game.gender, curr_game.group, name, lastname, country).subscribe((res) => {
                if (res["message"] == "ok") {
                  // alert("winner is set.");
                }
              })
            }
            else {
              curr_game.winn_num = 2;
              name = curr_game.team_B.name;
              lastname = curr_game.team_B.lastname;
              country = curr_game.team_B.country;
              nameb = curr_game.team_A.name;
              lastnameb = curr_game.team_A.lastname;
              countryb = curr_game.team_A.country;
              this.competitions_service.set_winner_in_game(curr_game.level, curr_game.sport, curr_game.discipline, curr_game.gender, curr_game.group, name, lastname, country).subscribe((res) => {
                if (res["message"] == "ok") {
                  // alert("winner is set.");
                }
              })
            }
        
        
        
            if (curr_game.serial_num % 2 == 1 && curr_game.level_num > 2) {
              //this.competitions_service.set_participant_in_game(,curr_game.sport,curr_game.discipline,curr_game.gender,curr_game.group,name,lastname,country)
              let lev = curr_game.level_num - 1;
              this.competitions_service.set_participant_in_game_simply(lev, curr_game.sport, curr_game.discipline, curr_game.gender, curr_game.next, name, lastname, country, "team_A").subscribe((res) => {
                if (res["message"] == "ok") {
                  alert("Participant is set in the next level.");
                  this.competitions_service.inc_curr_par_in_game(lev, curr_game.sport, curr_game.discipline, curr_game.gender,curr_game.next).subscribe((res)=>{
                    if (res["message"] == "ok"){
                      //alert("JEEEE");
                    }
                  })
                }
              })
            }
            else if (curr_game.serial_num % 2 == 0 && curr_game.level_num > 2) {
              let lev = curr_game.level_num - 1;
              this.competitions_service.set_participant_in_game_simply(lev, curr_game.sport, curr_game.discipline, curr_game.gender, curr_game.next, name, lastname, country, "team_B").subscribe((res) => {
                if (res["message"] == "ok") {
                  alert("Participant is set in the next level.");
                  this.competitions_service.inc_curr_par_in_game(lev, curr_game.sport, curr_game.discipline, curr_game.gender,curr_game.next).subscribe((res)=>{
                    if (res["message"] == "ok"){
                      //alert("JEEEE");
                    }
                  })
                }
              })
            }//level_num==2, semifinal,go to final/bronze
            else {
              if (curr_game.level_num == 2) {
  
                if (curr_game.serial_num % 2 == 1) {
                  //for gold
                  this.competitions_service.set_participant_in_game_simply(0, curr_game.sport, curr_game.discipline, curr_game.gender, 16, name, lastname, country, "team_A").subscribe((res) => {
                    if (res["message"] == "ok") {
                      alert("Participant is set in the next level.");
                      this.competitions_service.inc_curr_par_in_game(0, curr_game.sport, curr_game.discipline, curr_game.gender,16).subscribe((res)=>{
                        if (res["message"] == "ok"){
                          //alert("JEEEE");
                        }
                      })
                    }
                  });
                  //for bronze
                  this.competitions_service.set_participant_in_game_simply(1, curr_game.sport, curr_game.discipline, curr_game.gender,15, nameb, lastnameb, countryb, "team_A").subscribe((res) => {
                    if (res["message"] == "ok") {
                      alert("Participant is set in the next level.");
                      this.competitions_service.inc_curr_par_in_game(1, curr_game.sport, curr_game.discipline, curr_game.gender,15).subscribe((res)=>{
                        if (res["message"] == "ok"){
                          //alert("JEEEE");
                        }
                      })
                    }
                  });
                }
              
  
                else if (curr_game.serial_num % 2 == 0) {
                  //for gold
                  this.competitions_service.set_participant_in_game_simply(0, curr_game.sport, curr_game.discipline, curr_game.gender, 16, name, lastname, country, "team_B").subscribe((res) => {
                    if (res["message"] == "ok") {
                      alert("Participant is set in the next level.");
                      this.competitions_service.inc_curr_par_in_game(0, curr_game.sport, curr_game.discipline, curr_game.gender,16).subscribe((res)=>{
                        if (res["message"] == "ok"){
                          //alert("JEEEE");
                        }
                      })
                    }
                  });
                  //for bronze
                  this.competitions_service.set_participant_in_game_simply(1, curr_game.sport, curr_game.discipline, curr_game.gender,15, nameb, lastnameb, countryb, "team_B").subscribe((res) => {
                    if (res["message"] == "ok") {
                      alert("Participant is set in the next level.");
                      this.competitions_service.inc_curr_par_in_game(1, curr_game.sport, curr_game.discipline, curr_game.gender,15).subscribe((res)=>{
                        if (res["message"] == "ok"){
                          //alert("JEEEE");
                        }
                      })
                    }
                  });
                }
              
              }
  
              else if(curr_game.level_num==1){
                this.competitions_service.set_bronze(this.competition_name,name,lastname,country,this.gender_name).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.awarded_bronze=1;
                  }
                })
              }
              else if(curr_game.level_num==0){
                this.competitions_service.set_silver(this.competition_name,nameb,lastnameb,countryb,this.gender_name).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.awarded_silver=1;
  
                    this.competitions_service.set_gold(this.competition_name,name,lastname,country,this.gender_name).subscribe(res=>{
                      if(res['message']=='ok'){
                        this.awarded_gold=1;
                        if(this.bronze!=null && this.awarded_silver==1 && this.awarded_bronze==1){
                          this.awarded_bronze=1;
                          let cmp:Competition;
                          this.competitions_service.get_competition_by_name(this.competition_name).subscribe((data:Competition)=>{
                            cmp=data;
                            this.bronze=cmp.bronze;
                            this.silver=cmp.silver;
                            this.gold=cmp.gold;
  
                            this.competitions_service.set_status(this.competition_name,2).subscribe((res)=>{
                              if(res['message']=='ok'){
                                alert("This competition is finished.");
                                this.finished=1;
                                this.awarded_medals=1;
                              }
                            })
                          })
                        }
                      }
                    })
                  }
                })
              }
            }
    
          }
          else{
            curr_game.msg_about_res="The result for this game has already set( "+tmp.result+" )."
            alert("The result for this game has already set. You are not able to change that.");
          }
  
        }
      })

    }
  }

  string_to_int(num) {
    for (let i = 0; i < 10; i++) {
      if (num == this.indx[i]) {
        //alert(i);
        return i;
      }
    }
  }

}
