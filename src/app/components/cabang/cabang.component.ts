import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { MastercabangService } from './../../shared/mastercabang.service';

import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'

@Component({
  selector: 'app-cabang',
  templateUrl: './cabang.component.html',
  styleUrls: ['./cabang.component.css']
})
export class CabangComponent implements OnInit {

  public titleHeader = "Master Cabang";
  form: FormGroup;

  constructor(
    public masterCabangService: MastercabangService,
    private token: TokenService,
    private authState: AuthStateService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      cabang      : new FormControl("",Validators.compose([Validators.required,])),
      alamat      : new FormControl("",Validators.compose([Validators.required,]))
    })

    this.getDataCabang();
    $('#breadCrumbTitle a').text(this.titleHeader);

  }



  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;
    if(this.windowMode == 'create'){
      this.formCabang = {idKpa:null, namaPpk:null,id:null};
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Create</a></li>')
      $('.uk-breadcrumb #edit').remove();
    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
    }else if(this.windowMode == 'grid'){
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
    }
  }


  ListCabang = [];
  getDataCabang(){
    this.masterCabangService.getCabang().subscribe(
      data => {
        console.log('Get data Cabang success | getCabang ===>',data);
        this.ListCabang = data.result;

        console.log('ListCabang ===>',this.ListCabang);
      },
      error => {
        console.log('Get data Cabang error   | getCabang ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }
  
  filterData = {cabang : ""}
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.masterCabangService.searchCabang(this.filterData).subscribe(
      data => {
        console.log('searchCabang Cabang success | searchCabang ===>',data);
        this.ListCabang = data.result;
      },
      error => {
        console.log('searchCabang Cabang error   | searchCabang ===>',error);
      }
    )
  }

  
  deleteDataCabang = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataCabang = row.data.cabang;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.masterCabangService.deleteCabang(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteCabang ===>',result)
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListCabang = _.remove(this.ListCabang, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteCabang ===>',error);
        notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }



  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = { cabang:""}
  }


  
  formCabang = {};
  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('edit');
    this.formCabang = row.data;
  }

  doSave(data){

    if(this.windowMode == 'edit'){
      data = this.formCabang;
    }

    if(data.id == null){
      console.log('doSave | data ===>',data);
      this.masterCabangService.createCabang(this.form.value).subscribe(
        data => {
          console.log('create success | createCabang ===>',data)
          notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.windowModeView('grid');

          this.ListCabang.push(data.result)

       
        },
        error => {
          console.log('create error   | createCabang ===>',error);
          notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }else{
      console.log('do update Data ===>',data)
      this.masterCabangService.updateCabang(data).subscribe(
        result => {
          console.log('update success | updateCabang ===>',result)
          notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.windowModeView('grid');

        },
        error => {
          console.log('update error   | updateCabang ===>',error);
          notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }
    
    
  }


}



