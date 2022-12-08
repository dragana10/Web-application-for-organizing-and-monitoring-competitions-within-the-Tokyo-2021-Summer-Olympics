import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { CountryService } from '../country.service';
import { Athlete } from '../model/athlete';
import { Country } from '../model/country';

@Component({
  selector: 'app-search-athletes',
  templateUrl: './search-athletes.component.html',
  styleUrls: ['./search-athletes.component.css']
})
export class SearchAthletesComponent implements OnInit {
  name:string;
  lastname:string;
  countries:Country[];
  selected_country:string;
  gender:string;
  only_winners:boolean;
  athletes_for_display:Athlete[];
  page:Number=-1;
  itemsPerPage:Number;
  flag:number=0;

  constructor(private router:Router,
    private athletes_service:AthletesService,
    private country_service:CountryService) { }

  ngOnInit(): void {
    this.country_service.find_all().subscribe((data:Country[])=>{
      this.countries=data;
      this.itemsPerPage=10;
    })
  }
  search(){
    let name="";
    let lastname="";
    let country="";
    let gender="";
    let only_winners=false;

    let code=0;

    if(this.name){
      name=this.name;
      code=1;
    }
    if(this.lastname){
      lastname=this.lastname;
      code=1;
    }
    if(this.selected_country){
      country=this.selected_country;
      code=1;
    }
    if(this.gender){
      gender=this.gender;
      code=1;
    }
    if(this.only_winners){
      only_winners=this.only_winners;
      code=1;
    }

    if(code==1){
      this.athletes_service.search_athletes(name,lastname,country,gender,only_winners).subscribe((data:Athlete[])=>{
        this.athletes_for_display=data;
        if(this.athletes_for_display.length==0)
          alert("No athletes found.");
        
      })
    }
    else{
      this.athletes_service.search_athletes_all().subscribe((data:Athlete[])=>{
        this.athletes_for_display=data;
        if(this.athletes_for_display.length==0)
          alert("No athletes found.");
      })
    }
    this.flag=1;

    
    // else if(lastname!=""){
    //   this.athletes_service.search_by_name(name).subscribe((data:Athlete[])=>{
    //     this.athletes_for_display=data;
    //     if(this.athletes_for_display.length==0)
    //       alert("No athletes found.");
        
    //   })
    // }
  }

}
