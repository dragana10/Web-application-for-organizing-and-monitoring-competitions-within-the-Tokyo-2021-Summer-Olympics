import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  url="http://localhost:4000";

  constructor(private http:HttpClient) { }

  find_all(){
    return this.http.get(`${this.url}/rec/find_all`);
  }

}
