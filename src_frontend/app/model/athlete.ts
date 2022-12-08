import { Medal_Obj } from "./medal_obj";

export class Athlete{
    name : string;
    lastname : string;
    country : string;
    sport : string;
    disciplines : Array<string>;
    gender : string;
    has_a_medal : number;
    medals : Medal_Obj;
    chosen:boolean;
    curr_res_sec:number;
    curr_res_cen:number;
    new_res_sec:number;
    new_res_cen:number;
    curr_res_sec2:number;
    curr_res_cen2:number;
    new_res_sec2:number;
    new_res_cen2:number;
    curr_res_sec3:number;
    curr_res_cen3:number;
    new_res_sec3:number;
    new_res_cen3:number;
    shot1:number;
    shot2:number;
    shot3:number;
    shot4:number;
    shot5:number;
    shot6:number;
    newshot1:number;
    newshot2:number;
    newshot3:number;
    newshot4:number;
    newshot5:number;
    newshot6:number;
    max_total:number;
    curr_res_mil:number;
    new_res_mil:number;
    can:number;

}