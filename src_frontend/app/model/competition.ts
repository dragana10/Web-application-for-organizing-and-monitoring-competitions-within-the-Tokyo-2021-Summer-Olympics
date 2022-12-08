import { Time } from "@angular/common";
import { Athlete } from "./athlete";
import { Location_Obj } from "./location";

export class Competition{
    name : string;
    sport : string;
    discipline : string;
    gender : string;
    kind : number;
    level : Array<String>;
    date_start : Date;
    date_end : Date;
    time_start : Time;
    time_end:Time;
    location:string;
    delegate:string;
    status:number; //0-formation,1-formed,2-finished
    num_par:number;
    to_apply:Array<Athlete>;
    participants:Array<Athlete>;
    bronze:Athlete;
    silver:Athlete;
    gold:Athlete;
    winner:Athlete;
}