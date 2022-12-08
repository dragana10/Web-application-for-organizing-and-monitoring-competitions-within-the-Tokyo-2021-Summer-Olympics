import { HttpClient } from '@angular/common/http';
import { DefinitionKind } from '@angular/compiler/src/constant_pool';
import { Injectable } from '@angular/core';
import { Discipline } from './model/disciplines';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  url="http://localhost:4000";

  constructor(private http: HttpClient) { }

  get_competition_by_name(name){
    const data={
      name:name
    }
    return this.http.post(`${this.url}/comp/get_competition_by_name`,data);
  
  }
  set_participant(name_of_comp,name,lastname,country,gender,disciplines,medals){
    const data={
      name_of_comp:name_of_comp,
      name:name,
      lastname:lastname,
      country:country,
      gender:gender,
      disciplines:disciplines,
      medals:medals
    }
    return this.http.post(`${this.url}/comp/set_participant`,data);
  
  }
  remove_participant(name_of_comp,name,lastname,country,gender,disciplines,medals){
    const data={
      name_of_comp:name_of_comp,
      name:name,
      lastname:lastname,
      country:country,
      gender:gender,
      disciplines:disciplines,
      medals:medals
    }
    return this.http.post(`${this.url}/comp/remove_participant`,data);
  
  }
  apply_athlete(name_of_comp,name,lastname,country,gender){
    const data={
      name_of_comp:name_of_comp,
      name:name,
      lastname:lastname,
      country:country,
      gender:gender
    }
    return this.http.post(`${this.url}/comp/apply_athlete`,data);
  
  }
  set_delegate(name_of_comp,username){
    const data={
      name:name_of_comp,
      username:username
    }
    return this.http.post(`${this.url}/comp/set_delegate`,data);
  
  }
  remove_delegate(name_of_comp,username){
    const data={
      name:name_of_comp,
      username:username
    }
    return this.http.post(`${this.url}/comp/remove_delegate`,data);
  
  }
  set_date_start(name_of_comp,date){
    const data={
      name:name_of_comp,
      date:date
    }
    return this.http.post(`${this.url}/comp/set_date_start`,data);
  
  }
  set_date_end(name_of_comp,date){
    const data={
      name:name_of_comp,
      date:date
    }
    return this.http.post(`${this.url}/comp/set_date_end`,data);
  
  }
  set_time_start(name_of_comp,time){
    const data={
      name:name_of_comp,
      time:time
    }
    return this.http.post(`${this.url}/comp/set_time_start`,data);
  
  }
  set_time_end(name_of_comp,time){
    const data={
      name:name_of_comp,
      time:time
    }
    return this.http.post(`${this.url}/comp/set_time_end`,data);
  
  }
  get_all_compet_for_delegate(username){
    const data={
      username:username
    }
    return this.http.post(`${this.url}/comp/get_all_compet_for_delegate`,data);
  
  }
  set_result(name,result){
    const data={
      name:name,
      result:result
    }
    return this.http.post(`${this.url}/comp/set_result`,data);
  }
  set_winner(name_com,name,lastname,country,gender){
    const data={
      name_com:name_com,
      name:name,
      lastname:lastname,
      country:country,
      gender:gender
    }
    return this.http.post(`${this.url}/comp/set_winner`,data);
  }
  set_bronze(name_com,name,lastname,country,gender){
    const data={
      name_com:name_com,
      name:name,
      lastname:lastname,
      country:country,
      gender:gender
    }
    return this.http.post(`${this.url}/comp/set_bronze`,data);
  }
  set_silver(name_com,name,lastname,country,gender){
    const data={
      name_com:name_com,
      name:name,
      lastname:lastname,
      country:country,
      gender:gender
    }
    return this.http.post(`${this.url}/comp/set_silver`,data);
  }
  set_gold(name_com,name,lastname,country,gender){
    const data={
      name_com:name_com,
      name:name,
      lastname:lastname,
      country:country,
      gender:gender
    }
    return this.http.post(`${this.url}/comp/set_gold`,data);
  }
  set_status(name,status){
    const data={
      name:name,
      status:status
    }
    return this.http.post(`${this.url}/comp/set_status`,data);
  }

  get_all_games_for_competition(sport,discipline,gender){
    const data={
      sport:sport,
      discipline:discipline,
      gender:gender
    }
    return this.http.post(`${this.url}/comp/get_all_games_for_competition`,data);
  
  }
  set_participant_in_game(level,sport,discipline,gender,group,name,lastname,country,team){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      name:name,
      lastname:lastname,
      country:country,
      team:team
    }
    return this.http.post(`${this.url}/comp/set_participant_in_game`,data);
  
  }
  inc_curr_par_in_game(level,sport,discipline,gender,ser){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      ser:ser
    }
    return this.http.post(`${this.url}/comp/inc_curr_par_in_game`,data);
  
  }
  get_games_for_level(level,sport,discipline,gender){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender
    }
    return this.http.post(`${this.url}/comp/get_games_for_level`,data);
  
  }
  set_participant_in_game_simply(level,sport,discipline,gender,group,name,lastname,country,team){
    const data={
      level_num:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      next:group,
      name:name,
      lastname:lastname,
      country:country,
      team:team
    }
    return this.http.post(`${this.url}/comp/set_participant_in_game_simply`,data);
  
  }
  get_game(level,sport,discipline,gender,group){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group
    }
    return this.http.post(`${this.url}/comp/get_game`,data);
  
  }
  get_game_simply(level,sport,discipline,gender,group){
    const data={
      level_num:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group
    }
    return this.http.post(`${this.url}/comp/get_game_simply`,data);
  
  }
  set_date_start_in_game(level,sport,discipline,gender,group,date){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      date:date
    }
    return this.http.post(`${this.url}/comp/set_date_start_in_game`,data);
  
  }
  set_date_start_in_game_simply(level,sport,discipline,gender,group,date){
    const data={
      level_num:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      date:date
    }
    return this.http.post(`${this.url}/comp/set_date_start_in_game_simply`,data);
  
  }
  set_date_end_in_game(level,sport,discipline,gender,group,date){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      date:date
    }
    return this.http.post(`${this.url}/comp/set_date_end_in_game`,data);
  
  }
  set_date_end_in_game_simply(level,sport,discipline,gender,group,date){
    const data={
      level_num:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      date:date
    }
    return this.http.post(`${this.url}/comp/set_date_end_in_game_simply`,data);
  
  }
  set_time_start_in_game(level,sport,discipline,gender,group,time){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      time:time
    }
    return this.http.post(`${this.url}/comp/set_time_start_in_game`,data);
  
  }
  set_time_start_in_game_simply(level,sport,discipline,gender,group,time){
    const data={
      level_num:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      time:time
    }
    return this.http.post(`${this.url}/comp/set_time_start_in_game_simply`,data);
  
  }
  set_result_in_game(level,sport,discipline,gender,group,result){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      result:result
    }
    return this.http.post(`${this.url}/comp/set_result_in_game`,data);
  
  }
  set_status_in_game(level,sport,discipline,gender,group,status){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      status:status
    }
    return this.http.post(`${this.url}/comp/set_status_in_game`,data);
  
  }
  set_result_in_game_simply(level,sport,discipline,gender,group,result){
    const data={
      level_num:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      result:result
    }
    return this.http.post(`${this.url}/comp/set_result_in_game_simply`,data);
  
  }
  set_winner_in_game(level,sport,discipline,gender,group,name,lastname,country){
    const data={
      level:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/comp/set_winner_in_game`,data);
  }
  set_winner_in_game_simply(level,sport,discipline,gender,group,name,lastname,country){
    const data={
      level_num:level,
      sport:sport,
      discipline:discipline,
      gender:gender,
      group:group,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/comp/set_winner_in_game_simply`,data);
  }

  // create(name,sport,discipline,gender,kind,level,start,end,location,status,num){
  //   const data={
  //     name : name,
  //     sport : sport,
  //     discipline : discipline,
  //     gender : gender,
  //     kind : kind,
  //     level : level,
  //     date_start : start,
  //     date_end : end,
  //     location: location,
  //     status: status,
  //     num_par:num
  //   }
  //   console.log(data);
  //   return this.http.post(`${this.url}/comp/create`,data);

  // }

  
}
