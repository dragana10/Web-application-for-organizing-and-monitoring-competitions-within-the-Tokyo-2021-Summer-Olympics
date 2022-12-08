import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../model/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries:Country[];
  page:Number=-1;
  itemsPerPage:Number;
  items:Number;

  constructor(private router:Router,private country_service:CountryService) { }

  ngOnInit(): void {
    this.country_service.find_all().subscribe((data:Country[])=>{
      this.countries=data;
      this.countries=(this.sort_c(this.countries));
      this.itemsPerPage=10;
    })
  }

  sort_c(gm) {
    //new Date() kreira trenutni datum i vreme
    let all = gm;
    return all.sort((a, b) => {
      if (b.cnt > a.cnt) return 1;
      else {
        if (b.cnt < a.cnt) return -1;
        else 0;
      }
    })
  }

}