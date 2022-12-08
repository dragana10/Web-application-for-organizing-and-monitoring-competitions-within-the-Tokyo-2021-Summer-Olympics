import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  url="http://localhost:4000";

  constructor(private http: HttpClient) { }

  search_athletes(name,lastname,country,gender,only_winners){
    const data={
      name:name,
      lastname:lastname,
      country:country,
      gender:gender,
      only_winners:only_winners
    }
    //alert("search by name");
    return this.http.post(`${this.url}/athletes/search_athletes`, data);
  }
  search_athletes_all(){
    return this.http.get(`${this.url}/athletes/search_athletes_all`);
  }
  get_all_athletes_for_country(country){
    const data={
      country:country
    }
    return this.http.post(`${this.url}/athletes/get_all_athletes_for_country`, data);
  }
  get_all_athletes_for_country_and_sport(country,sport){
    const data={
      country:country,
      sport:sport
    }
    return this.http.post(`${this.url}/athletes/get_all_athletes_for_country_and_sport`, data);
  }
  get_all_athletes_for_country_and_disc(country,dis){
    const data={
      country:country,
      dis:dis
    }
    return this.http.post(`${this.url}/athletes/get_all_athletes_for_country_and_disc`, data);
  }
  set_new_athlete(name,lastname,country,gender,sport,discipline){
    const data={
      name:name,
      lastname:lastname,
      country:country,
      gender:gender,
      sport:sport,
      discipline:discipline
    }
    //alert(discipline);
    return this.http.post(`${this.url}/athletes/set_new_athlete`, data);
  }
  add_medals_to_new_one(name,lastname,country,gender,sport){
    const data={
      name:name,
      lastname:lastname,
      country:country,
      gender:gender,
      sport:sport
    }
    //alert(discipline);
    return this.http.post(`${this.url}/athletes/add_medals_to_new_one`, data);
  }
  add_medals_all(){
    
    return this.http.get(`${this.url}/athletes/add_medals_all`);
  }
  set_first_disc(name,lastname,country,gender,sport,discipline){
    const data={
      name:name,
      lastname:lastname,
      country:country,
      gender:gender,
      sport:sport,
      discipline:discipline
    }
    
    return this.http.post(`${this.url}/athletes/set_first_disc`, data);
  }
  set_bronze(name,lastname,country,gender){
    const data={
      name:name,
      lastname:lastname,
      country:country,
      gender:gender
    }
    
    return this.http.post(`${this.url}/athletes/set_bronze`, data);
  }
  set_silver(name,lastname,country,gender){
    const data={
      name:name,
      lastname:lastname,
      country:country,
      gender:gender
    }
    
    return this.http.post(`${this.url}/athletes/set_silver`, data);
  }
  set_gold(name,lastname,country,gender){
    const data={
      name:name,
      lastname:lastname,
      country:country,
      gender:gender
    }
    
    return this.http.post(`${this.url}/athletes/set_gold`, data);
  }

  find_athl_by_name_and_lastname_country(name,lastname,country){
    const data={
      name:name,
      lastname:lastname,
      country:country
    }
    
    return this.http.post(`${this.url}/athletes/find_athl_by_name_and_lastname_country`, data);
  }

}
