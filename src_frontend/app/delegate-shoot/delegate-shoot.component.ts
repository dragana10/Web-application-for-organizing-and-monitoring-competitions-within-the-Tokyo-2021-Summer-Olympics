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
  selector: 'app-delegate-shoot',
  templateUrl: './delegate-shoot.component.html',
  styleUrls: ['./delegate-shoot.component.css']
})
export class DelegateShootComponent implements OnInit {

  msg_about_time_start:string="";
  finished: number = 0;
  formed: number = 0;

  msg_abt_par:string;
  competition_name:string;
  competition_obj:Competition;
  competitions:Competition[];
  flag:number=0;
  delegate_username:string;
  delegate:User;
  date_start:Date;
  date_end:Date;
  time_start:Time;
  location_obj:Location_Obj;
  location_name:string="";
  time_sheduled:Time[];
  time_to_display:string[]=["",""];
  date_to_display:string[]=["",""];
  time_date_to_display:string[]=["",""];
  date_start_to_display:string="";
  date_end_to_display:string="";
  msg_time:string="";
  flag2:number=0;
  kind:number;
  sport_name:string;
  discipline_name:string;
  gender_name:string;
  participants:Array<Athlete>;
  msg_regex:string="ss,tt";
  new_bronze:number=0;
  new_silver:number=0;
  new_gold:number=0;
  new_bronze_array:Athlete[]=[]
  new_silver_array:Athlete[]=[]
  new_gold_array:Athlete[]=[]
  gold:Athlete=null;
  silver:Athlete=null;
  bronze:Athlete=null;
  awarded_bronze:number=0;
  awarded_silver:number=0;
  awarded_gold:number=0;
  awarded_medals:number=0;
  levels_of_comp:Array<String>=[];
  reg0:string="";
  reg1:string="";
  reg2:string="";
  can2:number=0;
  can3:number=0;
  can4:number=0;
  can5:number=0;
  can6:number=0;
  newcan2:number=0;
  newcan3:number=0;
  newcan4:number=0;
  newcan5:number=0;
  newcan6:number=0;
  scan2:number=0;
  scan3:number=0;
  scan4:number=0;
  scan5:number=0;
  scan6:number=0;
  gcan2:number=0;
  gcan3:number=0;
  gcan4:number=0;
  gcan5:number=0;
  gcan6:number=0;


  constructor(private route: ActivatedRoute, 
    private ruter: Router,
    private user_service: UserService,
    private competitions_service:CompetitionsService,
    private sports_service:SportsService,
    private athlete_service:AthletesService) { }

  ngOnInit(): void {
    this.competition_name=this.route.snapshot.paramMap.get('disc_name');
    this.competitions_service.get_competition_by_name(this.competition_name).subscribe((data:Competition)=>{
      this.competition_obj=data;
      this.sport_name=this.competition_obj.sport;
      this.discipline_name=this.competition_obj.discipline;
      this.gender_name=this.competition_obj.gender;
      this.kind=this.competition_obj.kind;
      this.date_start=this.competition_obj.date_start;
      this.date_end=this.competition_obj.date_end;
      this.date_to_display_fun(this.date_start,this.date_end);
      this.location_name=this.competition_obj.location;
      this.levels_of_comp=this.competition_obj.level;
      this.sports_service.get_loc_by_name(this.location_name).subscribe((res:Location_Obj)=>{
        this.location_obj=res;
        this.time_sheduled=this.location_obj.time_scheduled;
        if(this.time_sheduled.length!=0)this.flag2=1;
        for(let i=0;i<this.time_sheduled.length;i++){
          let str=(this.time_sheduled[i])+"";
          let str_1=str.split("T",2);
          this.time_to_display[i]=str_1[0];
          let str_2=str_1[1];
          let str_3=str_2.split("Z",1);
          this.date_to_display[i]=str_3[0];
          this.time_date_to_display[i]=this.time_to_display[i]+" "+this.date_to_display[i];
        }
      })
      this.participants=this.competition_obj.participants;
      if(this.participants.length==0){
        this.msg_abt_par="There are no participants yet.";
      }
      this.flag=1;
      let str=this.discipline_name.split(" ",3);
      let t=str[2];
      if(t=="Jump" || t=="Vault"){
        this.reg0="m";
        this.reg1=",";
        this.reg2="cm";
      }
      else{
        this.reg0="mm";
        this.reg1=",";
        this.reg2="cm";
      }


      if (this.competition_obj.status == 2) {
        this.finished = 1;
        this.awarded_medals=1;
        this.bronze=this.competition_obj.bronze;
        this.silver=this.competition_obj.silver;
        this.gold=this.competition_obj.gold;
      }

      if(this.competition_obj.time_start!=null){
        let str=this.date_start+"";
        str=(str.split("T",2))[0];
        this.msg_about_time_start="This competition is already scheduled for "+str+" at "+this.competition_obj.time_start+".";
        if(this.competition_obj.status!=2)this.msg_about_time_start=this.msg_about_time_start+"You are able to change that."
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
  
  // add(){
  //   this.athlete_service.add_medals_all().subscribe((res)=>{
  //     if (res['message'] == 'ok'){
  //       alert("bravo :)")
  //     }
  //   })
  // }
  
  date_to_display_fun(date_s,date_e){
    let str=date_s+"";
    let str_1=str.split("T",2);
    this.date_start_to_display=str_1[0];
    str=date_e+"";
    str_1=str.split("T",2);
    this.date_end_to_display=str_1[0];
  }


  set_time(){
    if(this.finished==1){
      alert("This competition is finished. You are not able to enter a data.");
    }
    else if(this.formed == 0){
      alert("This competition is not formed. You are not able to enter a data.");
    }
    else{
      if(this.competition_obj.time_start!=null){
        let str=this.date_start+"";
        str=(str.split("T",2))[0];
        this.msg_about_time_start="This competition is already scheduled for "+str+" at "+this.competition_obj.time_start+".";
        if(this.competition_obj.status!=2)this.msg_about_time_start=this.msg_about_time_start+"You are able to change that."
      }
      let flag=0;
      for(let i=0;i<this.time_sheduled.length;i++){
        let date_t=this.date_start_to_display+"";
        let time_sel=date_t+" "+this.time_start+"";
        if(time_sel==this.time_date_to_display[i]){
          flag=1;
          this.msg_time="location is not available in that term";
          alert("Location is not available in that term.");
        }
      }
      if(flag==0){
      this.competitions_service.set_time_start(this.competition_name,this.time_start).subscribe((res)=>{
        if(res['message']=='ok'){
          //alert("ubaceno vreme");
        }
      })
        let for_loc=this.date_start_to_display+"T"+this.time_start+"Z";
        this.sports_service.set_time_for_loc(this.location_name,for_loc).subscribe((res)=>{
          if(res["message"]=="ok"){
              // alert("ubaceno vreme za lok");
              this.msg_time="The competition is scheduled on "+this.date_start_to_display+ " in "+this.time_start+"."; 
          }
        })
      }
    }
  }

  enter_result_fun(){
    if(this.formed == 0 || this.finished==1){
      alert("This competition is not formed. You are not able to enter a data.");
    }
    else{
      
    let cn=0;
    
    for(let i=0;i<this.participants.length;i++){
      if(this.participants[i].shot6==null){
        cn=1;
        alert("All fields are required.");
        return;
       }
    }
    if(cn==0){
      alert("Sixth round saved.");
      let max1=-1;
      let max2=-1;
      let max3=-1;
      let cnt1=0;
      let cnt2=0;
      let cnt3=0;
      let max1_id=-1;
      let max2_id=-1;
      let max3_id=-1;
      let t=0;
      let t1=0;
      for(let i=0;i<8;i++){
        t1=this.participants[i].shot1+this.participants[i].shot2+this.participants[i].shot3+this.participants[i].shot4+this.participants[i].shot5+this.participants[i].shot6;
        this.participants[i].max_total=t1;
      }
      for(let i=0;i<8;i++){
        t=this.participants[i].max_total;
        if(t>max1){
          max1=t;
          max1_id=i;
        }
      }
      for(let i=0;i<8;i++){
        if(i!=max1){
          t=this.participants[i].max_total;
          if(t>max2 && t!=max1){
            max2=t;
            max2_id=i;
          }
        }
      }
      for(let i=0;i<8 ;i++){
        if(i!=max1_id && i!=max2_id){
          t=this.participants[i].max_total;
          if(t>max3 && t!=max1 && t!=max2){
            max3=t;
            max3_id=i;
          }
        }
      }
      //we need to check are there 2 players with same result
      cnt1=this.find_the_same(max1_id,max1);
      cnt2=this.find_the_same(max2_id,max2);
      cnt3=this.find_the_same(max3_id,max3);
      if(cnt1==0 && cnt2==0 && cnt3==0){
        this.bronze=this.participants[max3_id];
        this.silver=this.participants[max2_id];
        this.gold=this.participants[max1_id];
        this.awarded_bronze=1;
        this.awarded_silver=1;
        this.awarded_gold=1;
        this.awarded_medals=1;
        this.competitions_service.set_bronze(this.competition_name,this.bronze.name,this.bronze.lastname,this.bronze.country,this.bronze.gender).subscribe((res)=>{
          if(res['message']=='ok'){
            //alert("ubaceno vreme");
          }
        })
        this.competitions_service.set_silver(this.competition_name,this.silver.name,this.silver.lastname,this.silver.country,this.silver.gender).subscribe((res)=>{
          if(res['message']=='ok'){
            //alert("ubaceno vreme");
          }
        })
        this.competitions_service.set_gold(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
          if(res['message']=='ok'){
            //alert("ubaceno vreme");
          }
        })
        this.competitions_service.set_winner(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
          if(res['message']=='ok'){
            //alert("ubaceno vreme");
          }
        })
        this.competitions_service.set_status(this.competition_name,2).subscribe((res)=>{
          if(res['message']=='ok'){
            alert("This competition is finished.");
          }
        })
      }
      if(cnt1==1 && cnt2==0){
        alert("New round for gold medal.");
        this.new_gold_array[0]=this.participants[max1_id];
        this.new_gold_array[1]=this.find_athlete_with_same_result(max1_id,max1);
        this.new_gold=1;
        this.bronze=this.participants[max2_id];
        this.awarded_bronze=1;
      }
      else if(cnt1==1 && cnt2==1){
        alert("New round for gold and bronze medal.");
        this.new_gold_array[0]=this.participants[max1_id];
        this.new_gold_array[1]=this.find_athlete_with_same_result(max1_id,max1);
        this.new_gold=1;
        this.new_bronze_array[0]=this.participants[max2_id];
        this.new_bronze_array[1]=this.find_athlete_with_same_result(max2_id,max2);
        this.new_bronze=1;
      }
      else if(cnt1==0 && cnt2==1){
        alert("New round for silver medal.");
        this.new_silver_array[0]=this.participants[max2_id];
        this.new_silver_array[1]=this.find_athlete_with_same_result(max2_id,max2);
        this.new_silver=1;
        this.gold=this.participants[max1_id];
        this.awarded_gold=1;
      }
      else if(cnt1==0 && cnt2==0 && cnt3==1){
        alert("New round for bronze medal.");
        this.new_bronze_array[0]=this.participants[max3_id];
        this.new_bronze_array[1]=this.find_athlete_with_same_result(max3_id,max3);
        this.new_bronze=1;
        this.silver=this.participants[max2_id];
        this.gold=this.participants[max1_id];
        this.awarded_silver=1;
        this.awarded_gold=1;
      }
  }
    }
  }

  find_the_same(id,res){
    let t=0;
    for(let i=0;i<8;i++){
      if( i!=id){
        t=this.participants[i].max_total;
        if(t==res){
          return 1;
        }
      }
    }
    return 0;
  }
  find_athlete_with_same_result(id,res){
    let t=0;
    for(let i=0;i<8;i++){
      if(i!=id){
        t=this.participants[i].max_total;
        if(t==res){
          return this.participants[i];
        }
      }
    }
    return null;
  }
  confirm_bronze(){
    let cn=0;
    if(this.new_bronze_array[0].newshot1==null || this.new_bronze_array[1].newshot1==null){
      cn=1;
      alert("All fields are required.");
      return;
    }
    if(cn==0){
      let t0=0;
      let t1=0;
      let t11=-1;
      for(let i=0;i<2;i++){
        t11=this.new_bronze_array[i].newshot1+this.new_bronze_array[i].newshot2+this.new_bronze_array[i].newshot3+this.new_bronze_array[i].newshot4+this.new_bronze_array[i].newshot5+this.new_bronze_array[i].newshot6;
        this.new_bronze_array[i].max_total=t1;
      }
      t0=this.new_bronze_array[0].max_total;
      t1=this.new_bronze_array[1].max_total;
      if(t0>=t1){
        this.bronze=this.new_bronze_array[0];
        this.awarded_bronze=1;
        if(this.awarded_bronze==1 && this.awarded_silver==1 && this.awarded_gold==1){
          this.awarded_medals=1;
          this.competitions_service.set_bronze(this.competition_name,this.bronze.name,this.bronze.lastname,this.bronze.country,this.bronze.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name,this.silver.name,this.silver.lastname,this.silver.country,this.silver.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name,2).subscribe((res)=>{
            if(res['message']=='ok'){
              alert("This competition is finished.");
            }
          })
        }
      }
      else{
        this.bronze=this.new_bronze_array[1];
        this.awarded_bronze=1;
        if(this.awarded_bronze==1 && this.awarded_silver==1 && this.awarded_gold==1){
          this.awarded_medals=1;
          this.competitions_service.set_bronze(this.competition_name,this.bronze.name,this.bronze.lastname,this.bronze.country,this.bronze.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name,this.silver.name,this.silver.lastname,this.silver.country,this.silver.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name,2).subscribe((res)=>{
            if(res['message']=='ok'){
              alert("This competition is finished.");
            }
          })
        }
      }
    }
  }
  confirm_silver(){
    let cn=0;
    if(this.new_silver_array[0].newshot1==null || this.new_silver_array[1].newshot1==null){
      cn=1;
      alert("All fields are required.");
      return;
    }
    if(cn==0){
      let t0=0;
      let t1=0;
      let t11=-1;
      for(let i=0;i<2;i++){
        t11=this.new_silver_array[i].newshot1+this.new_silver_array[i].newshot2+this.new_silver_array[i].newshot3+this.new_silver_array[i].newshot4+this.new_silver_array[i].newshot5+this.new_silver_array[i].newshot6;
        this.new_silver_array[i].max_total=t1;
      }
      t0=this.new_silver_array[0].max_total;
      t1=this.new_silver_array[1].max_total;
      if(t0>=t1){
        this.silver=this.new_silver_array[0];
        this.bronze=this.new_silver_array[1];
        this.awarded_silver=1;
        this.awarded_bronze=1;
        if(this.awarded_bronze==1 && this.awarded_silver==1 && this.awarded_gold==1){
          this.awarded_medals=1;
          this.competitions_service.set_bronze(this.competition_name,this.bronze.name,this.bronze.lastname,this.bronze.country,this.bronze.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name,this.silver.name,this.silver.lastname,this.silver.country,this.silver.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name,2).subscribe((res)=>{
            if(res['message']=='ok'){
              alert("This competition is finished.");
            }
          })
        }
      }
      else{
        this.silver=this.new_silver_array[1];
        this.bronze=this.new_silver_array[0];
        this.awarded_silver=1;
        this.awarded_bronze=1;
        if(this.awarded_bronze==1 && this.awarded_silver==1 && this.awarded_gold==1){
          this.awarded_medals=1;
          this.competitions_service.set_bronze(this.competition_name,this.bronze.name,this.bronze.lastname,this.bronze.country,this.bronze.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name,this.silver.name,this.silver.lastname,this.silver.country,this.silver.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name,2).subscribe((res)=>{
            if(res['message']=='ok'){
              alert("This competition is finished.");
            }
          })
        }
      }
    }
  }
  confirm_gold(){
    let cn=0;
    if(this.new_gold_array[0].newshot1==null || this.new_gold_array[1].newshot1==null){
      cn=1;
      alert("All fields are required.");
      return;
    }
    if(cn==0){
      let t0=0;
      let t1=0;
      let t11=-1;
      for(let i=0;i<2;i++){
        t11=this.new_gold_array[i].newshot1+this.new_gold_array[i].newshot2+this.new_gold_array[i].newshot3+this.new_gold_array[i].newshot4+this.new_gold_array[i].newshot5+this.new_gold_array[i].newshot6;
        this.new_gold_array[i].max_total=t1;
      }
      t0=this.new_gold_array[0].max_total;
      t1=this.new_gold_array[1].max_total;
      if(t0>=t1){
        this.gold=this.new_gold_array[0];
        this.silver=this.new_gold_array[1];
        this.awarded_silver=1;
        this.awarded_gold=1;
        if(this.awarded_bronze==1 && this.awarded_silver==1 && this.awarded_gold==1){
          this.awarded_medals=1;
          this.competitions_service.set_bronze(this.competition_name,this.bronze.name,this.bronze.lastname,this.bronze.country,this.bronze.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name,this.silver.name,this.silver.lastname,this.silver.country,this.silver.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name,2).subscribe((res)=>{
            if(res['message']=='ok'){
              alert("This competition is finished.");
            }
          })
        }
      }
      else{
        this.gold=this.new_gold_array[1];
        this.silver=this.new_gold_array[0];
        this.awarded_silver=1;
        this.awarded_gold=1;
        if(this.awarded_bronze==1 && this.awarded_silver==1 && this.awarded_gold==1){
          this.awarded_medals=1;
          this.competitions_service.set_bronze(this.competition_name,this.bronze.name,this.bronze.lastname,this.bronze.country,this.bronze.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_silver(this.competition_name,this.silver.name,this.silver.lastname,this.silver.country,this.silver.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_gold(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_winner(this.competition_name,this.gold.name,this.gold.lastname,this.gold.country,this.gold.gender).subscribe((res)=>{
            if(res['message']=='ok'){
              //alert("ubaceno vreme");
            }
          })
          this.competitions_service.set_status(this.competition_name,2).subscribe((res)=>{
            if(res['message']=='ok'){
              alert("This competition is finished.");
            }
          })
        }
      }
    }
  }

  confirm1(v:string){
    if(this.finished==1){
      alert("This competition is finished. You are not able to enter a data.");
    }
    else{
      let comp:Competition;
      let t=0;
      let cn=0;
      this.competitions_service.get_competition_by_name(this.competition_name).subscribe((data:Competition)=>{
        comp=data;
        if(comp.time_start==null){
          alert("You need to enter start time first.");
          t=1;
          return;
        }
        else{
          if(t==0){
            if(v=="f"){
              for(let i=0;i<this.participants.length;i++){
                if(this.participants[i].shot1==null){
                  cn=1;
                  alert("All fields are required.");
                  return;
                }
              }
              if(cn==0){
                this.can2=1;
                alert("First round saved.");
              }
            }
          else if(v=="b"){
            if(this.new_bronze_array[0].newshot1==null || this.new_bronze_array[1].newshot1==null){
              cn=1;
              alert("All fields are required.");
              return;
            }
            if(cn==0){
              this.newcan2=1;
              alert("First round saved.");
            }
          }
          else if(v=="s"){
            if(this.new_silver_array[0].newshot1==null || this.new_silver_array[1].newshot1==null){
              cn=1;
              alert("All fields are required.");
              return;
            }
            if(cn==0){
              this.scan2=1;
              alert("First round saved.");
            }
          }    
          else if(v=="g"){
            if(this.new_gold_array[0].newshot1==null || this.new_gold_array[1].newshot1==null){
              cn=1;
              alert("All fields are required.");
              return;
            }
            if(cn==0){
              this.gcan2=1;
              alert("First round saved.");
            }
          }
        }
        }
      })
    }
  }
  confirm2(v:string){
    let cn=0;
    if(v=="f"){
      for(let i=0;i<this.participants.length;i++){
        if(this.participants[i].shot2==null){
          cn=1;
          alert("All fields are required.");
          return;
        }
      }
      if(cn==0){
        this.can3=1;
        alert("Second round saved.");
      }
    }
    else if(v=="b"){
      if(this.new_bronze_array[0].newshot2==null || this.new_bronze_array[1].newshot2==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.newcan3=1;
        alert("Second round saved.");
      }
    }
    else if(v=="s"){
      if(this.new_silver_array[0].newshot2==null || this.new_silver_array[1].newshot2==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.scan3=1;
        alert("Second round saved.");
      }
    }    
    else if(v=="g"){
      if(this.new_gold_array[0].newshot2==null || this.new_gold_array[1].newshot2==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.gcan3=1;
        alert("Second round saved.");
      }
    }
  }
  confirm3(v:string){
    let cn=0;
    if(v=="f"){
      for(let i=0;i<this.participants.length;i++){
        if(this.participants[i].shot3==null){
          cn=1;
          alert("All fields are required.");
          return;
        }
      }
      if(cn==0){
        this.can4=1;
        alert("Third round saved.");
      }
    }
    else if(v=="b"){
      if(this.new_bronze_array[0].newshot3==null || this.new_bronze_array[1].newshot3==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.newcan4=1;
        alert("Third round saved.");
      }
    }
    else if(v=="s"){
      if(this.new_silver_array[0].newshot3==null || this.new_silver_array[1].newshot3==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.scan4=1;
        alert("Third round saved.");
      }
    }    
    else if(v=="g"){
      if(this.new_gold_array[0].newshot3==null || this.new_gold_array[1].newshot3==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.gcan4=1;
        alert("Third round saved.");
      }
    }
  }
  confirm4(v:string){
    let cn=0;
    if(v=="f"){
      for(let i=0;i<this.participants.length;i++){
        if(this.participants[i].shot4==null){
          cn=1;
          alert("All fields are required.");
          return;
        }
      }
      if(cn==0){
        this.can5=1;
        alert("Fourth round saved.");
      }
    }
    else if(v=="b"){
      if(this.new_bronze_array[0].newshot4==null || this.new_bronze_array[1].newshot4==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.newcan5=1;
        alert("Fourth round saved.");
      }
    }
    else if(v=="s"){
      if(this.new_silver_array[0].newshot4==null || this.new_silver_array[1].newshot4==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.scan5=1;
        alert("Fourth round saved.");
      }
    }    
    else if(v=="g"){
      if(this.new_gold_array[0].newshot4==null || this.new_gold_array[1].newshot4==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.gcan5=1;
        alert("Fourth round saved.");
      }
    }
  }
  confirm5(v:string){
    let cn=0;
    if(v=="f"){
      for(let i=0;i<this.participants.length;i++){
        if(this.participants[i].shot5==null){
          cn=1;
          alert("All fields are required.");
          return;
        }
      }
      if(cn==0){
        this.can6=1;
        alert("Fifth round saved.");
      }
    }
    else if(v=="b"){
      if(this.new_bronze_array[0].newshot5==null || this.new_bronze_array[1].newshot5==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.newcan6=1;
        alert("Fifth round saved.");
      }
    }
    else if(v=="s"){
      if(this.new_silver_array[0].newshot5==null || this.new_silver_array[1].newshot5==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.scan6=1;
        alert("Fifth round saved.");
      }
    }    
    else if(v=="g"){
      if(this.new_gold_array[0].newshot5==null || this.new_gold_array[1].newshot5==null){
        cn=1;
        alert("All fields are required.");
        return;
      }
      if(cn==0){
        this.gcan6=1;
        alert("Fifth round saved.");
      }
    }
  }
}
