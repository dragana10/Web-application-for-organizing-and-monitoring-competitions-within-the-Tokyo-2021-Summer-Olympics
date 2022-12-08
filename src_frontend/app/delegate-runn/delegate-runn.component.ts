import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { Athlete } from '../model/athlete';
import { Competition } from '../model/competition';
import { Location_Obj } from '../model/location';
import { User } from '../model/user';
import { SportsService } from '../sports.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delegate-runn',
  templateUrl: './delegate-runn.component.html',
  styleUrls: ['./delegate-runn.component.css']
})
export class DelegateRunnComponent implements OnInit {

  msg_about_time_start: string = "";
  finished: number = 0;
  formed: number = 0;


  msg_abt_par: string;
  competition_name: string;
  competition_obj: Competition;
  competitions: Competition[];
  flag: number = 0;
  delegate_username: string;
  delegate: User;
  date_start: Date;
  date_end: Date;
  time_start: Time;
  location_obj: Location_Obj;
  location_name: string = "";
  time_sheduled: Time[];
  time_to_display: string[] = ["", ""];
  date_to_display: string[] = ["", ""];
  time_date_to_display: string[] = ["", ""];
  date_start_to_display: string = "";
  date_end_to_display: string = "";
  msg_time: string = "";
  flag2: number = 0;
  kind: number;
  sport_name: string;
  discipline_name: string;
  gender_name: string;
  participants: Array<Athlete>;
  msg_regex: string = "ss,tt";
  new_bronze: number = 0;
  new_silver: number = 0;
  new_gold: number = 0;
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
  levels_of_comp: Array<String> = [];
  reg0: string = "";
  reg1: string = "";
  reg2: string = "";
  reg3: string = "";
  reg4: string = "";
  kind_athl: number = 0; //0 100m, 1 800 5000 10000, 2 marathon, 3 cycling

  constructor(private route: ActivatedRoute,
    private ruter: Router,
    private user_service: UserService,
    private competitions_service: CompetitionsService,
    private sports_service: SportsService,
    private athlete_service: AthletesService) { }

  ngOnInit(): void {
    this.competition_name = this.route.snapshot.paramMap.get('disc_name');
    this.competitions_service.get_competition_by_name(this.competition_name).subscribe((data: Competition) => {
      this.competition_obj = data;
      this.sport_name = this.competition_obj.sport;
      this.discipline_name = this.competition_obj.discipline;
      this.gender_name = this.competition_obj.gender;
      this.kind = this.competition_obj.kind;
      this.date_start = this.competition_obj.date_start;
      this.date_end = this.competition_obj.date_end;
      this.date_to_display_fun(this.date_start, this.date_end);
      this.location_name = this.competition_obj.location;
      this.levels_of_comp = this.competition_obj.level;
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
      this.participants = this.competition_obj.participants;
      if (this.participants.length == 0) {
        this.msg_abt_par = "There are no participants yet.";
      }
      this.flag = 1;

      let str = this.discipline_name.split(" ", 3);
      let t0 = str[0];
      if (this.sport_name == "swimming" || (this.sport_name == "athletics" && (t0 == "100m" || t0 == "200m" || t0 == "400m"))) {
        this.reg0 = "ss";
        this.reg1 = ",";
        this.reg2 = "cc";
      }
      else if (this.sport_name == "athletics" && (t0 == "800m" || t0 == "5000m" || t0 == "10000m")) {
        this.reg0 = "mm";
        this.reg1 = ":";
        this.reg2 = "ss";
        this.reg3 = ",";
        this.reg4 = "tt";
        this.kind_athl = 1;
      }
      else {
        this.reg0 = "hh";
        this.reg1 = ":";
        this.reg2 = "mm";
        this.reg3 = ":";
        this.reg4 = "ss";
        this.kind_athl = 2;
      }
      if (this.sport_name == "cycling") {
        this.reg0 = "hh";
        this.reg1 = ":";
        this.reg2 = "mm";
        this.reg3 = ":";
        this.reg4 = "ss";
        this.kind_athl = 3;
      }

      if (this.competition_obj.status == 2) {
        this.finished = 1;
        this.awarded_medals = 1;
        this.bronze = this.competition_obj.bronze;
        this.silver = this.competition_obj.silver;
        this.gold = this.competition_obj.gold;
      }

      if (this.competition_obj.time_start != null) {
        let str = this.date_start + "";
        str = (str.split("T", 2))[0];
        this.msg_about_time_start = "This competition is already scheduled for " + str + " at " + this.competition_obj.time_start + ".";
        if (this.competition_obj.status != 2) this.msg_about_time_start = this.msg_about_time_start + "You are able to change that."
      }

      if(this.competition_obj.status==1){
        this.formed=1;
      }
      else{
        this.formed=0;
      }


    })
  }

  
  set_silver(){
    if(this.silver!=null){
      this.athlete_service.set_silver(this.silver.name,this.silver.lastname,this.silver.country,this.gender_name).subscribe((res)=>{
        if (res['message'] == 'ok'){
          alert("A gold silver was awarded.")
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
          alert("A gold silver was awarded.")
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


  date_to_display_fun(date_s, date_e) {
    let str = date_s + "";
    let str_1 = str.split("T", 2);
    this.date_start_to_display = str_1[0];
    str = date_e + "";
    str_1 = str.split("T", 2);
    this.date_end_to_display = str_1[0];
  }


  set_time() {
    if (this.finished == 1) {
      alert("This competition is finished. You are not able to enter a data.");
    }
    else if(this.formed == 0){
      alert("This competition is not formed. You are not able to enter a data.");
    }
    else {
      let flag = 0;
      if (this.competition_obj.time_start != null) {
        let str = this.date_start + "";
        str = (str.split("T", 2))[0];
        this.msg_about_time_start = "This competition is already scheduled for " + str + " at " + this.competition_obj.time_start + ".";
        if (this.competition_obj.status != 2) this.msg_about_time_start = this.msg_about_time_start + "You are able to change that."
      }
      for (let i = 0; i < this.time_sheduled.length; i++) {
        let date_t = this.date_start_to_display + "";
        let time_sel = date_t + " " + this.time_start + "";
        if (time_sel == this.time_date_to_display[i]) {
          flag = 1;
          this.msg_time = "location is not available in that term";
          alert("Location is not available in that term.");
        }
      }
      if (flag == 0) {
        this.competitions_service.set_time_start(this.competition_name, this.time_start).subscribe((res) => {
          if (res['message'] == 'ok') {
            //alert("ubaceno vreme");
          }
        })
        let for_loc = this.date_start_to_display + "T" + this.time_start + "Z";
        this.sports_service.set_time_for_loc(this.location_name, for_loc).subscribe((res) => {
          if (res["message"] == "ok") {
            // alert("ubaceno vreme za lok");
            this.msg_time = "The competition is scheduled on " + this.date_start_to_display + " in " + this.time_start + ".";
          }
        })
      }
    }
  }

  enter_result_fun() {
    if(this.formed == 0 || this.finished==1){
      alert("This competition is not formed. You are not able to enter a data.");
    }
    else{
      let cn = 0;
      if (this.kind_athl == 0) {
        for (let i = 0; i < this.participants.length; i++) {
          if (this.participants[i].curr_res_cen == null || this.participants[i].curr_res_sec == null) {
            cn = 1;
          }
        }
      }
      else {
        for (let i = 0; i < this.participants.length; i++) {
          if (this.participants[i].curr_res_cen == null || this.participants[i].curr_res_sec == null || this.participants[i].curr_res_mil == null) {
            cn = 1;
          }
        }
      }
      if (cn == 0) {
        let min1 = 100000000;
        let min2 = 100000000;
        let min3 = 100000000;
        let cnt1 = 0;
        let cnt2 = 0;
        let cnt3 = 0;
        let min1_id = -1;
        let min2_id = -1;
        let min3_id = -1;
        let t = 0;
        for (let i = 0; i < 8; i++) {
          if (this.kind_athl == 0) {
            t = this.participants[i].curr_res_sec * 100 + this.participants[i].curr_res_cen;
          }
          else if (this.kind_athl == 1) {
            t = this.participants[i].curr_res_sec * 100 * 60 + this.participants[i].curr_res_cen * 100 + this.participants[i].curr_res_mil;
          }
          else {
            t = this.participants[i].curr_res_sec * 60 * 60 + this.participants[i].curr_res_cen * 60 + this.participants[i].curr_res_mil;
          }
          if (t < min1) {
            min1 = t;
            min1_id = i;
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i != min1_id) {
            if (this.kind_athl == 0) {
              t = this.participants[i].curr_res_sec * 100 + this.participants[i].curr_res_cen;
            }
            else if (this.kind_athl == 1) {
              t = this.participants[i].curr_res_sec * 100 * 60 + this.participants[i].curr_res_cen * 100 + this.participants[i].curr_res_mil;
            }
            else {
              t = this.participants[i].curr_res_sec * 60 * 60 + this.participants[i].curr_res_cen * 60 + this.participants[i].curr_res_mil;
            }
            if (t < min2 && t != min1) {
              min2 = t;
              min2_id = i;
            }
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i != min1_id && i != min2_id) {
            if (this.kind_athl == 0) {
              t = this.participants[i].curr_res_sec * 100 + this.participants[i].curr_res_cen;
            }
            else if (this.kind_athl == 1) {
              t = this.participants[i].curr_res_sec * 100 * 60 + this.participants[i].curr_res_cen * 100 + this.participants[i].curr_res_mil;
            }
            else {
              t = this.participants[i].curr_res_sec * 60 * 60 + this.participants[i].curr_res_cen * 60 + this.participants[i].curr_res_mil;
            }
            if (t < min3 && t != min1 && t != min2) {
              min3 = t;
              min3_id = i;
            }
          }
        }
        //we need to check are there 2 players with same result
        cnt1 = this.find_the_same(min1_id, min1);
        cnt2 = this.find_the_same(min2_id, min2);
        cnt3 = this.find_the_same(min3_id, min3);
        if (cnt1 == 0 && cnt2 == 0 && cnt3 == 0) {
          this.bronze = this.participants[min3_id];
          this.silver = this.participants[min2_id];
          this.gold = this.participants[min1_id];
          this.awarded_bronze = 1;
          this.awarded_silver = 1;
          this.awarded_gold = 1;
          this.awarded_medals = 1;
          this.competitions_service.set_bronze(this.competition_name, this.bronze.name, this.bronze.lastname, this.bronze.country, this.bronze.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name, this.silver.name, this.silver.lastname, this.silver.country, this.silver.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name, 2).subscribe((res) => {
            if (res['message'] == 'ok') {
              alert("This competition is finished.");
            }
          })
        }
        if (cnt1 == 1 && cnt2 == 0) {
          alert("New round for gold medal.");
          this.new_gold_array[0] = this.participants[min1_id];
          this.new_gold_array[1] = this.find_athlete_with_same_result(min1_id, min1);
          this.new_gold = 1;
          this.bronze = this.participants[min2_id];
          this.awarded_bronze = 1;
        }
        else if (cnt1 == 1 && cnt2 == 1) {
          alert("New round for gold and bronze medal.");
          this.new_gold_array[0] = this.participants[min1_id];
          this.new_gold_array[1] = this.find_athlete_with_same_result(min1_id, min1);
          this.new_gold = 1;
          this.new_bronze_array[0] = this.participants[min2_id];
          this.new_bronze_array[1] = this.find_athlete_with_same_result(min2_id, min2);
          this.new_bronze = 1;
        }
        else if (cnt1 == 0 && cnt2 == 1) {
          alert("New round for silver medal.");
          this.new_silver_array[0] = this.participants[min2_id];
          this.new_silver_array[1] = this.find_athlete_with_same_result(min2_id, min2);
          this.new_silver = 1;
          this.gold = this.participants[min1_id];
          this.awarded_gold = 1;
        }
        else if (cnt1 == 0 && cnt2 == 0 && cnt3 == 1) {
          alert("New round for bronze medal.");
          this.new_bronze_array[0] = this.participants[min3_id];
          this.new_bronze_array[1] = this.find_athlete_with_same_result(min3_id, min3);
          this.new_bronze = 1;
          this.silver = this.participants[min2_id];
          this.gold = this.participants[min1_id];
          this.awarded_silver = 1;
          this.awarded_gold = 1;
        }
      }
      else {
        alert("All fields are required.");
      }
    }
  }

  find_the_same(id, res) {
    let t = 0;
    for (let i = 0; i < 8; i++) {
      if (i != id) {
        if (this.kind_athl == 0) {
          t = this.participants[i].curr_res_sec * 100 + this.participants[i].curr_res_cen;
        }
        else if (this.kind_athl == 1) {
          t = this.participants[i].curr_res_sec * 100 * 60 + this.participants[i].curr_res_cen * 100 + this.participants[i].curr_res_mil;
        }
        else {
          t = this.participants[i].curr_res_sec * 60 * 60 + this.participants[i].curr_res_cen * 60 + this.participants[i].curr_res_mil;
        }

        if (t == res) {
          return 1;
        }
      }
    }
    return 0;
  }
  find_athlete_with_same_result(id, res) {
    let t = 0;
    for (let i = 0; i < 8; i++) {
      if (i != id) {
        if (this.kind_athl == 0) {
          t = this.participants[i].curr_res_sec * 100 + this.participants[i].curr_res_cen;
        }
        else if (this.kind_athl == 1) {
          t = this.participants[i].curr_res_sec * 100 * 60 + this.participants[i].curr_res_cen * 100 + this.participants[i].curr_res_mil;
        }
        else {
          t = this.participants[i].curr_res_sec * 60 * 60 + this.participants[i].curr_res_cen * 60 + this.participants[i].curr_res_mil;
        }

        if (t == res) {
          return this.participants[i];
        }
      }
    }
    return null;
  }
  confrim_bronze() {
    let cn = 0;
    if (this.kind_athl == 0) {
      if (this.new_bronze_array[0].new_res_cen == null || this.new_bronze_array[0].new_res_sec == null || this.new_bronze_array[1].new_res_cen == null || this.new_bronze_array[1].new_res_sec == null) {
        cn = 1;
      }
    }
    else {
      if (this.new_bronze_array[0].new_res_cen == null || this.new_bronze_array[0].new_res_sec == null || this.new_bronze_array[0].new_res_mil == null || this.new_bronze_array[1].new_res_cen == null || this.new_bronze_array[1].new_res_sec == null || this.new_bronze_array[0].new_res_mil == null) {
        cn = 1;
      }
    }
    if (cn == 0) {
      let t0 = 0;
      let t1 = 0;

      if (this.kind_athl == 0) {
        t0 = this.new_bronze_array[0].new_res_sec * 100 + this.new_bronze_array[0].new_res_cen;
        t1 = this.new_bronze_array[1].new_res_sec * 100 + this.new_bronze_array[1].new_res_cen;
      }
      else if (this.kind_athl == 1) {
        t0 = this.new_bronze_array[0].new_res_sec * 100 * 60 + this.new_bronze_array[0].new_res_cen * 100 + this.new_bronze_array[0].new_res_mil;
        t1 = this.new_bronze_array[1].new_res_sec * 100 * 60 + this.new_bronze_array[1].new_res_cen * 100 + this.new_bronze_array[1].new_res_mil;

      }
      else {
        t0 = this.new_bronze_array[0].new_res_sec * 60 * 60 + this.new_bronze_array[0].new_res_cen * 60 + this.new_bronze_array[0].new_res_mil;
        t1 = this.new_bronze_array[1].new_res_sec * 60 * 60 + this.new_bronze_array[1].new_res_cen * 60 + this.new_bronze_array[1].new_res_mil;

      }

      t0 = this.new_bronze_array[0].new_res_sec * 100 + this.new_bronze_array[0].new_res_cen;
      t1 = this.new_bronze_array[1].new_res_sec * 100 + this.new_bronze_array[1].new_res_cen;
      if (t0 < t1) {
        this.bronze = this.new_bronze_array[0];
        this.awarded_bronze = 1;
        if (this.awarded_bronze == 1 && this.awarded_silver == 1 && this.awarded_gold == 1) {
          this.awarded_medals = 1;
          this.competitions_service.set_bronze(this.competition_name, this.bronze.name, this.bronze.lastname, this.bronze.country, this.bronze.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name, this.silver.name, this.silver.lastname, this.silver.country, this.silver.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name, 2).subscribe((res) => {
            if (res['message'] == 'ok') {
              alert("This competition is finished.");
            }
          })
        }
      }
      else {
        this.bronze = this.new_bronze_array[1];
        this.awarded_bronze = 1;
        if (this.awarded_bronze == 1 && this.awarded_silver == 1 && this.awarded_gold == 1) {
          this.awarded_medals = 1;
          this.competitions_service.set_bronze(this.competition_name, this.bronze.name, this.bronze.lastname, this.bronze.country, this.bronze.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name, this.silver.name, this.silver.lastname, this.silver.country, this.silver.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name, 2).subscribe((res) => {
            if (res['message'] == 'ok') {
              alert("This competition is finished.");
            }
          })
        }
      }
    }
    else {
      alert("All fields are required.");

    }
  }
  confrim_silver() {
    let cn = 0;
    if (this.kind_athl == 0) {
      if (this.new_silver_array[0].new_res_cen == null || this.new_silver_array[0].new_res_sec == null || this.new_silver_array[1].new_res_cen == null || this.new_silver_array[1].new_res_sec == null) {
        cn = 1;
      }
    }
    else {
      if (this.new_silver_array[0].new_res_cen == null || this.new_silver_array[0].new_res_sec == null || this.new_silver_array[0].new_res_mil == null || this.new_silver_array[1].new_res_cen == null || this.new_silver_array[1].new_res_sec == null || this.new_silver_array[0].new_res_mil == null) {
        cn = 1;
      }
    }
    if (cn == 0) {
      let t0 = 0;
      let t1 = 0;

      if (this.kind_athl == 0) {
        t0 = this.new_silver_array[0].new_res_sec * 100 + this.new_silver_array[0].new_res_cen;
        t1 = this.new_silver_array[1].new_res_sec * 100 + this.new_silver_array[1].new_res_cen;
      }
      else if (this.kind_athl == 1) {
        t0 = this.new_silver_array[0].new_res_sec * 100 * 60 + this.new_silver_array[0].new_res_cen * 100 + this.new_silver_array[0].new_res_mil;
        t1 = this.new_silver_array[1].new_res_sec * 100 * 60 + this.new_silver_array[1].new_res_cen * 100 + this.new_silver_array[1].new_res_mil;

      }
      else {
        t0 = this.new_silver_array[0].new_res_sec * 60 * 60 + this.new_silver_array[0].new_res_cen * 60 + this.new_silver_array[0].new_res_mil;
        t1 = this.new_silver_array[1].new_res_sec * 60 * 60 + this.new_silver_array[1].new_res_cen * 60 + this.new_silver_array[1].new_res_mil;

      }

      if (t0 < t1) {
        this.silver = this.new_silver_array[0];
        this.bronze = this.new_silver_array[1];
        this.awarded_silver = 1;
        this.awarded_bronze = 1;
        if (this.awarded_bronze == 1 && this.awarded_silver == 1 && this.awarded_gold == 1) {
          this.awarded_medals = 1;
          this.competitions_service.set_bronze(this.competition_name, this.bronze.name, this.bronze.lastname, this.bronze.country, this.bronze.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name, this.silver.name, this.silver.lastname, this.silver.country, this.silver.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name, 2).subscribe((res) => {
            if (res['message'] == 'ok') {
              alert("This competition is finished.");
            }
          })
        }
      }
      else {
        this.silver = this.new_silver_array[1];
        this.bronze = this.new_silver_array[0];
        this.awarded_silver = 1;
        this.awarded_bronze = 1;
        if (this.awarded_bronze == 1 && this.awarded_silver == 1 && this.awarded_gold == 1) {
          this.awarded_medals = 1;
          this.competitions_service.set_bronze(this.competition_name, this.bronze.name, this.bronze.lastname, this.bronze.country, this.bronze.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name, this.silver.name, this.silver.lastname, this.silver.country, this.silver.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name, 2).subscribe((res) => {
            if (res['message'] == 'ok') {
              alert("This competition is finished.");
            }
          })
        }
      }
    }
    else {
      alert("All fields are required.");

    }
  }
  confrim_gold() {
    let cn = 0;
    if (this.kind_athl == 0) {
      if (this.new_gold_array[0].new_res_cen == null || this.new_gold_array[0].new_res_sec == null || this.new_gold_array[1].new_res_cen == null || this.new_gold_array[1].new_res_sec == null) {
        cn = 1;
      }
    }
    else {
      if (this.new_gold_array[0].new_res_cen == null || this.new_gold_array[0].new_res_sec == null || this.new_gold_array[0].new_res_mil == null || this.new_gold_array[1].new_res_cen == null || this.new_gold_array[1].new_res_sec == null || this.new_gold_array[0].new_res_mil == null) {
        cn = 1;
      }
    }
    if (cn == 0) {
      let t0 = 0;
      let t1 = 0;

      if (this.kind_athl == 0) {
        t0 = this.new_gold_array[0].new_res_sec * 100 + this.new_gold_array[0].new_res_cen;
        t1 = this.new_gold_array[1].new_res_sec * 100 + this.new_gold_array[1].new_res_cen;
      }
      else if (this.kind_athl == 1) {
        t0 = this.new_gold_array[0].new_res_sec * 100 * 60 + this.new_gold_array[0].new_res_cen * 100 + this.new_gold_array[0].new_res_mil;
        t1 = this.new_gold_array[1].new_res_sec * 100 * 60 + this.new_gold_array[1].new_res_cen * 100 + this.new_gold_array[1].new_res_mil;

      }
      else {
        t0 = this.new_gold_array[0].new_res_sec * 60 * 60 + this.new_gold_array[0].new_res_cen * 60 + this.new_gold_array[0].new_res_mil;
        t1 = this.new_gold_array[1].new_res_sec * 60 * 60 + this.new_gold_array[1].new_res_cen * 60 + this.new_gold_array[1].new_res_mil;

      }

      if (t0 < t1) {
        this.gold = this.new_gold_array[0];
        this.silver = this.new_gold_array[1];
        this.awarded_silver = 1;
        this.awarded_gold = 1;
        if (this.awarded_bronze == 1 && this.awarded_silver == 1 && this.awarded_gold == 1) {
          this.awarded_medals = 1;
          this.competitions_service.set_bronze(this.competition_name, this.bronze.name, this.bronze.lastname, this.bronze.country, this.bronze.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name, this.silver.name, this.silver.lastname, this.silver.country, this.silver.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name, 2).subscribe((res) => {
            if (res['message'] == 'ok') {
              alert("This competition is finished.");
            }
          })
        }
      }
      else {
        this.gold = this.new_gold_array[1];
        this.silver = this.new_gold_array[0];
        this.awarded_silver = 1;
        this.awarded_gold = 1;
        if (this.awarded_bronze == 1 && this.awarded_silver == 1 && this.awarded_gold == 1) {
          this.awarded_medals = 1;
          this.competitions_service.set_bronze(this.competition_name, this.bronze.name, this.bronze.lastname, this.bronze.country, this.bronze.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name, this.silver.name, this.silver.lastname, this.silver.country, this.silver.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name, this.gold.name, this.gold.lastname, this.gold.country, this.gold.gender).subscribe((res) => {
            if (res['message'] == 'ok') {
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name, 2).subscribe((res) => {
            if (res['message'] == 'ok') {
              alert("This competition is finished.");
            }
          })
        }
      }
    }
    else {
      alert("All fields are required.");

    }
  }

}
