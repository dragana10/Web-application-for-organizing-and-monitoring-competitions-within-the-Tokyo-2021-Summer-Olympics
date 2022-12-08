import { Component, OnInit } from '@angular/core';
import { Records } from '../model/records';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  flag:number=0;
  records:Records[];
  constructor(private records_service:RecordsService) { }

  ngOnInit(): void {
    this.records_service.find_all().subscribe((data:Records[])=>{
      this.records=data;
      this.flag=1;
    })
  }

}
