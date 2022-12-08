import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { MedalsService } from '../medals.service';
import { Country } from '../model/country';
import { Medal } from '../model/medals';
"@angular/compiler";

import { Medal_Graph } from '../model/medals_graph';


@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.css']
})
export class MedalsComponent implements OnInit {
  medals: Medal[];
  page: Number = -1;
  itemsPerPage: Number;
  medal_graph:Medal_Graph[]=[];
  contr:Country[]=[];
  productSales:any[];
  productSales1:any[]=[];
  medal_graphhhh:any[];
  productSalesMulti:any[];
  prikaz:any[]=[];


  constructor(private router: Router, 
    private medal_service: MedalsService,
    private contr_serv:CountryService) {}

  ngOnInit(): void {
    this.medal_service.find_all().subscribe((data: Medal[]) => {
      this.medals = data;
      
      this.medals=(this.sort_medals_bronze(this.medals));
      this.medals=(this.sort_medals_silver(this.medals));
      this.medals=(this.sort_medals_gold(this.medals));
      this.medals=(this.sort_medals_total(this.medals));
      for(let i=0;i<this.medals.length;i++){
        this.medals[i].rank=i+1;
      }
    })

  }

  sort_medals_bronze(gm) {
    //new Date() kreira trenutni datum i vreme
    let all = gm;
    return all.sort((a, b) => {
      if (b.bronze > a.bronze) return 1;
      else {
        if (b.bronze < a.bronze) return -1;
        else 0;
      }
    })
  }
  sort_medals_silver(gm) {
    //new Date() kreira trenutni datum i vreme
    let all = gm;
    return all.sort((a, b) => {
      if (b.silver > a.silver) return 1;
      else {
        if (b.silver < a.silver) return -1;
        else 0;
      }
    })
  }
  sort_medals_gold(gm) {
    //new Date() kreira trenutni datum i vreme
    let all = gm;
    return all.sort((a, b) => {
      if (b.gold > a.gold) return 1;
      else {
        if (b.gold < a.gold) return -1;
        else 0;
      }
    })
  }
  sort_medals_total(gm) {
    //new Date() kreira trenutni datum i vreme
    let all = gm;
    return all.sort((a, b) => {
      if (b.total > a.total) return 1;
      else {
        if (b.total < a.total) return -1;
        else 0;
      }
    })
  }

  
}
