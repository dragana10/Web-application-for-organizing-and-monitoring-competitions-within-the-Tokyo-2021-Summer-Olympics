import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  url="http://localhost:4000";

  constructor(private http: HttpClient) { }

  find_all_sports(){
    return this.http.get(`${this.url}/sports/find_all_sports`);
  }
  get_sport_by_name(name){
    const data={
      name:name
    }
    return this.http.post(`${this.url}/sports/get_sport_by_name`,data);
  }
  find_all_disciplines(){
    return this.http.get(`${this.url}/sports/find_all_disciplines`);
  }
  find_disciplines_for_sport(name){
    const data={
      name:name
    }
    return this.http.post(`${this.url}/sports/find_disciplines_for_sport`,data);
  }
  find_discipline_by_name(name){
    const data={
      name:name
    }
    return this.http.post(`${this.url}/sports/find_discipline_by_name`,data);
  }
  enter_discipline(name,sport,kind){
    const data={
      name:name,
      sport:sport,
      kind:kind
    }
    return this.http.post(`${this.url}/sports/enter_discipline`,data);
  }
  enter_sport(name,kind){
    const data={
      name:name,
      kind:kind
    }
    return this.http.post(`${this.url}/sports/enter_sport`,data);
  }
  get_all_locations_for_sport(name){
    const data={
      name:name
    }
    return this.http.post(`${this.url}/sports/get_all_locations_for_sport`,data);
  }
  get_all_locations_for_discipline(name){
    const data={
      name:name
    }
    return this.http.post(`${this.url}/sports/get_all_locations_for_discipline`,data);
  }
  get_all_levels_for_sport(sport){
    const data={
      sport:sport
    }
    return this.http.post(`${this.url}/sports/get_all_levels_for_sport`,data);
  }
  get_loc_by_name(name){
    const data={
      name:name
    }
    return this.http.post(`${this.url}/sports/get_loc_by_name`,data);
  }
  get_lev_by_name(name){
    const data={
      name:name
    }
    return this.http.post(`${this.url}/sports/get_lev_by_name`,data);
  }

  set_time_for_loc(name,time){
    const data={
      name:name,
      time:time
    }
    return this.http.post(`${this.url}/sports/set_time_for_loc`,data);
  }
  remove_time_for_loc(name,time){
    const data={
      name:name,
      time:time
    }
    return this.http.post(`${this.url}/sports/remove_time_for_loc`,data);
  }

  get_holder_table=(discipline,sport,gender)=>{
    const data={
      discipline:discipline,
      sport:sport,
      gender:gender
    }
    return this.http.post(`${this.url}/sports/get_holder_table`,data);
  }
  set_holder_in_candidates=(discipline,sport,gender,name,lastname,country)=>{
    const data={
      discipline:discipline,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_holder_in_candidates`,data);
  }

  set_first_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_first_holder`,data);
  }
  set_second_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_second_holder`,data);
  }
  set_third_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_third_holder`,data);
  }
  set_fourth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_fourth_holder`,data);
  }
  set_fifth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_fifth_holder`,data);
  }
  set_sixth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_sixth_holder`,data);
  }
  set_seventh_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_seventh_holder`,data);
  }
  set_eighth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_eighth_holder`,data);
  }
  set_ninth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_ninth_holder`,data);
  }
  set_tenth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_tenth_holder`,data);
  }
  set_eleventh_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_eleventh_holder`,data);
  }
  set_twelfth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_twelfth_holder`,data);
  }
  set_thirteenth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_thirteenth_holder`,data);
  }
  set_fourteenth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_fourteenth_holder`,data);
  }
  set_fifteenth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_fifteenth_holder`,data);
  }
  
  set_sixteenth_holder=(discipline_hold,sport,gender,name,lastname,country)=>{
    const data={
      discipline_hold:discipline_hold,
      sport:sport,
      gender:gender,
      name:name,
      lastname:lastname,
      country:country
    }
    return this.http.post(`${this.url}/sports/set_sixteenth_holder`,data);
  }

  // get_holder_by_id=(id)=>{
  //   const data={
  //     id:id
  //   }
  //   return this.http.post(`${this.url}/sports/get_holder_by_id`,data);
  // }

}
