import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { MastersatkerService } from './../../shared/mastersatker.service';
import { MasterppkService } from './../../shared/masterppk.service';
import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'


@Component({
  selector: 'app-masterppk',
  templateUrl: './masterppk.component.html',
  styleUrls: ['./masterppk.component.css']
})
export class MasterppkComponent implements OnInit {

  public titleHeader = "Master PPK";
  form: FormGroup;


  constructor(
    public masterSatkerService: MastersatkerService,
    public masterPpkService: MasterppkService,
    private token: TokenService,
    private authState: AuthStateService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      namaPpk     : new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      satkerId     : new FormControl("",Validators.compose([
        Validators.required,
      ])),
       
    });

    this.getDataSatker();
    this.getDataPPK();
    $('#breadCrumbTitle a').text(this.titleHeader);
    this.selectActiveMenu('masterppk');

  }

  selectActiveMenu(opened){
    this.removeActiveMenu();
    if(opened == 'dashboard'){
      $('#listMenu #dashboard').addClass('uk-active');
    }else if(opened == 'blog'){
      $('#listMenu #blog').addClass('uk-active');
    }else if(opened == 'dokumenTemuan'){
      $('#listMenu #dokumenTemuan').addClass('uk-active');
    }else if(opened == 'tindaklanjutv2'){
      $('#listMenu #tindaklanjutv2').addClass('uk-active');
    }else if(opened == 'tindaklanjut'){
      $('#listMenu #tindaklanjut').addClass('uk-active');
    }else if(opened == 'approvaldoc'){
      $('#listMenu #approvaldoc').addClass('uk-active');
    }else if(opened == 'masterkpa'){
      $('#listMenu #masterkpa').addClass('uk-active');
    }else if(opened == 'masterppk'){
      $('#listMenu #masterppk').addClass('uk-active');
    }else if(opened == 'cabang'){
      $('#listMenu #cabang').addClass('uk-active');
    }else if(opened == 'satker'){
      $('#listMenu #satker').addClass('uk-active');
    }else if(opened == 'register'){
      $('#listMenu #register').addClass('uk-active');
    }else if(opened == 'login'){
      $('#listMenu #login').addClass('uk-active');
    }else if(opened == 'profile'){
      $('#listMenu #profile').addClass('uk-active');
    }else if(opened == 'register'){
      $('#listMenu #register').addClass('uk-active');
    }
  }


  removeActiveMenu(){
    $('#listMenu #dashboard').removeClass('uk-active');
    $('#listMenu #dokumenTemuan').removeClass('uk-active');
    $('#listMenu #tindaklanjutv2').removeClass('uk-active');
    $('#listMenu #tindaklanjut').removeClass('uk-active');
    $('#listMenu #approvaldoc').removeClass('uk-active');
    $('#listMenu #masterppk').removeClass('uk-active');
    $('#listMenu #cabang').removeClass('uk-active');
    $('#listMenu #blog').removeClass('uk-active');
    $('#listMenu #satker').removeClass('uk-active');
    $('#listMenu #register').removeClass('uk-active');
    $('#listMenu #login').removeClass('uk-active');
    $('#listMenu #profile').removeClass('uk-active');
    $('#listMenu #register').removeClass('uk-active');
  }




  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;
    if(this.windowMode == 'create'){
      this.formPPK = {satkerId:null, namaPpk:null,id:null};
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Buat</a></li>')
      $('.uk-breadcrumb #edit').remove();
    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
    }else if(this.windowMode == 'grid'){
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
    }
  }

  ListSatker = [];
  getDataSatker(){
    this.masterSatkerService.getSatker().subscribe(
      result => {
        console.log('Get data Satker success | getSatker ===>',result);
        this.ListSatker = result.result;
        console.log('ListSatker ===>',this.ListSatker);
      },
      error => {
        console.log('Get data Satker error   | getSatker ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  ListPPK = [];
  getDataPPK(){
    this.masterPpkService.getPPK().subscribe(
      data => {
        console.log('Get data PPK success | getPPK ===>',data);
        this.ListPPK = data.result;

        console.log('ListPPK ===>',this.ListPPK);
      },
      error => {
        console.log('Get data PPK error   | getPPK ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  
  formPPK = {};
  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('edit');
    this.formPPK = row.data;
  }

  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }


  filterData = {satkerId:null, namaPpk:""}
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.masterPpkService.searchPPK(this.filterData).subscribe(
      data => {
        console.log('searchPPK PPK success | searchPPK ===>',data);
        this.ListPPK = data.result;
      },
      error => {
        console.log('searchPPK PPK error   | searchPPK ===>',error);
      }
    )
  }

  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {satkerId:null, namaPpk:""}
  }

  deleteDataPpk = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataPpk = row.data.namaPpk;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.masterPpkService.deletePPK(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deletePPK ===>',result)
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListPPK = _.remove(this.ListPPK, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deletePPK ===>',error);
        notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }


  doSave(data){

    if(this.windowMode == 'edit'){
      data = this.formPPK;
    }

    if(data.id == null){
      console.log('doSave | data ===>',data);
      this.masterPpkService.createPPK(this.form.value).subscribe(
        result => {
          console.log('create success | createPPK ===>',result)
          notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.windowModeView('grid');

          var findSatker = _.find(this.ListSatker,{"id":result.result.satkerId});
          result.result.namaSatker = findSatker.namaSatker;
          this.ListPPK.push(result.result)
          console.log('ListSatker after create ===>',this.ListPPK)

        },
        error => {
          console.log('create error   | createPPK ===>',error);
          notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }else{
      console.log('do update Data ===>',data)
      this.masterPpkService.updatePPK(data).subscribe(
        result => {
          console.log('update success | updatePPK ===>',result)
          notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.windowModeView('grid');
          console.log('ListSatker ===>',this.ListSatker);

        },
        error => {
          console.log('update error   | updatePPK ===>',error);
          notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }
    
    
  }



}
