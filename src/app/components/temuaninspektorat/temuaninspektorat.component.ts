import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import * as $ from 'jquery'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import 'jspdf-autotable';


@Component({
  selector: 'app-temuaninspektorat',
  templateUrl: './temuaninspektorat.component.html',
  styleUrls: ['./temuaninspektorat.component.css']
})
export class TemuaninspektoratComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#breadCrumbTitle a').text('Dokumen Temuan Inspektorat');

  }

}
