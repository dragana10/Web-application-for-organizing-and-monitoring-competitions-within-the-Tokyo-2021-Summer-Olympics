import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url="http://localhost:4000";

  constructor(private http:HttpClient) { }

  find_all(){
    return this.http.get(`${this.url}/country/find_all`);
  }
}
