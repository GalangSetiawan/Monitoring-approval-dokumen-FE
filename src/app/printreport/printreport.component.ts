import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-printreport',
  templateUrl: './printreport.component.html',
  styleUrls: ['./printreport.component.css']
})
export class PrintreportComponent implements OnInit {


  constructor(
    private activateRoute     : ActivatedRoute
  ) { }


  @Input() dokumenTemuan = {};
  @Input() dokumenTindakLanjut = [];

  ngOnInit() {


    this.activateRoute.queryParams.subscribe(
      params => {
        this.dokumenTemuan = JSON.parse(params['dokumenTemuan'])
        this.dokumenTindakLanjut = JSON.parse(params['dokumenTindakLanjut'])



        console.log('Print Report | dokumenTemuan ==========>',this.dokumenTemuan);
        console.log('Print Report | dokumenTindakLanjut ====>',this.dokumenTindakLanjut);

        
      }
    )


  }

}
