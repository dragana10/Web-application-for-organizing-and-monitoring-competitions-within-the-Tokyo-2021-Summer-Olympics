import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="http://localhost:4000";

  constructor(private http: HttpClient) { }

  login(username,password){
    const data={
      username:username,
      password:password
    }

    return this.http.post(`${this.url}/organizer/login`,data);

  }
  change_pass(username,password,new_password){
    const data={
      username:username,
      password:password,
      new_password:new_password
    }

    return this.http.post(`${this.url}/organizer/change_pass`,data);

  }
  register(name,lastname,username,password,email,nationality,type,accepted,num_compet){
    const data={
      name:name,
      lastname:lastname,
      username:username,
      password:password,
      email:email,
      nationality:nationality,
      type:type,
      accepted:accepted,
      num_compet:num_compet
    }

    return this.http.post(`${this.url}/user/register`,data);

  }
  find_non_acc_deleg(){
    return this.http.get(`${this.url}/user/find_non_acc_deleg`);
  }
  find_non_acc_lead(){
    return this.http.get(`${this.url}/user/find_non_acc_lead`);
  }
  find_acc_deleg(){
    return this.http.get(`${this.url}/user/find_acc_deleg`);
  }
  find_acc_and_free_deleg(){
    return this.http.get(`${this.url}/user/find_acc_and_free_deleg`);
  }
  find_acc_lead(){
    return this.http.get(`${this.url}/user/find_acc_lead`);
  }
  accept(username){
    const data={
      username:username
    }
    return this.http.post(`${this.url}/user/accept`,data);
  }
  is_there_a_leader(nationality){
    const data={
      nationality:nationality
    }
    return this.http.post(`${this.url}/user/is_there_a_leader`,data);
  }
  accept_leader(username,nationality){
    const data={
      username:username,
      nationality:nationality
    }
    return this.http.post(`${this.url}/user/accept_leader`,data);
  }
  remove_req(username){
    const data={
      username:username
    }
    return this.http.post(`${this.url}/user/remove_req`,data);
  }
  find_deleg_by_name_and_lastname(name,lastname){
    const data={
      name:name,
      lastname:lastname
    }
    return this.http.post(`${this.url}/user/find_deleg_by_name_and_lastname`,data);
  }
  find_deleg_by_name_and_lastname_for_comp(name,lastname){
    const data={
      name:name,
      lastname:lastname
    }
    return this.http.post(`${this.url}/user/find_deleg_by_name_and_lastname_for_comp`,data);
  }
  find_user_by_username(username){
    const data={
      username:username
    }
    return this.http.post(`${this.url}/user/find_user_by_username`,data);
  }
}
