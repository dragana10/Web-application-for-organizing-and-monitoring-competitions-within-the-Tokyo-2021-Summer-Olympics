import { Time } from "@angular/common";
import { Data } from "@angular/router";
import { Athlete } from "./athlete";

export class Game_Obj{
    level : String;
    level_num:number;
    serial_num:number;
    next:number;
    levels_max:number;
    sport : string;
    discipline : string;
    gender : string;
    group : string;
    date_start : Date;
    date_end : Date;
    time_start : Time;
    status:number; //0-not finished,1-finished
    num_par:number;
    team_A:Athlete;
    team_B:Athlete;
    participants:Array<Athlete>;
    bronze:Athlete;
    silver:Athlete;
    gold:Athlete;
    result:Array<String>;
    winner:Athlete;
    time_to_enter:Time;
    date_to_enter:Date;
    curr_res:string;
    winn_num:number;
    msg_about_time_start:string;
    old_datatime:Data;
    old_datatime_flag:number=0;
    msg_about_res:string="";
}