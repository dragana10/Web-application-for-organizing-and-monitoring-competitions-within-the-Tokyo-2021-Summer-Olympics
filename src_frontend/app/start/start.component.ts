import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  want_login:number=0;
  
  constructor() { }

  ngOnInit(): void {
  }

  lg_in(){
    this.want_login=1;
  }
}
