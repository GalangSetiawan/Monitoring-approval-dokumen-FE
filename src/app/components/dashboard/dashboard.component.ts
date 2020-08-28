import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public titleHeader = "Dashboard";
  constructor() { }

  ngOnInit(): void {
    $('#breadCrumbTitle a').text(this.titleHeader);

  }

}
